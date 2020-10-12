import React from "react";
/*import AceEditor from "react-ace/types";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet";*/
/* Подключаем сюда редактор */
/* Эта страница посылает запрос к серверу передавая название стрница
* Принимает ответ и выводит в консоль */

const EditPage = () => {
    let path = window.location.pathname;
    let arrPath = path.split("/");
    let pageName = arrPath[arrPath.length-1];
    let formData = new FormData();
    formData.append("name", pageName);
    let response = fetch("http://1.vozhzhaev.ru/editPage",{
    //let response = fetch("http://dsergeev.beget.tech/editPage", {
        method: "POST",
        body: formData
    });
}

export default EditPage;