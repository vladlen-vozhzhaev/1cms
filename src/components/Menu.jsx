import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName} from "../cmsConfig";

const Menu = () => {
    return <div className="col-sm-3">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink className="nav-link" exact to={cmsName}>CMS</NavLink>
            <NavLink className="nav-link" to={cmsName+"/pages/"}>Страницы сайта</NavLink>
            <NavLink className="nav-link" to={cmsName+"/branches"}>Ветки сайта</NavLink>
        </div>
    </div>
}

export default Menu;