import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName, host} from "../cmsConfig";

const Tr = (props) => {
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.title}</td>
        <td>/{props.name}</td>
        <td><NavLink className="btn btn-secondary btn-sm" to={cmsName + "/pages/editPage/" + props.name}><i className="fas fa-edit pr-2"></i>Редактировать</NavLink></td>
        <td><span className="btn btn-danger btn-sm" onClick={props.delPage} data-name={props.name}><i className="fas fa-trash-alt pr-2"></i>Удалить</span></td>
    </tr>
}


class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.delPage = this.delPage.bind(this);
        this.state = {
            pages: ""
        }
    }

    delPage(e) {
        let pageName = e.currentTarget.dataset.name;
        let formData = new FormData();
        formData.append("name", pageName);
        return fetch(host + "/delPage", {
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
        fetch(host + "/getPagesJSON")
            .then(response => response.json())
            .then(result => {
                let pages = result.map(
                    (page, index) => <Tr delPage={this.delPage} key={index} index={index + 1} title={page.title} name={page.name}/>
                );
                this.setState({
                    pages: pages
                });
            });
    }

    render() {
        return <div>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Заголовок</th>
                    <th scope="col">Адрес</th>
                    <th scope="col" align="justify" colSpan="2">Управление</th>
                </tr>
                </thead>
                <tbody>
                {this.state.pages}
                </tbody>
            </table>
            <NavLink className="btn btn-light" to={cmsName + "/pages/addPage"}><i className="fas fa-plus"></i> Добавить
                страницу</NavLink>

        </div>

    }


}

export default Pages;