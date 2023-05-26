import React from "react";
import Body from "./body";
import _ from 'lodash';
import Header from "./header";
import { sortColumnsByHierarchy } from "./utilities";


const getHierarchicalData = (data, groupBy) => {
    let groups = [...new Set(data.map(d => d[groupBy[0].name]))];
    if (groupBy.length === 1) {
        
        return groups.map(h => {
            let item = {}
            item[groupBy[0].name] = h
            item.data = data.filter(f => f[groupBy[0].name] === h).map(i=>{
                delete i[groupBy[0].name];
                return i
            })
            return item
        })
    } else {

        return groups.map(h => {
            let item = {}
            item[groupBy[0].name] = h
            item.data = getHierarchicalData(data.filter(f => f[groupBy[0].name] === h).map(i=>{
                delete i[groupBy[0].name];
                return i
            }), groupBy.slice(1, groupBy.length))
            return item
        })
    }
}

function HierarchicalTable(props) {
    let hierarchicalData = getHierarchicalData(_.cloneDeep(props.data),_.cloneDeep(props.settings.groupBy))

    let columns = props.columns.map(c => ({ ...c, enableSorting: false }))

    columns = sortColumnsByHierarchy(columns,props.settings.groupBy,props.settings.showTotal);

    let settings = {...props.settings, enableSorting : false}

    return (
        <table className={props.styles.tableClass}>
            {settings.header.enabled && <Header {...props} settings={settings} columns={columns} data={hierarchicalData} />}
            <Body {...props} settings={settings} columns={columns} data={hierarchicalData} />
        </table>
    )
}


export default HierarchicalTable;