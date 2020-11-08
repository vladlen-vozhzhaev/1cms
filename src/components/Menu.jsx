import React from "react";
import {NavLink} from "react-router-dom";
import {cmsName} from "../cmsConfig";

const Menu = () => {
    return <div className="col-sm-3">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink className="nav-link" exact to={cmsName}><i className="fas fa-home pr-2"></i>CMS</NavLink>
            <NavLink className="nav-link" to={cmsName+"/pages/"}><i className="fas fa-clone pr-2"></i>Страницы сайта</NavLink>
            <NavLink className="nav-link" to={cmsName+"/branches"}><i className="fas fa-sitemap pr-2"></i>Ветки сайта</NavLink>
            <NavLink className="nav-link" to={cmsName+"/exit"}><i className="fas fa-sign-out-alt pr-2"></i>Выход</NavLink>
        </div>
    </div>
}

export default Menu;