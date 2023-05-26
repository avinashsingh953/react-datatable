import React from "react";
import Cell from "./cell";

function Row(props) {
    
    return (
        <tr className={props.styles.headerClass}>
            {props.columns && props.columns.length > 0 && props.columns.map((col, index) => {
                let data = props.rowData[col.name]
                return <Cell {...col} id={`col_header_${col.name}`} key={`col_header_${col.name}`} data={data} />
            })}
        </tr>
    )
}



export default Row;