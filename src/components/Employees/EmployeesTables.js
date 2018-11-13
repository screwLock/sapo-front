import * as React from 'react'
import ReactTable from 'react-table'
import { Button, Intent } from '@blueprintjs/core'
import "react-table/react-table.css"

class EmployeesTable extends React.Component {

    tableStyle = {
        'border': 'none',
    }

    getTHeadStyle = () => {
        return {
            style: {
                'box-shadow': 'none',
                'border': 'none',
                'font-weight' : 'bold'
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
                    columns={this.props.columns}
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

export default EmployeesTable;