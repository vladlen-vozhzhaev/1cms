import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter,Route} from "react-router-dom";
import Pages from "./pages/Pages";


import CodeEditor from "./components/CodeEditor";
function App(){
    return (
        <div className="row">
           <BrowserRouter>
                <Menu/>
                <div className="col-9">
                    <Route exact path="/" render={()=>"Hello world"}/>
                    <Route exact path="/pages/" render={()=><Pages/>}/>
                    <Route path="/pages/addPage" render={()=><CodeEditor/>}/>
                    <Route path="/pages/editPage" render={()=><CodeEditor/>}/>
                </div>
           </BrowserRouter>
        </div>
    );
}

export default App;
