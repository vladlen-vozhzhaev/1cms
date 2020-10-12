import React from "react";
import {NavLink} from "react-router-dom";

const Tr = (props)=>{
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.title}</td>
        <td>{props.name}</td>
        <td><NavLink to={"editPage/"+props.name}>[Редактировать]</NavLink></td>
    </tr>
}

class Pages extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pages: "111"
        }
    }

    componentDidMount() {

        fetch("http://1.vozhzhaev.ru/getPagesJSON")
            .then(response => response.json())
            .then(result => {
                let pages = result.map(
                    (page,index)=><Tr index={index+1} title={page.title} name={page.name}/>


                );
                this.setState({
                    pages: pages
                });
            });
    }


    render() {
        return <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink className="nav-link btn btn-primary" to="addPage">Добавить страницу</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="editPage">Изменить страницу</NavLink>
                </li>
            </ul>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Заголовок</th>
                    <th scope="col">Name</th>
                    <th scope="col">Управление</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.pages}
                </tbody>
            </table>
        </div>

    }


}

export default Pages;