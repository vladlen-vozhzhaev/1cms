import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter, Route} from "react-router-dom";
import Pages from "./pages/Pages";
import EditPage from "./pages/EditPage";
import {AddPage} from "./pages/AddPage";
import {cmsName} from "./cmsConfig";

function App(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <BrowserRouter>
                    <Menu/>
                    <div className="col-sm-9">
                        <Route exact path={cmsName+"/"} render={() => "Hello world"}/>
                        <Route exact path={cmsName+"/pages/"} render={() => <Pages/>}/>
                        <Route path={cmsName+"/pages/addPage"} render={() => <AddPage/>}/>
                        <Route path={cmsName+"/pages/editPage"} render={() => <EditPage/>}/>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
