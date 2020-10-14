import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.htmlEditor = React.createRef();
        this.cssEditor = React.createRef();
        this.jsEditor = React.createRef();
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            valueHTML: "html",
            valueCSS: "CSS",
            valueJS: "JS",
            pageID: 0
        }
    }

    componentDidMount() {
        if (this.props.getData) {
            this.props.getData().then(res => {
                this.setState({
                    valueHTML: res.html,
                    valueCSS: res.css,
                    valueJS: res.js,
                    pageID: res.id
                });
                this.htmlEditor.current.editor.setValue(this.state.valueHTML);
                this.cssEditor.current.editor.setValue(this.state.valueCSS);
                this.jsEditor.current.editor.setValue(this.state.valueJS);
            });
        }

    }

    expandEditor(e) {
        let editorContainer = document.getElementById("editorContainer");
        let expandBtn = e.currentTarget;
        let clicked = expandBtn.dataset.clicked === "true";
        let aceEditors = document.querySelectorAll(".ace_editor");
        let navEditor = document.getElementById("navEditor");
        for (let aceEditor of aceEditors) {
            editorContainer.style.height = clicked ? "500px" : "100vh";
            aceEditor.style.height = clicked ? "500px" : (editorContainer.getBoundingClientRect().height - navEditor.getBoundingClientRect().height) + "px";
        }
        editorContainer.parentElement.style.position = clicked ? "relative" : "absolute";
        editorContainer.parentElement.style.paddingLeft = clicked ? "15px" : 0;
        editorContainer.parentElement.style.paddingRight = clicked ? "15px" : 0;
        expandBtn.style.background = clicked ? "#f8f9fa" : "#bcb9b9";
        editorContainer.style.width = clicked ? "100%" : "100vw";
        expandBtn.dataset.clicked = clicked ? "false" : "true";
    }

    handleSave(e) {
        let formData = new FormData();
        formData.append("html", this.htmlEditor.current.editor.getValue());
        formData.append("css", this.cssEditor.current.editor.getValue());
        formData.append("js", this.jsEditor.current.editor.getValue());
        formData.append("id", this.state.pageID);
        fetch(this.props.url, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(function (result) {
                alert(result);
            });

    }


    render() {
        return <div id="editorContainer">
            <nav id="navEditor">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="pills-html-tab" data-toggle="tab" href="#nav-home"
                       role="tab"
                       aria-controls="nav-home" aria-selected="true"><i className="fab fa-html5"></i> HTML</a>
                    <a className="nav-item nav-link" id="pills-css-tab" data-toggle="tab" href="#nav-profile" role="tab"
                       aria-controls="nav-profile" aria-selected="false"><i className="fab fa-css3"></i> CSS</a>
                    <a className="nav-item nav-link" id="pills-js-tab" data-toggle="tab" href="#nav-contact" role="tab"
                       aria-controls="nav-contact" aria-selected="false"><i className="fab fa-js"></i> JS</a>
                    <button onClick={this.handleSave} className="btn btn-light ml-auto mr-3">
                        <i className="fas fa-save"></i></button>
                    <button onClick={this.expandEditor} className="btn btn-light" data-clicked="false"><i
                        className="fas fa-expand-arrows-alt"></i></button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <AceEditor
                        mode="html"
                        theme="vibrant_ink"
                        width="100%"
                        name="HTML_EDITOR"
                        ref={this.htmlEditor}
                        setOptions={{
                            enableEmmet: true,
                            fontSize: 20,
                        }}/>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <AceEditor
                        mode="css"
                        theme="vibrant_ink"
                        width="100%"
                        name="CSS_EDITOR"
                        ref={this.cssEditor}
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AceEditor
                        mode="javascript"
                        theme="vibrant_ink"
                        width="100%"
                        name="JS_EDITOR"
                        ref={this.jsEditor}
                        setOptions={{
                            fontSize: 20,

                        }}/>
                </div>
            </div>
        </div>
    }
}

export default CodeEditor;