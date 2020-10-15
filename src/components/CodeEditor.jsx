import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.htmlEditor = React.createRef();
        this.cssEditor = React.createRef();
        this.jsEditor = React.createRef();
        this.extraHTML = React.createRef();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            valueHTML: "html",
            valueCSS: "CSS",
            valueJS: "JS",
            inputsName: [],
            pageID: 0,
            saveInfo: ""
        }
    }

    componentDidMount() {
        this.htmlEditor.current.editor.focus();
        let formElements = this.extraHTML.current._reactInternalFiber.child.stateNode.elements;
        let inputsName = new Array();
        for (let input of formElements) {
            inputsName.push(input.name);
        }
        this.setState({
            inputsName: inputsName
        })
        if (this.props.getData) {
            this.props.getData().then(res => {
                this.setState({
                    valueHTML: res.html,
                    valueCSS: res.css,
                    valueJS: res.js,
                    pageID: res.id,
                    title: res.title,
                    name: res.name
                });

                formElements.title.setAttribute("value", res.title);
                formElements.name.setAttribute("value", res.name);

                this.htmlEditor.current.editor.setValue(this.state.valueHTML);
                this.cssEditor.current.editor.setValue(this.state.valueCSS);
                this.jsEditor.current.editor.setValue(this.state.valueJS);
                this.htmlEditor.current.editor.clearSelection();
                this.cssEditor.current.editor.clearSelection();
                this.jsEditor.current.editor.clearSelection();
            });
        }

    }

    expandEditor(e) {
        let editorContainer = document.getElementById("editorContainer");
        let expandBtn = e.currentTarget;
        let clicked = expandBtn.dataset.clicked === "true";
        let aceEditors = document.querySelectorAll(".ace_editor");
        let navEditor = document.getElementById("navEditor");
        for (let aceEditor of aceEditors) {
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
        let formElements = this.extraHTML.current._reactInternalFiber.child.stateNode.elements;
        let formData = new FormData();
        for (let key of this.state.inputsName) {
            //console.log(key,this.state[key])
            formData.append(key, this.state[key]);
        }
        formData.append("html", this.htmlEditor.current.editor.getValue());
        formData.append("css", this.cssEditor.current.editor.getValue());
        formData.append("js", this.jsEditor.current.editor.getValue());
        formData.append("id", this.state.pageID);

        if (formData.get("name") == "" | formData.get("name") == "undefined") {
            alert('Поле "Название" в разделе "Параметры" обязательно для заполнения!');
            let tab = document.getElementById('pills-extraHTML-tab');
            tab.click();
            formElements.name.focus();
        } else {
            fetch(this.props.url, {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then((result)=>{
                    if(this.props.followAfterSave !== undefined){
                        window.location.href = this.props.followAfterSave;
                    }else{
                        this.setState({
                            saveInfo: "Сохранено: "+new Date()
                        })
                    }
                });
        }


    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return <div id="editorContainer">
            <nav id="navEditor">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="pills-html-tab" data-toggle="tab" href="#nav-home"
                       role="tab"
                       aria-controls="nav-home" aria-selected="true"><i className="fab fa-html5"></i> HTML</a>
                    <a className="nav-item nav-link" id="pills-css-tab" data-toggle="tab" href="#nav-profile" role="tab"
                       aria-controls="nav-profile" aria-selected="false"><i className="fab fa-css3"></i> CSS</a>
                    <a className="nav-item nav-link" id="pills-js-tab" data-toggle="tab" href="#nav-contact" role="tab"
                       aria-controls="nav-contact" aria-selected="false"><i className="fab fa-js"></i> JS</a>
                    <a className="nav-item nav-link" id="pills-extraHTML-tab" data-toggle="tab" href="#nav-extraHTML"
                       role="tab"
                       aria-controls="nav-extraHTML" aria-selected="false"><i
                        className="fas fa-tasks"></i> Параметры</a>
                    <span className="ml-auto mr-3 mt-2">{this.state.saveInfo}</span>
                    <button onClick={this.handleSave} className="btn btn-light mr-3">
                        <i className="fas fa-save"></i></button>
                    <button onClick={this.expandEditor} className="btn btn-light" data-clicked="false"><i
                        className="fas fa-expand-arrows-alt"></i></button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <AceEditor
                        mode="html"
                        theme="vibrant_ink"
                        width="100%"
                        name="HTML_EDITOR"
                        ref={this.htmlEditor}
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
                        ref={this.cssEditor}
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
                        ref={this.jsEditor}
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
                <div className="tab-pane fade pt-3" id="nav-extraHTML" role="tabpanel"
                     aria-labelledby="nav-extraHTML-tab">
                    {<this.props.extraHTML handleChange={this.handleInputChange} ref={this.extraHTML}/>}
                </div>
            </div>
        </div>
    }
}

export default CodeEditor;