import React from "react";
import HeaderCell from "./headercell";


function Header (props) {
    return (
        <thead className={props.styles.headerClass}>
            <tr>
            {props.columns && props.columns.length > 0 && props.columns.map((col,index)=>{
                if(col.enabled !== false){
                    return <HeaderCell {...props} {...col} id={`col_header_${col.name}`} key={`col_header_${col.name}`}/>
                }
            })}
            </tr>
        </thead>
    )
}

export default Header;