import * as React from './node_modules/react'
import { H4 } from './node_modules/@blueprintjs/core'
import { addMonths } from 'date-fns'
import DayPicker from './node_modules/react-day-picker'
import './node_modules/react-day-picker/lib/style.css'

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
                        toMonth={addMonths(new Date(), 4)}
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