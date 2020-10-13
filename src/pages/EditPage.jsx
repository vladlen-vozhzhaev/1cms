import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";
/* Подключаем сюда редактор */

/* Эта страница посылает запрос к серверу передавая название стрница
* Принимает ответ и выводит в консоль */

class EditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueHTML: "HTML",
            valueCSS: "CSS",
            valueJS: "JS"
        }
    }

    render() {
        let code_html;
        let code_css;
        let code_js;

        function handleSave(e) {
            /*console.log("html:", code_html);
            console.log("css:", code_css);
            console.log("js:", code_js);*/
            let formData = new FormData();
            formData.append("html", code_html);
            formData.append("css", code_css);
            formData.append("js", code_js);
            let response = fetch("http://1.vozhzhaev.ru/savePage", {
                //let response = fetch("http://dsergeev.beget.tech/savePage", {
                method: "POST",
                body: formData
            });
        }

        function onChange(value) {
            if (this.name === "HTML_EDITOR") {
                code_html = value;
            } else if (this.name === "CSS_EDITOR") {
                code_css = value;
            } else if (this.name === "JS_EDITOR") {
                code_js = value;
            }
        }


        return <div className="w-100">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="pills-html-tab" data-toggle="pill" href="#pills-html" role="tab"
                       aria-controls="pills-html" aria-selected="true">HTML</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-css-tab" data-toggle="pill" href="#pills-css" role="tab"
                       aria-controls="pills-css" aria-selected="false">CSS</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-js-tab" data-toggle="pill" href="#pills-js" role="tab"
                       aria-controls="pills-js" aria-selected="false">JS</a>
                </li>
                <button className="btn btn-light" onClick={handleSave}>[сохранить]</button>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-html" role="tabpanel"
                     aria-labelledby="pills-html-tab">
                    <AceEditor
                        mode="html"
                        theme="vibrant_ink"
                        width="100%"
                        onChange={onChange}
                        value={this.state.valueHTML}
                        name="HTML_EDITOR"
                        setOptions={{
                            enableEmmet: true,
                            fontSize: 20,
                        }}/>

                </div>
                <div className="tab-pane fade" id="pills-css" role="tabpanel" aria-labelledby="pills-css-tab">
                    <AceEditor
                        mode="css"
                        theme="vibrant_ink"
                        width="100%"
                        name="CSS_EDITOR"
                        onChange={onChange}
                        value={this.state.valueCSS}
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
                <div className="tab-pane fade" id="pills-js" role="tabpanel" aria-labelledby="pills-js-tab">
                    <AceEditor
                        mode="javascript"
                        theme="vibrant_ink"
                        width="100%"
                        onChange={onChange}
                        value={this.state.valueJS}
                        name="JS_EDITOR"
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
            </div>

        </div>
    }

    componentDidMount() {
        let path = window.location.pathname;
        let arrPath = path.split("/");
        let pageName = arrPath[arrPath.length - 1];
        let formData = new FormData();
        formData.append("name", pageName);
        fetch("http://1.vozhzhaev.ru/getPage",{
        //fetch("http://dsergeev.beget.tech/getPage", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(res => {
                console.log("HTML: " + res.html);
                console.log("CSS: " + res.css);
                console.log("JavaScript: " + res.js);
                this.setState({
                    valueHTML: res.html,
                    valueCSS: res.css,
                    valueJS: res.js
                });
            });
    }
}

export default EditPage;