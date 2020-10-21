import React from "react";

export const Option = (props)=>{
    return <option value={props.value} data-value={props.value}>{props.optionName}</option>
}