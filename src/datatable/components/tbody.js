import React from 'react';

const TBodyComponent = (props) => {
    if (typeof (props.rows[0]) === 'object') {
        return (
            <tbody>
                {props.rows.map((row, rowindex) => {
                    return <tr key={rowindex}>
                        {props.columns.map((column, colindex) => {
                            
                            if(column.enabled === undefined ? true : column.enabled ){
                                let data = row[column.name];
                                let cssStyle = column.cssClass;
                                if (column.fnCssStyle){
                                    cssStyle = column.fnCssStyle(row[column.name]);
                                }
                                if(column.fnFormatData){
                                    data = column.fnFormatData( row[column.name]);
                                }
                                
                                return <td key={rowindex + "-" + colindex} className={cssStyle} style={{minWidth:isNaN(column.width) ? null : column.width}}>{data}</td>
                               
                            }
                        })
                        }
                    </tr>
                })
                }
            </tbody>
        )
    } else {
        return (
            <tbody>
                <tr>

                    {props.rows.map((row, index) => {
                        return <td key={index}>{row}</td>
                    })
                    }
                </tr>
            </tbody>
        )
    }
}

export default TBodyComponent;