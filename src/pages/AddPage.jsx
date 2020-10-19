import React from "react";
import CodeEditor from "../components/CodeEditor";
import {cmsName, host} from "../cmsConfig";

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
                    <option value="1">Главная</option>
                    <option value="2">Курс</option>
                </select>
            </div>
        </form>
    }
}

export class AddPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let path = window.location.pathname;
        let arrPath = path.split("/");
        let pageName = arrPath[arrPath.length - 1];
        if (pageName!="addPage") {
            let name_rus = decodeURI(pageName);
            let name = arrPath[arrPath.length - 2];
            document.getElementsByName("name")[0].setAttribute("value", name);
            document.getElementsByName("name")[0].setAttribute("disabled", true);
            document.getElementsByName("title")[0].setAttribute("value", name_rus);
            document.getElementsByName("title")[0].setAttribute("disabled", true);
            document.getElementById('pills-extraHTML-tab').click();
        }
    }

    render() {
        return <CodeEditor url={host+"/addPage"} extraHTML={Form} followAfterSave={cmsName+"/pages/"}/>
    }
}
