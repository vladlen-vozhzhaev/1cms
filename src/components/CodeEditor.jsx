import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";

const CodeEditor = ()=>{
    let code_html;
    let code_css;
    let code_js;

    function handleSave(e){
        /*console.log("html:", code_html);
        console.log("css:", code_css);
        console.log("js:", code_js);*/
        let formData = new FormData();
        formData.append("html",code_html);
        formData.append("css",code_css);
        formData.append("js",code_js);
        let response = fetch("http://1.vozhzhaev.ru/addPage",{
           method:"POST",
           body:formData
        });
    }

    function onChange(value) {
        if (this.name === "HTML_EDITOR"){
            code_html = value;
        }else if(this.name === "CSS_EDITOR"){
            code_css = value;
        }else if (this.name === "JS_EDITOR"){
            code_js = value;
        }
    }

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
            <button className="btn btn-light" onClick={handleSave}>[сохранить]</button>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                 aria-labelledby="pills-home-tab">
                <AceEditor
                    mode="html"
                    theme="vibrant_ink"
                    width="100%"
                    onChange={onChange}
                    name = "HTML_EDITOR"
                    setOptions={{
                        enableEmmet: true,
                        fontSize:20,
                    }}/>

            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <AceEditor
                    mode="css"
                    theme="vibrant_ink"
                    width="100%"
                    name = "CSS_EDITOR"
                    onChange={onChange}
                    setOptions={{
                        fontSize:20,

                    }}/>
            </div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <AceEditor
                    mode="javascript"
                    theme="vibrant_ink"
                    width="100%"
                    onChange={onChange}
                    name="JS_EDITOR"
                    setOptions={{
                        fontSize:20,

                    }}/>
            </div>
        </div>

    </div>
}

export default CodeEditor;