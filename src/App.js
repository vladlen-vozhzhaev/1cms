import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter,Route} from "react-router-dom";
import Pages from "./pages/Pages";
import CodeEditor from "./components/CodeEditor";
import EditPage from "./pages/EditPage";

//let host = "http://dsergeev.beget.tech";
let host = "http://1.vozhzhaev.ru";

function App(){
    return (
        <div className="container-fluid">
            <div className="row">
               <BrowserRouter>
                    <Menu/>
                    <div className="col-sm-9">
                        <Route exact path="/" render={()=>"Hello world"}/>
                        <Route exact path="/pages/" render={()=><Pages/>}/>
                        <Route path="/pages/addPage" render={()=><CodeEditor url={host+"/addPage"}/>}/>
                        <Route path="/pages/editPage" render={()=><EditPage/>}/>
                    </div>
               </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
