import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";

const CodeEditor = ()=>{
    return <div className="w-100">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                   aria-controls="pills-home" aria-selected="true">HTML</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                   aria-controls="pills-profile" aria-selected="false">CSS</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab"
                   aria-controls="pills-contact" aria-selected="false">JS</a>
            </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                 aria-labelledby="pills-home-tab">
                <AceEditor
                    mode="html"
                    theme="vibrant_ink"
                    width="100%"
                    setOptions={{
                        fontSize:20,

                    }}/>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <AceEditor
                    mode="css"
                    theme="vibrant_ink"
                    width="100%"
                    setOptions={{
                        fontSize:20,

                    }}/>
            </div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <AceEditor
                    mode="javascript"
                    theme="vibrant_ink"
                    width="100%"
                    setOptions={{
                        fontSize:20,

                    }}/>
            </div>
        </div>

    </div>
}

export default CodeEditor;