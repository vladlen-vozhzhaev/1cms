import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";
import CodeEditor from "../components/CodeEditor";
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
    getPageData() {
        let path = window.location.pathname;
        let arrPath = path.split("/");
        let pageName = arrPath[arrPath.length - 1];
        let formData = new FormData();
        formData.append("name", pageName);
        return fetch("http://1.vozhzhaev.ru/getPage",{
            //fetch("http://dsergeev.beget.tech/getPage", {
            method: "POST",
            body: formData
        }).then(response => response.json());
    }
    render() {
        console.log("ВЫЗВАН МЕТОД РЕНДЕР")
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


        return <CodeEditor getData={this.getPageData}/>
    }


}

export default EditPage;