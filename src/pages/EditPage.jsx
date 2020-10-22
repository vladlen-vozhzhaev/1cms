import React from "react";
import CodeEditor from "../components/CodeEditor";
import {host} from "../cmsConfig";
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
                    {this.state.options}
                </select>
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
        formData.append("pageId", pageName);
        return fetch(host + "/getPageByIdJSON", {
            method: "POST",
            body: formData
        }).then(response => response.json());
    }

    render() {
        return <CodeEditor getData={this.getPageData} url={host + "/editPage"} extraHTML={Form}/>
    }


}

export default EditPage;