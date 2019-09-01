import React from 'react';
import '../css/datatable.css';

const Search = (props) => {
    return (
        <div className="ml-auto float-md-right inline py-1">
            <input className="form-control form-control-md form-search" value={props.searchString} type="text"
                placeholder={props.searchLabel}
                onChange={props.find} />
        </div>
    )
}

export default Search;