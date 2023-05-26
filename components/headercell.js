import React from "react";
import Sort from "./sort";

function HeaderCell(props) {
    let currentColumn = props.columns.find(x=>x.name === props.name);
    let headerCssClass = currentColumn?.headerCssClass;
    let enableSorting = currentColumn?.hasOwnProperty('enableSorting') ? currentColumn?.enableSorting : props.settings.enableSorting

    return (<th width={props.width && `${props.width}%`} className={headerCssClass}>
        {props.displayName}
        {enableSorting && <Sort {...props} />}
    </th>)
}

export default HeaderCell;