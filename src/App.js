import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter, Route} from "react-router-dom";
import Pages from "./pages/Pages";
import EditPage from "./pages/EditPage";
import {AddPage} from "./pages/AddPage";

//let host = "http://dsergeev.beget.tech";
let host = "http://1.vozhzhaev.ru";

function App() {
    return (
        <div className="container-fluid">
            <div className="row">
                <BrowserRouter>
                    <Menu/>
                    <div className="col-sm-9">
                        <Route exact path="/" render={() => "Hello world"}/>
                        <Route exact path="/pages/" render={() => <Pages host={host}/>}/>
                        <Route path="/pages/addPage" render={() => <AddPage host={host}/>}/>
                        <Route path="/pages/editPage" render={() => <EditPage host={host}/>}/>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
