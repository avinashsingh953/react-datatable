import React from 'react';

function Cell (props){
    return <td width={props.width && `${props.width}%`} rowSpan={props.rowSpan}>{props.data}</td>
}

export default Cell;