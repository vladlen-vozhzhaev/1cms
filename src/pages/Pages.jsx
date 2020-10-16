import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName, host} from "../cmsConfig";

const Tr = (props) => {
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.title}</td>
        <td>/{props.name}</td>
        <td><NavLink to={cmsName + "/pages/editPage/" + props.name}>[Редактировать]</NavLink></td>
        <td><span className="btn btn-danger" onClick={props.delPage} data-name={props.name}>Удалить</span></td>
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
        console.log(e.currentTarget)
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

            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Подтвердите удаление страницы</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Вы действительно хотите полностью удалить страницу?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-danger" onClick={this.delPage}>Подтвердить
                                удаление
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }


}

export default Pages;