import React from 'react';

const TheadComponent = (props) => {
    return (
        <thead>
            <tr className="tblFilterHeader">
                {props.columns.map((col, index) => {
                    let columns = props.columns.filter(c => c.hasOwnProperty('name') ? c.name === col.name : true);
                    ///x.reduce((p,v)=>{return p.includes(v) ? p : [...p,v]},[]) 
                    let uniquerows = props.rows.map((i, j) => { return i[col.name] }).reduce((p, v) => { return p.filter(h => h === v).length > 0 ? p : [...p, v] }, []);
                    /// is any filter selected
                    let hasActiveFilters = props.filter.filter(c=>c.name === col.name).length >0;
                    let style={};
                    if (hasActiveFilters){
                        style = {
                            color:'#8E44AD'
                        }
                    }
                    if (columns.length > 0 && (columns[0].enabled === undefined ? true : columns[0].enabled)) {
                        return (<th key={col.name} scope="col" className='dropdown head sortable' style={{ minWidth: col.width }}>
                            <div className="float-left">
                                {col.hasOwnProperty('displayName') ? col.displayName : col}
                                {col.tooltip && <span className="hover-tooltip">
                                    <span className="fa fa-info-circle px-1"
                                        aria-hidden="true"
                                        style={{ cursor: 'pointer' }}>
                                    </span>
                                    <span className="tooltiptext top">{col.tooltip}</span>
                                </span>}

                            </div>
                            {/* //// if column filter enabled */}
                            <div id={col.name + '_dropdownMenu'}
                                className="fa fa-filter float-right px-2"
                                aria-hidden="true"
                                data-toggle='dropdown' aria-haspopup="true"
                                aria-expanded="false"
                                style={style}
                            />
                            <div className="dropdown-menu filterDropdown"
                                aria-labelledby={col.name + '_dropdownMenu'}>
                                {uniquerows.sort().map((item, index) => {
                                    return <div className="dropdown-item " key={"chk_" + item}>
                                        <div className="form-check">
                                            <input type="checkbox" 
                                            id={item} name={col.name} 
                                            checked = { props.filter.filter(c=>c.name === col.name && c.value===item).length > 0 }
                                            onChange={props.setFilter} />
                                            <label className="form-check-label" htmlFor={item}>{col.fnFormatData ? col.fnFormatData(item) : item}</label>
                                        </div>
                                    </div>
                                })
                                }
                            </div>
                            <div className="fa fa-sort float-right px-2"
                                aria-hidden="true"
                                onClick={props.sort}
                                data-filter={col.name}
                            />
                            
                        </th>)
                    }
                })
                }
            </tr>
        </thead>
    )
}

export default TheadComponent;