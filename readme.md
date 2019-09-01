#Datatable Module

A node datatable module built using react.

#usage

<Datatable
            settings={{
                enableColumnSelect: true
                , enableExport: true
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