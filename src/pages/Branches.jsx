import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName, host} from "../cmsConfig";

const Tr = (props) => {
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.name}</td>
        <td>{props.name_rus}</td>
        <td><NavLink className="btn btn-secondary btn-sm" to={cmsName + "/branches/editBranch/" + props.name}><i className="fas fa-edit pr-2"></i>Редактировать</NavLink></td>
        <td><span className="btn btn-danger btn-sm" onClick={props.delBranch} data-name={props.name}><i className="fas fa-trash-alt pr-2"></i>Удалить</span></td>
    </tr>
}

class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.delBranch = this.delBranch.bind(this);
        this.state = {
            branches: ""
        }
    }

    delBranch(e) {
        let pageName = e.currentTarget.dataset.name;
        console.log(e.currentTarget)
        let formData = new FormData();
        formData.append("name", pageName);
        return fetch(host + "/delBranch", {
            method: "POST",
            body: formData
        }).then(response => response.text())
            .then((result) => {
                this.fetchData()
            });
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(){
        fetch(host + "/getBranchesJSON")
            .then(response => response.json())
            .then(result => {
                let branches = result.map(
                    (branch, index) => <Tr delBranch={this.delBranch} key={index} index={index + 1} name={branch.name} name_rus={branch.name_rus}/>
                );
                this.setState({
                    branches: branches
                });
            });
    }

    render() {
        return <div>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя ветки (ENG)</th>
                    <th scope="col">Название на русском языке</th>
                    <th scope="col" align="justify" colSpan="2">Управление</th>
                </tr>
                </thead>
                <tbody>
                {this.state.branches}
                </tbody>
            </table>
            <NavLink className="btn btn-light" to={cmsName + "/branches/addBranch"}><i className="fas fa-plus"></i> Добавить
                ветку</NavLink>

        </div>
    }
}

export default Branches;