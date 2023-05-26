import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

function Sort(props) {
    let sortIcon = "fa fa-sort";

    const getUpdatedColumns = (item) => {
        let updatedColumn = item.columns.find(c => c.name === item.name);
        if(updatedColumn.direction === "DESC"){
            updatedColumn.direction = "ASC"
        }else{
            updatedColumn.direction = "DESC"
        }
        
        return {
            ...item, settings: {
                ...item.settings
                , sortBy: [updatedColumn]
            }
        }
    }

    if (props.settings.enableSorting) {
        let sortSettings = props.settings.sortBy.find(c => c.name === props.name)
        if (props.settings.sortBy && sortSettings) {
            if (sortSettings.direction === 'DESC') {
                sortIcon = 'fa fa-caret-up'
            } else {
                sortIcon = 'fa fa-caret-down'
            }
        }

    }

    return <i className={sortIcon} aria-hidden="true" onClick={() => props.fnSortColumn(getUpdatedColumns(props))} />
}

export default Sort;