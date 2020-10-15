import React from "react";
import CodeEditor from "../components/CodeEditor";
import {cmsName} from "../cmsConfig";

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

export class AddPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CodeEditor url={this.props.host+"/addPage"} extraHTML={Form} followAfterSave={cmsName+"/pages/"}/>
    }
}