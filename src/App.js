import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter, Route} from "react-router-dom";
import Pages from "./pages/Pages";
import Branches from "./pages/Branches";
import EditPage from "./pages/EditPage";
import {AddPage} from "./pages/AddPage";
import AddBranch from "./pages/AddBranch";
import EditBranch from "./pages/EditBranch";
import {cmsName} from "./cmsConfig";
import Exit from "./pages/Exit";


function App(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <BrowserRouter>
                    <Menu/>
                    <div className="col-sm-9">
                        <Route exact path={cmsName} render={() => "Hello world"}/>
                        <Route exact path={cmsName+"/pages/"} render={() => <Pages/>}/>
                        <Route exact path={cmsName+"/branches/"} render={() => <Branches/>}/>
                        <Route path={cmsName+"/branches/addBranch"} render={() => <AddBranch/>}/>
                        <Route path={cmsName+"/branches/editBranch"} render={() => <EditBranch/>}/>
                        <Route path={cmsName+"/pages/addPage"} render={() => <AddPage/>}/>
                        <Route path={cmsName+"/pages/editPage"} render={() => <EditPage/>}/>
                        <Route path={cmsName+"/exit"} render={() => <Exit/>}/>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
