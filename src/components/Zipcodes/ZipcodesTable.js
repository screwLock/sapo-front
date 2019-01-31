import * as React from 'react'
import ReactTable from 'react-table'
import { Button, Intent } from '@blueprintjs/core'
import DayPicker from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
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
                    <Button onClick={this.handleClick(this.convertToDates(row.value))}
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

    nthWeekdayOfMonth = (weekday, n, iDate) => {
        let month = iDate.getMonth();
        let date = new Date(iDate.getFullYear(), month, 1)
        let add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;

        // make sure that we stay in the same month
        do {
            date.setMonth(month);
            date.setDate(1 + add);
            add -= 7;
        } while (date.getMonth() !== month);

        return date;
    }

    nthWeekdayOfEveryMonth = (weekday, n, iDate = new Date()) => {
        let days = []
        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        months.forEach(month => {
            let newMonth = iDate.getMonth() + month
            let newDate = new Date(iDate.getFullYear(), month, 1)
            days.push(this.nthWeekdayOfMonth(weekday, n, newDate))
        })
        return days;
    }

    getWeekdayValues = (weekdays) => {
        return weekdays.map((day) => Object.keys(day).filter((k) => day[k] && k !== 'day'))
    }

    convertToDates = (weekdays) => {
        let converted = this.getWeekdayValues(weekdays)
        converted = converted.map(date => this.convertOrdinalsToNumbers(date))
        let arrayOfDates = [];
        converted.map((dates, index) => dates.map(date => arrayOfDates = [...arrayOfDates, ...this.nthWeekdayOfEveryMonth(index, date)]))
        return arrayOfDates
        //for each number, add a year of desired days to disabled dates
    }

    convertOrdinalsToNumbers = (ordinals) => {
        const dayNumbers = [];
        if (ordinals.includes('all')) {
            dayNumbers.push(1, 2, 3, 4, 5)
            return dayNumbers;
        }
        else if (ordinals.includes('first')) {
            dayNumbers.push(1)
        }
        else if (ordinals.includes('second')) {
            dayNumbers.push(2)
        }
        else if (ordinals.includes('third')) {
            dayNumbers.push(3)
        }
        else if (ordinals.includes('fourth')) {
            dayNumbers.push(4)
        }
        else if (ordinals.includes('fifth')) {
            dayNumbers.push(5)
        }
        return dayNumbers;
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