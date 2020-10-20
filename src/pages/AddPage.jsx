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
                    data-value={localStorage.getItem("name_rus")!=null?localStorage.getItem("name_rus"):""}
                    onChange={this.props.handleChange}
                    disabled={localStorage.getItem("name_rus")!=null}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    data-value={localStorage.getItem("name")!=null?localStorage.getItem("name"):""}
                    className="form-control"
                    placeholder="Название (используется в url)"
                    name="name"
                    onChange={this.props.handleChange}
                    disabled={localStorage.getItem("name")!=null}/>

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

export class AddPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        localStorage.clear();
    }
    render() {
        return <CodeEditor url={host+"/addPage"} extraHTML={Form} followAfterSave={cmsName+"/pages/"}/>
    }
}
