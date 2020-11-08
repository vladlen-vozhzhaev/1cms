import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";
import {Redirect} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.htmlEditor = React.createRef();    // Реф на HTMLeditor
        this.cssEditor = React.createRef(); // Реф на CSSeditor
        this.jsEditor = React.createRef();  // Реф на JSeditor
        this.extraHTML = React.createRef(); // Реф на форму из AddPage или EditPage
        this.wyswigEditor = React.createRef();
        this.handleSave = this.handleSave.bind(this); // передача this в handleSave
        this.handleInputChange = this.handleInputChange.bind(this); // передача this в handleInputChange
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.reRenderCodeEditor = this.reRenderCodeEditor.bind(this);
        this.state = {  //Первичное присвоение state
            wyswigValue: "",
            valueHTML: "html",
            valueCSS: "CSS",
            valueJS: "JS",
            inputsName: [],
            pageID: 0,
            saveInfo: "",
            referrer: null
        }
    }

    componentDidMount() { // После завершения render
        this.htmlEditor.current.editor.focus(); // Передать фокус на HTML editor
        let formElements = this.extraHTML.current._reactInternalFiber.child.stateNode.elements; // Получение элементов формы из AddPage
        let inputsName = new Array(); // создание массива полей ввода формы из AddPage
        for (let i=0; i<formElements.length; i++) { //Перебор элементов формы из AddPage
            inputsName.push(formElements[i].name) // добавить в массив элемент с именем name i-го элемента из формы - например title
            this.setState({
               [formElements[i].name]:formElements[i].dataset.value // присвоить в state i-му элементу из формы значение data-value i-го элемента из формы (title:"Тестовая страница")
            });
            formElements[i].setAttribute("value",formElements[i].dataset.value) // вывод в поле ввода значения из data-value
        }
        this.setState({
            inputsName: inputsName // присвоить inputsName из state значение в виде массива inputsName
        })

        if (this.props.getData) { // получение функции getPageData из props (есть только при вызове из EditPage)
            this.props.getData().then(res => { //разбор JSON из response полученного в ответ на getPageJSON
                this.setState({ // Присвоение state значений из response полученного в ответ на getPageJSON
                    valueHTML: res.html,
                    valueCSS: res.css,
                    valueJS: res.js,
                    pageID: res.id,
                    title: res.title,
                    name: res.name,
                    branch:res.branch
                });


                formElements.title.setAttribute("value", res.title); // вывод в поле ввода title значения из response полученного в ответ на getPageJSON
                formElements.name.setAttribute("value", res.name); // вывод в поле ввода name значения из response полученного в ответ на getPageJSON
                formElements.branch.setAttribute("value", res.branch); // вывод в поле ввода branch значения из response полученного в ответ на getPageJSON
                let options = formElements.branch.getElementsByTagName('option');
                for (let option of options){
                    if (option.value==res.branch) {
                        option.setAttribute("selected", true);
                    }
                }

                this.htmlEditor.current.editor.setValue(this.state.valueHTML); // передача в HTMLEditor значения из response полученного в ответ на getPageJSON
                this.cssEditor.current.editor.setValue(this.state.valueCSS);    // передача в CSSEditor значения из response полученного в ответ на getPageJSON
                this.jsEditor.current.editor.setValue(this.state.valueJS);  // передача в JSEditor значения из response полученного в ответ на getPageJSON
                this.htmlEditor.current.editor.clearSelection(); // удаление выделения в HTMLEditor
                this.cssEditor.current.editor.clearSelection(); // удаление выделения в CSSEditor
                this.jsEditor.current.editor.clearSelection();  // удаление выделения в JSEditor
            });
        }

    }

    expandEditor(e) {
        let editorContainer = document.getElementById("editorContainer"); //Получение из HTML-документа элемента с ID "editorContainer"
        let expandBtn = e.currentTarget; // expandBtn - кнопка изменения размера окна редактора
        let clicked = expandBtn.dataset.clicked === "true";
        let aceEditors = document.querySelectorAll(".ace_editor"); // выбрать все элементы AceEditor
        let navEditor = document.getElementById("navEditor"); // выбрать верхнее меню редактора
        for (let aceEditor of aceEditors) { // перебор всех элементов AceEditor
            editorContainer.style.height = clicked ? "500px" : "100vh";
            aceEditor.style.height = clicked ? "500px" : (editorContainer.getBoundingClientRect().height - navEditor.getBoundingClientRect().height) + "px";
        }
        editorContainer.parentElement.style.position = clicked ? "relative" : "absolute";
        editorContainer.parentElement.style.paddingLeft = clicked ? "15px" : 0;
        editorContainer.parentElement.style.paddingRight = clicked ? "15px" : 0;
        expandBtn.style.background = clicked ? "#f8f9fa" : "#bcb9b9";
        editorContainer.style.width = clicked ? "100%" : "100vw";
        expandBtn.dataset.clicked = clicked ? "false" : "true";
    }

    handleSave(e) {
        let formElements = this.extraHTML.current._reactInternalFiber.child.stateNode.elements; // Получение элементов формы из AddPage
        let formData = new FormData(); // создание FormData
        for (let key of this.state.inputsName) { //Перебор inputsName state (содержат имена полей и значения элементов формы из AddPage)
            formData.append(key, this.state[key]); // добавление в FormData полей со значениями, полученными из элементов формы из AddPage (например "name" со значением "Page_1")
        }
        //this.htmlEditor.current.editor.setValue(this.state.wyswigValue);
        formData.append("html", this.htmlEditor.current.editor.getValue()); // добавление в FormData поля со значениями, полученными из HTMLeditor
        formData.append("css", this.cssEditor.current.editor.getValue());   // добавление в FormData поля со значениями, полученными из CSSeditor
        formData.append("js", this.jsEditor.current.editor.getValue()); // добавление в FormData поля со значениями, полученными из JSeditor
        formData.append("id", this.state.pageID); // добавление в FormData поля со значением ID полученными из state

        if (formData.get("name") == "" | formData.get("name") == "undefined") {
            alert('Поле "Название" в разделе "Параметры" обязательно для заполнения!'); // если значение name пустое или undefined - тогда вывести передупреждение
            document.getElementById('pills-extraHTML-tab').click(); // Перейти на вкладу "Параметры"
            formElements.name.focus(); // передать фокус ввода в поле name
        } else { //  если значение name не пустое или не undefined, тогда передать на сервер запрос /addPage или /editPage - в зависимости от того, откуда был вызван CodeEditor
            fetch(this.props.url, {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then((result)=>{
                    if(this.props.followAfterSave !== undefined){
                        this.setState({
                            referrer: this.props.followAfterSave
                        });
                        //nn = this.props.followAfterSave;
                    }else{
                        this.setState({
                            saveInfo: "Сохранено: "+new Date().toLocaleString()
                        })
                    }
                });
        }
    }

    handleInputChange(event) {
        const target = event.target; // назначить источник события (поле ввода из формы из AddPage или EditPage)
        const value = target.value; // прочитать из поля ввода значение и присвоить его переменной value
        const name = target.name; // прочитать из поля ввода его имя и присвоить его переменной name

        this.setState({
            [name]: value // изменить у элемента state c именем name значение на взятое из переменной value (например title:"Тестовая страница")
        });
    }

    handleCodeChange(value){
        this.setState({
            wyswigValue: value
        })
    }

    reRenderCodeEditor(){
        //this.htmlEditor.current.editor.setValue(this.state.wyswigValue);
    }

    render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />
        return <div id="editorContainer">
            <nav id="navEditor">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a onClick={this.reRenderCodeEditor} className="nav-item nav-link active" id="pills-html-tab" data-toggle="tab" href="#nav-home" role="tab"
                       aria-controls="nav-home" aria-selected="true"><i className="fab fa-html5"></i> HTML</a>
                    <a className="nav-item nav-link" id="pills-css-tab" data-toggle="tab" href="#nav-profile" role="tab"
                       aria-controls="nav-profile" aria-selected="false"><i className="fab fa-css3"></i> CSS</a>
                    <a className="nav-item nav-link" id="pills-js-tab" data-toggle="tab" href="#nav-contact" role="tab"
                       aria-controls="nav-contact" aria-selected="false"><i className="fab fa-js"></i> JS</a>
                    <a className="nav-item nav-link" id="pills-wyswig-tab" data-toggle="tab" href="#nav-wyswig" role="tab"
                       aria-controls="nav-wyswig" aria-selected="false"><i className="fas fa-eye"></i> WYSWIG</a>
                    <a className="nav-item nav-link" id="pills-extraHTML-tab" data-toggle="tab" href="#nav-extraHTML"
                       role="tab"
                       aria-controls="nav-extraHTML" aria-selected="false"><i
                        className="fas fa-tasks"></i> Параметры</a>
                    <span className="ml-auto mr-3 mt-2">{this.state.saveInfo}</span> {/* Строка вывода сообщения о результатах сохранения */}
                    <button onClick={this.handleSave} className="btn btn-light mr-3">
                        <i className="fas fa-save"></i></button> {/* Кнопка сохранения */}
                    <button onClick={this.expandEditor} className="btn btn-light" data-clicked="false"><i
                        className="fas fa-expand-arrows-alt"></i></button> {/* Кнопка развертывания/свертывания окна редактора */}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <AceEditor
                        mode="html"
                        theme="vibrant_ink"
                        width="100%"
                        name="HTML_EDITOR"
                        ref={this.htmlEditor} //присвоение рефа htmlEditor
                        onChange={this.handleCodeChange}
                        setOptions={{
                            enableEmmet: true,
                            fontSize: 20,
                        }}/>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <AceEditor
                        mode="css"
                        theme="vibrant_ink"
                        width="100%"
                        name="CSS_EDITOR"
                        ref={this.cssEditor} //присвоение рефа cssEditor
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AceEditor
                        mode="javascript"
                        theme="vibrant_ink"
                        width="100%"
                        name="JS_EDITOR"
                        ref={this.jsEditor} // присвоение рефа jsEditor
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
                <div className="tab-pane fade" id="nav-wyswig" role="tabpanel" aria-labelledby="nav-wyswig-tab">
                    <ReactQuill
                        value={this.state.wyswigValue}
                        onChange={(value)=>{
                            this.setState({wyswigValue:value})
                        }}
                        ref={this.wyswigEditor}/>
                </div>
                <div className="tab-pane fade pt-3" id="nav-extraHTML" role="tabpanel"
                     aria-labelledby="nav-extraHTML-tab">
                    {<this.props.extraHTML handleChange={this.handleInputChange} ref={this.extraHTML}/>} {/*вывод формы из AddPage или EditPage */}
                </div>
            </div>
        </div>
    }
}

export default CodeEditor;
