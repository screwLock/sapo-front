import * as React from 'react'
import ReactTable from 'react-table'
import { Button, Intent } from '@blueprintjs/core'
import DayPicker from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import "react-table/react-table.css"
import getDisabledDates from './getDisabledDates'
import styled from 'styled-components'

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
                    <Button onClick={this.handleClick(getDisabledDates(row.value))}
                        text='Preview'
                        minimal={true}
                    />
                )
            },
            width: 500
        },
        {
            Header: 'Actions',
            Cell: (row) => (
                <ActionsCell>
                    <ActionsContainer>
                        <Button intent={Intent.PRIMARY}
                            icon="edit"
                            onClick={() => this.props.editZipcode(row.index)}
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
    ];

    handleClick = (dates) => () => {
        this.props.isPreviewOpen(dates)
    }

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

export default ZipcodesTable;