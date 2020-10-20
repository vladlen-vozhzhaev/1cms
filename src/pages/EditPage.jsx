import React from "react";
import CodeEditor from "../components/CodeEditor";
import {host} from "../cmsConfig";


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
            <div className="form-group">
                <select className="form-control" name="branch" onChange={this.props.handleChange}>
                    <option value="1" data-value="1">Главная</option>
                    <option value="2" data-value="2">Курс</option>
                    <option value="4" data-value="4">Тестовая ветка</option>
                </select>
            </div>
        </form>
    }
}

export class EditPage extends React.Component {

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
        return fetch(host + "/getPageJSON", {
            method: "POST",
            body: formData
        }).then(response => response.json());
    }

    render() {
        return <CodeEditor getData={this.getPageData} url={host + "/editPage"} extraHTML={Form}/>
    }


}

export default EditPage;