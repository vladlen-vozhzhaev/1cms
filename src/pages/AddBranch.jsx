import React from "react";
import {cmsName, host} from "../cmsConfig";
import {AddPage} from "./AddPage";

const AddBranchForm = (props)=>{
    return <div>
        <button onClick={props.handleSave} className="btn btn-light mr-3"><i className="fas fa-save"></i></button>
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
}

class AddBranch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            ViewComponent: AddBranchForm
        }
    }

    handleSave(e){
        let name = document.getElementsByName("name")[0].value;
        let name_rus = document.getElementsByName("name_rus")[0].value;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("name_rus", name_rus);

        if (formData.get("name") == "" | formData.get("name") == undefined) {
            alert('Поле "Название ветки [ENG]" обязательно для заполнения!');
            document.getElementsByName("name")[0].focus();
        } else if (formData.get("name_rus") == "" | formData.get("name_rus") == undefined) {
            alert('Поле "Название ветки на русском языке" обязательно для заполнения!');
            document.getElementsByName("name_rus")[0].focus();
        } else {
            fetch(host+"/addBranch", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then((result) => {
                    console.log(this);
                    this.setState({
                        ViewComponent: AddPage
                    })
                })
        }

    }

    render() {
        return (
            <div>
                <this.state.ViewComponent handleSave={this.handleSave} />
            </div>
        )
    }
}

export default AddBranch;