import React from "react";
import Row from "./row";

function Body(props) {
    if (props.hasOwnProperty("hierarchicalData")) {
        return <tbody>{getHierarchicalCells(props.hierarchicalData, props.columns)}</tbody>;
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

const getHierarchicalCells = (data, columns, parent = null,parentElement=<></>) => {

    return data.map((row, rowIndex) => {
        let htmlRow = <>
            {row.data ? <>{getHierarchicalCells(row.data, columns.slice(1, columns.length), { name: columns[0].name, value: row[columns[0].name] },<>{rowIndex == 0 ? parentElement : <></>}<td rowSpan={getRowspan(row)}>{row[columns[0].name]}</td></>)}</> 
                : rowIndex == 0 ? <tr>{parentElement}{columns.map((c, i) => <td>{row[c.name]}</td>)}</tr>
                    : <tr data-parent-name={parent && parent.name} data-parent-value={parent && parent.value}>
                        {columns.map((c, i) => <td>{row[c.name]}</td>)}
                    </tr>}
        </>
        return htmlRow;
    })
}


const getRowspan = (item) => {
    if (item.data) {
        return item.data.reduce((acc, c) => {
            return acc += getRowspan(c)
        }, 0)
    } else {
        return 1
    }
}


export default Body;