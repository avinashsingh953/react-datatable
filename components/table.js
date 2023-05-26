import React from "react";
import Body from "./body";
import Header from "./header";

function Table(props) {

    let [data, setData] = React.useState(null);

    React.useEffect(() => {
        setData(props.data)
    }, [props])

    return (
        <table className={props.styles.tableClass}>
            {props.settings.header.enabled && <Header {...props} data={data} />}
            <Body {...props} data={data} />
        </table>
    )
}


export default Table;