import React, { Component } from 'react'
import TheadComponent from './components/thead.js';
import TBodyComponent from './components/tbody.js';
import jQuery from 'jquery';
import Footer from './components/footer.js';
import Search from './components/search.js';
import TableMenuComponent from './components/tablemenu.js';

let size = 5;
let enablePagination = true;
let enableSearch = true;
let enableColumnSelect = true;
let enableXLSExport = true;
let enablePDFExport = true;

export default class DatatableContainer extends Component {

    constructor(props) {
        super(props);
        this.initialize = this.initialize.bind(this);
        this.paginate = this.paginate.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.sort = this.sort.bind(this);
        this.find = this.find.bind(this);
        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
        this.getFilteredData = this.getFilteredData.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.exportData = this.exportData.bind(this);

        this.state = {
            data: props.data,
            searchString: "",
            page: 1,
            pages: [],
            columns: [],
            //filter:[{name:'first_name',value:'Tiger'},{name:'first_name',value:'Garrett'}]
            filter: []
        };

    }

    componentDidMount(){
        this.setState(() => {
            return {
                data: this.props.data
            }
        });
        this.initialize(this.props);
        if (this.props.data.length > 0) {
            this.paginate(this.props.data.length);
        }
    }


    initialize({ settings, data }) {
        let columns = [];

        if (this.state.data && this.state.data.length > 0) {
            columns = [...new Set([].concat.apply([], this.state.data.map((x) => { return { name: Object.keys(x), displayName: Object.keys(x), enabled: true } })))];
        }
        if (settings) {
            enablePagination = settings && settings.hasOwnProperty('search') ? settings.paginate : enablePagination;
            if (enablePagination) {
                size = settings && settings.hasOwnProperty('size') ? settings.size : size;
            }
            else {
                size = this.state.data.length;
            }
            enableSearch = settings && settings.hasOwnProperty('search') ? settings.search : enableSearch;

            if (settings.columns) {
                columns = [];
                settings.columns.forEach(column => {
                    columns.push(column);
                });
            }

            enableColumnSelect = settings && settings.hasOwnProperty('enableColumnSelect') ? settings.enableColumnSelect : enableColumnSelect;
            enableXLSExport = settings && settings.hasOwnProperty('enableXLSExport') ? settings.enableXLSExport : enableXLSExport;
            enablePDFExport = settings && settings.hasOwnProperty('enablePDFExport') ? settings.enablePDFExport : enablePDFExport;

        }
        this.setState(() => {
            return {
                columns: columns
            }
        });

    }

    sort(event) {
        try {
            const sortBy = event.currentTarget.attributes.getNamedItem('data-filter').nodeValue;
            //if desc option is available current is ascending
            //current direction

            const direction = (jQuery(event.currentTarget).attr('class').indexOf('fa-sort-desc') > 0 ? 
                                'DESC' : jQuery(event.currentTarget).attr('class').indexOf('fa-sort-asc') > 0 ? 'ASC' : undefined);
            //set all filter directions to none
            jQuery(event.currentTarget).parentsUntil('thead').find('fa.fa-sort-desc').attr('class', 'fa fa-sort float-right px-1');
            jQuery(event.currentTarget).parentsUntil('thead').find('fa.fa-sort-asc').attr('class', 'fa fa-sort float-right px-1');
            //change filter
            if (direction === 'DESC') {
                jQuery(event.currentTarget).attr('class', 'fa fa-sort-asc float-right px-1');
            } else if (direction === 'ASC') {
                jQuery(event.currentTarget).attr('class', 'fa fa-sort-desc float-right px-1');
            } else {
                jQuery(event.currentTarget).attr('class', 'fa fa-sort-asc float-right px-1');
            }
            //jQuery(event.currentTarget).find('i.fa').attr('class', (direction === 'DESC' ? 'fa fa-sort-asc float-right px-1' : 'fa fa-sort-desc float-right px-1'));

            if (direction === undefined) {
                this.setState((prevState) => {
                    return {
                        data: prevState.data.sort((a, b) => {
                            if (isNaN(parseInt(a[sortBy])) || isNaN(parseInt(b[sortBy]))) {
                                return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
                            } else {
                                return parseInt(a[sortBy]) > parseInt(b[sortBy]) ? 1 : parseInt(a[sortBy]) < parseInt(b[sortBy]) ? -1 : 0
                            }

                        })
                    }
                });
            }
            else {
                this.setState((prevState) => {
                    return {
                        data: prevState.data.reverse(s => s[sortBy])
                    }
                });
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    paginate(rows) {
        let pages = [];
        if (rows > 0) {
            this.index = 0;
            let pageCount = this.state.data && Math.ceil(rows / size);
            for (let index = 1; index <= pageCount; index++) {
                pages.push(index);
            }
        } else {
            pages.push(1);
        }
        this.setState((prevState) => {
            return {
                pages: pages,
                page: pages[0]
            }
        });
    }

    previousPage() {
        const prev = this.state.page - 1;
        if (prev >= 0) {
            this.setState(() => {
                return { page: prev }
            });
        }
    }

    nextPage() {
        const next = this.state.page + 1
        if (next <= this.state.pages.length) {
            this.setState(() => {
                return { page: next }
            });
        }
    }

    goToPage(event) {
        const page = event.currentTarget.id;

        this.setState(() => {
            return { page: parseInt(page) }
        })
    }

    find(event) {
        const searchString = event.target.value;
        this.setState(() => {
            return {
                searchString: searchString
            }
        })
    }

    toggleColumnVisibility(event) {
        event.stopPropagation();
        let selectedColumn = event.target.name;
        if (event.currentTarget.checked) {

            this.setState((prevState) => {
                prevState.columns.filter(x => x.name === selectedColumn)[0].enabled = true;
                return {
                    columns: prevState.columns
                }
            })
        } else {
            this.setState((prevState) => {
                prevState.columns.filter(x => x.name === selectedColumn)[0].enabled = false;
                return {
                    columns: prevState.columns,
                    filter: prevState.filter.reduce((a, i) => { return i.name === selectedColumn ? [...a] : [...a, i] }, [])
                }
            })
        }
    }

    isFound(row, match) {
        let filteredRow = {};
        this.state.columns.map((column, index) => {
            if (column.enabled === undefined ? true : column.enabled) {
                filteredRow[column.name] = row[column.name];
            }
        });
        if (filteredRow && (typeof (filteredRow) === 'object' || Array.isArray(filteredRow)) && match !== "") {
            if (typeof (filteredRow) === 'object')
                return Object.values(filteredRow).filter(p => p != null && p.toString().toLowerCase().indexOf(match.toLowerCase()) >= 0).length > 0 ? true : false;
            else
                return row.filter(p => p != null && p.toString().toLowerCase().indexOf(match) >= 0).length > 0 ? true : false;

        }
        return true;
    }

    getFilteredData() {
        debugger;
        if (this.state.filter.length === 0) {
            return this.state.data.filter(m => this.isFound(m, this.state.searchString))
        } else {
            return this.state.filter.map((f, i) => {
                return this.state.data.reduce((a, c) => {
                    let columnEnabled = this.state.columns.filter(s => s.name === f.name)[0].enabled;
                    if (!(columnEnabled === undefined ? true : columnEnabled) || (c[f.name] === f.value && a.filter(o => o === c).length === 0)) {
                        return [...a, c];
                    } else {
                        return [...a];
                    }
                }, [])
            }).reduce((acc, arr) => { return [...acc, ...arr] }, []);
        }
    }

    setFilter(event) {
        event.stopPropagation();
        let name = event.target.name;
        let value = event.target.id;
        if (event.target.checked) {
            this.setState((prevState) => {
                return {
                    filter: [...prevState.filter, { name, value }]
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    filter: prevState.filter.reduce((a, i) => { return i.name === name && i.value === value ? [...a] : [...a, i] }, [])
                }
            });
        }
    }

    exportData(){
        let data = this.getFilteredData();
        this.props.settings.exportXLS(data);
    }

    
    clearFilters(){
        this.setState(()=>{
            return{
                filter: []
            }
        })
    }

    render() {
        return (
            <div className="datatable">
                <div className="row py-2" >
                    <div className="col-sm-6" >
                        <TableMenuComponent
                            hidden={this.state.data == null}
                            enableColumnSelect={enableColumnSelect}
                            enablePDFExport={enablePDFExport}
                            enableXLSExport={enableXLSExport}
                            columns={this.state.columns}
                            checkChanged={this.toggleColumnVisibility}
                            clearFilters={this.clearFilters}
                            exportXLS={this.exportData}
                            >
                        </TableMenuComponent>
                    </div>
                    <div className="col-sm-6" hidden={enableSearch === false || this.state.data == null}>
                        <Search find={this.find}
                            searchString={this.state.searchString}
                            searchLabel="Search" />
                    </div>
                </div>
                <div className="row py-2" >
                    <div className="col-12" >
                        <table className="table table-hover table-bordered col-12">
                            <TheadComponent
                                columns={this.state.columns}
                                sort={this.sort}
                                rows={this.state.data}
                                setFilter={this.setFilter}
                                filter={this.state.filter}
                            />
                            <TBodyComponent columns={this.state.columns}
                                rows={this.getFilteredData().filter(m => this.isFound(m, this.state.searchString))
                                    .slice((this.state.page - 1) * size < 0 ? 0 : (this.state.page - 1) * size, (this.state.page * size))} />
                        </table>
                    </div>

                </div>
                {enablePagination && <Footer
                    size={size}
                    dataCount={this.getFilteredData().length}
                    pages={this.state.pages}
                    page={this.state.page}
                    previous={this.previousPage}
                    next={this.nextPage}
                    goToPage={this.goToPage}
                />}
            </div>
        )
    }
}
