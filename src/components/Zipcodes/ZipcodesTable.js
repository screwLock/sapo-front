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
            Cell: row => {
                return (
                  <div>
                    <span>{this.filterSelectedWeekdays(row.row.weekdays)}</span>
                  </div>
                )
            },
            width: 500
        },
        {
            Header: 'Actions',
            Cell: (row) => (
                <div>
                    <Button intent={Intent.PRIMARY}
                        icon="edit"
                        onClick={() => this.props.editZipcode(row.index)}
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

    filterSelectedWeekdays = (weekdays) => {
        let selectedWeekdays = weekdays.filter(weekday => {
            return weekday.checked === true
        })
        selectedWeekdays = selectedWeekdays.map(weekday => {
            return weekday.day
        })
        return `${selectedWeekdays} `;
    };

    getTHeadStyle = () => {
        return {
            style: {
                'boxShadow': 'none',
                'border': 'none',
                'fontWeight': 'bold'
            }
        }
    }

    getPaginationStyle = () => {
        return {
            style: {
                'backgroundColor': 'white',
                'boxShadow': 'none'
            }
        }
    }

    getTdStyle = () => {
        return {
            style: {
                'textAlign': 'center'
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