import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName} from "../cmsConfig";

const Tr = (props) => {
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.title}</td>
        <td>/{props.name}</td>
        <td><NavLink to={cmsName+"/pages/editPage/" + props.name}>[Редактировать]</NavLink></td>
    </tr>
}

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: ""
        }
    }

    componentDidMount() {

        fetch(this.props.host + "/getPagesJSON")
            .then(response => response.json())
            .then(result => {
                let pages = result.map(
                    (page, index) => <Tr key={index} index={index + 1} title={page.title} name={page.name}/>
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
                    <th scope="col">Управление</th>
                </tr>
                </thead>
                <tbody>
                {this.state.pages}
                </tbody>
            </table>
            <NavLink className="btn btn-light" to={cmsName+"/pages/addPage"}><i className="fas fa-plus"></i> Добавить страницу</NavLink>
        </div>

    }


}

export default Pages;