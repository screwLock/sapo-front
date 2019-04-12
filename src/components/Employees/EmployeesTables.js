import * as React from 'react'
import ReactTable from 'react-table'
import { Button, Intent } from '@blueprintjs/core'
import "react-table/react-table.css"
import styled from 'styled-components'

class EmployeesTable extends React.Component {

    columns = [{
        Header: 'ID',
        accessor: 'employeeID',
        width: 100
    }, {
        Header: 'Last Name',
        accessor: 'lastName'
    }, {
        Header: 'First Name',
        accessor: 'firstName'

    }, {
        Header: 'Email',
        accessor: 'email'
    }, {
        Header: 'Phone Number',
        accessor: 'phoneNumber'
    }, {
        Header: 'Role',
        accessor: 'access',
        width: 125,
    },
    {
        Header: 'Actions',
        Cell: (row) => (
            <ActionsCell>
                <ActionsContainer>
                    <Button intent={Intent.PRIMARY}
                        icon="edit"
                        onClick={() => this.props.editEmployee(row.index)}
                    />
                    <Button intent={Intent.DANGER}
                        icon="trash"
                        onClick={() => this.props.delete(row.index)}
                    />
                </ActionsContainer>
            </ActionsCell>
        ),
        width: 200
    }
    ]

    tableStyle = {
        'border': 'none',
    }

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

const ActionsCell = styled.div`
    display: flex;
    justify-content: center;
`

const ActionsContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
`

export default EmployeesTable;