import React from "react";
import CodeEditor from "../components/CodeEditor";

//let host = "http://dsergeev.beget.tech";
let host = "http://1.vozhzhaev.ru";

class EditPage extends React.Component {n

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
        return fetch(host+"/getPage", {
            method: "POST",
            body: formData
        }).then(response => response.json());
    }
    render() {
        return <CodeEditor getData={this.getPageData} url={host + "/editPage"}/>
    }


}

export default EditPage;