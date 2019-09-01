import React from 'react';
import '../css/datatable.css';

const TableMenuComponent = (props) => {
    const columnFilterEnabled = props.columns.filter(c => c.enabled === undefined ? true : c.enabled).length > 0;
    return (
        <div className="ml-auto dropdown inline py-1">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button className="btn btn-md btn-red" hidden={props.enableColumnSelect === false} type="button"
                    id="columndropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-th-list" aria-hidden="true"></i>
                </button>
                <div className="dropdown-menu dropdown-jll" aria-labelledby="columndropdownMenu">
                    {props.columns.map((column, index) => {
                        return <div className="dropdown-item" key={column.name}>
                            <div className="form-check">
                                <input type="checkbox"  id={"tbl_chk_clmn_" + column.name}
                                    checked={column.enabled === undefined ? true : column.enabled}
                                    name={column.name}
                                    onChange={props.checkChanged} />
                                <label className="form-check-label" htmlFor={"tbl_chk_clmn_" + column.name}>{column.displayName}</label>

                            </div>
                        </div>
                    }
                    )}
                </div>
                <button type="button" className="btn btn-md btn-red" hidden={props.enableXLSExport === false} onClick={props.exportXLS}>
                    <i className="fa fa-file-excel-o"></i>
                </button>
                <button type="button" className="btn btn-md btn-red" hidden={props.columnFilterEnabled} onClick={props.clearFilters}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default TableMenuComponent;