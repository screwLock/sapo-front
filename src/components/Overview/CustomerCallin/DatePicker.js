import * as React from 'react'
import { H4 } from '@blueprintjs/core'
import { addMonths } from 'date-fns'
import DayPicker from 'react-day-picker'
import { animated, Transition } from 'react-spring/renderprops';
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

        return (
            <Transition
                items={this.props.isVisible}
                from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}
                native
                reset
                unique
            >
                {isVisible =>
                    isVisible
                        ? props => <animated.div
                            key={0}
                            style={{ ...props }}
                        >                        
                        <H4>Select A Pickup Date</H4>
                            <DayPicker
                                disabledDays={this.props.disabledDays}
                                onDayClick={this.props.onClick}
                                selectedDays={this.props.selectedDate}
                                fromMonth={new Date()}
                                toMonth={addMonths(new Date(), 4)}
                                modifiersStyles={modifiersStyles}
                                weekdayElement={<Weekday />}
                            /></animated.div>
                        : props => <animated.div
                            key={1}
                            style={{ ...props }}
                        ></animated.div>
                }
            </Transition>

        )
    }
}

export default DatePicker