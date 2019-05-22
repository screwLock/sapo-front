import * as React from 'react'
import { H4 } from '@blueprintjs/core'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isVisible) {
            return (
                <React.Fragment>
                    <H4>Select A Pickup Date</H4>
                    <DayPicker
                        disabledDays={this.props.disabledDays}
                        onDayClick={this.props.onClick}
                        selectedDays={this.props.selectedDate}
                        fromMonth={new Date()}
                    />
                </React.Fragment>
            )
        }
        else {
            return ''
        }
    }
}

export default DatePicker