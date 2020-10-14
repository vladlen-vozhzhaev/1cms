import React from "react";
import CodeEditor from "../components/CodeEditor";

//let host = "http://dsergeev.beget.tech";
let host = "http://1.vozhzhaev.ru";

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <form>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Заголовок страницы"
                    name="title"
                    onChange={this.props.handleChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Название (используется в url)"
                    name="name"
                    onChange={this.props.handleChange}/>
            </div>
        </form>
    }
}

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
        return fetch(host + "/getPage", {
            method: "POST",
            body: formData
        }).then(response => response.json());
    }

    render() {
        return <CodeEditor getData={this.getPageData} url={this.props.host + "/editPage"} extraHTML={Form}/>
    }


}

export default EditPage;