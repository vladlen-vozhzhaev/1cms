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

    render() {
        return <CodeEditor url={host+"/addPage"} extraHTML={Form} followAfterSave={cmsName+"/pages/"}/>
    }
}
