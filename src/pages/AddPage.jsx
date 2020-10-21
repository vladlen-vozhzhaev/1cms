import React from "react";
import CodeEditor from "../components/CodeEditor";
import {cmsName, host} from "../cmsConfig";
import {Option} from "../components/Option";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        fetch(host+"/getBranchesJSON").then(
            response=>response.json()
        ).then(branches=>{
            let options = branches.map((branch,index)=>{
                return <Option value={branch.id} optionName={branch.name_rus} key={index}/>
            });
            this.setState(
                {options: options}
            )
        }
        )
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
                <select className="form-control" name="branch" required onChange={this.props.handleChange}>
                    {this.state.options}
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
