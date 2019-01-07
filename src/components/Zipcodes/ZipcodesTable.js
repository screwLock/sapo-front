import * as React from 'react'
import ReactTable from 'react-table'
import { Button, Intent } from '@blueprintjs/core'
import "react-table/react-table.css"

class ZipcodesTable extends React.Component {

    columns = [
        {
            Header: 'Zipcode',
            accessor: 'zipcode',
            width: 200
        }, {
            Header: 'Weekdays',
            accessor: 'weekdays',
            width: 500
        },
        {
            Header: 'Actions',
            Cell: row => (
                <div>
                    <Button intent={Intent.PRIMARY} 
                            icon="edit" 
                            onClick={() => this.props.delete(row.index)}
                    />
                    <Button intent={Intent.DANGER} 
                            icon="trash" 
                            onClick={() => this.props.delete(row.index)}
                    />
                </div>
            ),
            width: 200
        }
    ];

    tableStyle = {
        'border': 'none',
    }

    getTHeadStyle = () => {
        return {
            style: {
                'box-shadow': 'none',
                'border': 'none',
                'font-weight': 'bold'
            }
        }
    }

    getPaginationStyle = () => {
        return {
            style: {
                'background-color': 'white',
                'box-shadow': 'none'
            }
        }
    }

    getTdStyle = () => {
        return {
            style: {
                'text-align': 'center'
            }
        }
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    columns={this.columns}
                    className="-highlight"
                    defaultPageSize={15}
                    showPageSizeOptions={false}
                    style={this.tableStyle}
                    previousText='<<'
                    nextText='>>'
                    noDataText='No Data Found'
                    getTdProps={this.getTdStyle}
                    getTheadProps={this.getTHeadStyle}
                    getPaginationProps={this.getPaginationStyle}
                />
            </div>
        )
    }
}

export default ZipcodesTable;