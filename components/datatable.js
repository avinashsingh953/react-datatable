import React from 'react';
import Table from "./table";
import HierarchicalTable from './hierarchicalTable';
import Styles from './style';
import merge from "lodash/merge";
import styles from './style';
import settings from './settings';
import { sortColumnsByHierarchy, fnSortData } from "./utilities";

function Datatable(props) {

  let defaultProps = {
    data: null,
    columns: null,
    styles: styles,
    settings: settings
  }

  let updatedProps = merge(defaultProps, props);
  let newData = updatedProps.data;

  // removing unwanted columns
  if (updatedProps.data && updatedProps.data.length > 0 && updatedProps.columns && updatedProps.columns.length > 0) {
    newData = newData.map(d => {
      return updatedProps.columns.reduce((acc, c) => {
        acc[c.name] = d[c.name]
        return acc
      }, {})
    })
  }

  // sorting rows
  if (updatedProps.data && updatedProps.data.length > 0 && updatedProps.settings.sortBy && updatedProps.settings.sortBy.length > 0) {
    newData = newData.sort((a, b) => updatedProps.settings.sortBy.reduce((r, column) => {
      return r = r || fnSortData(a, b, column)
    }, 0));
  }

  updatedProps.data = newData;

  const [newProps, setNewProps] = React.useState(updatedProps)


  const fnSortColumn = (item) => {
    setNewProps({ ...merge(newProps, item) })
  }


  return (
    <div className={newProps.styles.containerClass}>
      {newProps.settings.groupBy && newProps.settings.groupBy.length > 0 ? <HierarchicalTable {...newProps} /> : <Table {...newProps} fnSortColumn={fnSortColumn} />}

    </div>
  )
}

export default Datatable;