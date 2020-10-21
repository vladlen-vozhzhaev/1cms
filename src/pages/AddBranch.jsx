import React from "react";
import {cmsName, host} from "../cmsConfig";
import {Redirect} from "react-router-dom";


class AddBranch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            referrer: null,
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
                    localStorage.setItem("name",name);
                    localStorage.setItem("name_rus",name_rus);
                    this.setState({
                        referrer: cmsName+"/pages/addPage"
                    })
                })
        }

    }

    render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} followAfterSave={cmsName+"/pages/"}/>
        return (
            <div>
                <button onClick={this.handleSave} className="btn btn-light mr-3"><i className="fas fa-save"></i></button>
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

export default AddBranch;