import * as React from 'react'
import { H4 } from '@blueprintjs/core'
import { addMonths } from 'date-fns'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const modifiersStyles = {
            selected: {
                backgroundColor: '#555555'
            }
        }

        const Weekday = ({ weekday, className, localeUtils, locale }) => {
            const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
            return (
                <div className={className} title={weekdayName}>
                    {weekdayName.slice(0, 2).toUpperCase()}
                </div>
            );
        }

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
                        modifiersStyles={modifiersStyles}
                        weekdayElement={<Weekday />}
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