import React from "react";
import {cmsName, host} from "../cmsConfig";

class EditBranch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            pageID: 0,
            name: "",
            name_rus: "",
            saveInfo: ""
        }
    }

    componentDidMount() {
        let path = window.location.pathname;
        let arrPath = path.split("/");
        let pageName = arrPath[arrPath.length - 1];
        let formData = new FormData();
        formData.append("name", pageName);
        return fetch(host + "/getBranchJSON", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then((res) => {
                this.setState({
                    pageID: res.id,
                    name: res.name,
                    name_rus: res.name_rus
                })
                document.getElementsByName("name")[0].setAttribute("value", res.name);
                document.getElementsByName("name_rus")[0].setAttribute("value", res.name_rus);
            });
    }

    handleSave(e){
        let name = document.getElementsByName("name")[0].value;
        let name_rus = document.getElementsByName("name_rus")[0].value;
        let formData = new FormData();
        formData.append("id", this.state.pageID);
        formData.append("name", name);
        formData.append("name_rus", name_rus);

        if (formData.get("name") == "" | formData.get("name") == "undefined") {
            alert('Поле "Название ветки [ENG]" обязательно для заполнения!');
            document.getElementsByName("name")[0].focus();
        } else if (formData.get("name_rus") == "" | formData.get("name_rus") == "undefined") {
            alert('Поле "Название ветки на русском языке" обязательно для заполнения!');
            document.getElementsByName("name_rus")[0].focus();
        } else {
            fetch(host+"/editBranch", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then((result) => {
                    this.setState({
                        saveInfo: "Сохранено: "+new Date().toLocaleString()
                    });
                })
        }

    }

    render() {
        return (
            <div className="container">
                <button onClick={this.handleSave} className="btn btn-light"><i className="fas fa-save pr-1"></i>Сохранить</button>
                <span className="ml-3">{this.state.saveInfo}</span>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Название ветки [ENG]"
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Название ветки на русском языке"
                            name="name_rus"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditBranch;