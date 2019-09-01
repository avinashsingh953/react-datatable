import React, { Component } from 'react';
import Datatable from './datatable/datatable';
import tableData from './datatable/data.json';

export default class App extends Component {
    render() {
        return <Datatable
            settings={{
                enableColumnSelect: true
                , enableXLSExport: true
                , enablePDFExport: true
                , paginate: true
                , search: true
                , size: 7
                , columns: [
                    { name: 'first_name', displayName: 'First Name', enabled: true }
                    , { name: 'last_name', displayName: 'Last Name', tooltip: 'dsfhjdf dsiuij.  safkhf; safkjgsalif asfjgasfh slkfha;' }
                    , {
                        name: 'salary'
                        , displayName: 'Salary'
                        , cssClass: 'text-primary'
                        , fnCssStyle: (value) => {
                            return value > 300000 ? 'jll-color green' : 'jll-color stone';
                        }
                    },
                    { name: 'position', displayName: 'Designation', enabled: true }]
            }}
            data={tableData.data}

        />
    }
}