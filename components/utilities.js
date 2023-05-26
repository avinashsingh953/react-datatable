const fnIsFound = (row,columns,searchString) =>{
    if(row && columns){
        columns.forEach(column => {
            if(row[column.name].indexOf(searchString)){
                return true
            }
        });
    }
    return false
}

const fnSearch = (rows,columns,searchString)=>{
    if(rows && columns){
        return rows.filter((row)=>fnIsFound(row,columns,searchString));
    }
    return null
}

const fnSortData = (a, b, column) => {
    if (column.fnSortData) {
        return column.fnSortData(a, b, column)
    } else {
        if (/\d+-\d+-\d+T\d+:\d+:\d+/.test(a[column.name]) || /\d+-\d+-\d+T\d+:\d+:\d+/.test(b[column.name])) {
            let d1 = new Date(a[column.name]);
            let d2 = new Date(b[column.name]);
            if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
                return column.direction === "DESC" ? d2 - d1 : d1 - d2;
            } else if (!isNaN(d1.getTime()) && isNaN(d2.getTime())) {
                return column.direction === "DESC" ? 1 : -1;
            } else if (isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
                return column.direction === "DESC" ? -1 : 1;
            } else {
                return 0;
            }
        } else if (typeof (a[column.name]) === "number" && typeof (b[column.name]) === "number") {
            
            if(parseInt(a[column.name]) !== 18991231 && parseInt(b[column.name]) !== 18991231){
                return column.direction === "DESC" ? parseInt(a[column.name]) > parseInt(b[column.name]) ? -1 : parseInt(a[column.name]) < parseInt(b[column.name]) ? 1 : 0 : parseInt(a[column.name]) > parseInt(b[column.name]) ? 1 : parseInt(a[column.name]) < parseInt(b[column.name]) ? -1 : 0; 
            }
            else if (parseInt(a[column.name]) !== 18991231 && parseInt(b[column.name]) === 18991231){
                return column.direction === "DESC" ? 1 : -1;
            }
            else if (parseInt(a[column.name]) === 18991231 && parseInt(b[column.name]) !== 18991231){
                return column.direction === "DESC" ? -1 : 1;
            }
            else{
                return 0;
            }

        } else {
            
            if (a[column.name] != null && b[column.name] != null) { 
                return column.direction === "DESC" ? a[column.name].toLowerCase() > b[column.name].toLowerCase() ? -1 : a[column.name].toLowerCase() < b[column.name].toLowerCase() ? 1 : 0 : a[column.name].toLowerCase() > b[column.name].toLowerCase() ? 1 : a[column.name].toLowerCase() < b[column.name].toLowerCase() ? -1 : 0;
            } else if (a[column.name] !== null && b[column.name] === null) {
                return column.direction === "DESC" ? 1 : -1;
            } else if (a[column.name] == null && b[column.name] !== null) {
                return column.direction === "DESC" ? -1 : 1;
            } else {
                return 0;
            }
        }
    }
}

const sortColumnsByHierarchy = (columns, groupBy, showTotal) => {
    const groupCols = groupBy.map(x => x.name);
    let otherColumns = columns.filter((col) => groupCols.indexOf(col.name) === -1);
    return showTotal ? otherColumns : [...groupBy, ...otherColumns]
}

const getHierarchicalData = (data, groupBy, parent = null) => {
    let groups = [...new Set(data.map(d => d[groupBy[0].name]))];
    if (groupBy.length === 1) {
        return [{ name: groupBy[0].name, parent: parent, data: groups.map(h => ({ value: h, count: data.filter(f => f[groupBy[0].name] === h).length, data: data.filter(f => f[groupBy[0].name] === h) })) }]
    } else {
        return groups.reduce((acc, g) => {
            return acc = [...acc, ...getHierarchicalData(data.filter(d => d[groupBy[0].name] === g), groupBy.slice(1, groupBy.length), { name: groupBy[0].name, value: g })]
        }, [{ name: groupBy[0].name, parent: parent, data: groups.map(h => ({ value: h, count: data.filter(f => f[groupBy[0].name] === h).length, data: data.filter(f => f[groupBy[0].name] === h) })) }])
    }
}

export {
    fnIsFound,
    fnSearch,
    fnSortData,
    sortColumnsByHierarchy,
    getHierarchicalData
}