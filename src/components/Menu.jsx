import React from "react";
import {NavLink} from "react-router-dom";

const Menu = () => {
    return <div className="col-sm-3">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink className="nav-link" exact to="/">CMS</NavLink>
            <NavLink className="nav-link" to="/pages/">Страницы сайта</NavLink>
        </div>
    </div>
}

export default Menu;