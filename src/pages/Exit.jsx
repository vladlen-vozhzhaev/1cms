import React from "react";
import {cmsName, host} from "../cmsConfig";

function Exit () {
    fetch (host+"/deAuth")
        .then(response => response.json())
        window.location = host
}

export default Exit;