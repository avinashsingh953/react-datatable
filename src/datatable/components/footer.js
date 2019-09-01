import React from 'react';
import '../css/datatable.css';

const Footer = (props) => {
    let pages = [];
    let pageCount = Math.ceil(props.dataCount / props.size);
    for (let index = 1; index <= pageCount; index++) {
        pages.push(index);
    }
    return (
        <nav className="row pt-2 w-100" aria-label="...">
            <ul className="pagination">
                
                <li className={props.page === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link" aria-disabled="true" onClick={props.previous}>Previous</a>
                </li>
                {pages.map((item,index)=>{
                    
                    if( (props.page > item ? (props.page-item):(item-props.page) )+(item >= props.page ? (item - props.page) : (props.page-item))<5){
                        return ( <li key={item} className={props.page === item ? "page-item active" : "page-item"}>
                            <a className="page-link" id={item} onClick={props.goToPage}>
                                {item} {item===props.page && <span className="sr-only">(current)</span>}
                            </a>
                        </li>)
                    }else{
                        return (<li key={item}></li>)
                    }
                })}
                
                <li className={props.page === props.pages[props.pages.length - 1] ? "page-item disabled" : "page-item"}>
                    <a className="page-link" onClick={props.next}>Next</a>
                </li>
                <li className="page-item text-dark">
                   <span className="page-link"> {(props.page-1)*props.size+1} - {(props.page)*props.size > props.dataCount ? props.dataCount : (props.page)*props.size} of {props.dataCount}</span>
                </li>
            </ul>
        </nav>
    )
}

export default Footer;