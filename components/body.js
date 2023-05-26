import React from "react";
import Row from "./row";

function Body(props) {
    if (props.settings.hasOwnProperty("groupBy") && props.settings.groupBy.length > 0) {
        const hierarchicalCells = getHierarchicalCells(props.data, props.columns);
        return hierarchicalCells;
    }
    else if (props.data && props.data.length > 0)
        return (
            <tbody>
                {props.data.map((rowData, i) => {
                    return <Row {...props} rowData={rowData} key={`row_${i}`} />
                })}
            </tbody>
        )
    else
        return (
            <tbody>
                <tr className={props.styles.headerClass}>
                    <td colSpan={props.columns ? props.columns.length : 1}>No Rows Found</td>
                </tr>
            </tbody>
        )
}

const getHierarchicalCells = (data, columns) => {
    
    if (data.length > 0) {
        return data.map((row, rowIndex) => {
            return <>
                {row.data ? <>
                    <td rowSpan={getRowspan(row)}>{row[columns[0].name]}</td>{getHierarchicalCells(row.data, columns.slice(1, columns.length))}
                </> :
                    rowIndex ==0 ? <>{columns.map((c, i) => <td>{row[c.name]}</td>)}</> : <tr>{columns.map((c, i) => <td>{row[c.name]}</td>)}</tr>}
            </>
        })
    }
    else {
        let row = data;
        return <tr>{columns.map(c => <td>{row[c.name]}</td>)}</tr>
    }
}

const getRowspan = (item) => {
    if(item.data){
        return item.data.reduce((acc,c)=>{
            return acc+=getRowspan(c)
        },0)
    }else{
        return 1
    }
}


export default Body;