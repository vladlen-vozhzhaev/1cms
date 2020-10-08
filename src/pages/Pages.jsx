import React from "react";
import {NavLink} from "react-router-dom";

const Pages = ()=>{
    return  <ul className="nav nav-pills">
            <li className="nav-item">
                <NavLink className="nav-link" to="addPage">Добавить страницу</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="editPage">Изменить страницу</NavLink>
            </li>
        </ul>
}

export default Pages;