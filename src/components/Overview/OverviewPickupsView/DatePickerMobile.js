import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import { getDate, getMonth, isSameDay } from "date-fns"
import dayStyles, { unconfirmedSelected } from './datePickerStyles/dayStyles'
import datePickerMobileStyles from './datePickerStyles/datePickerMobileStyles'
import BlackoutDates from '../../BlackoutDates/BlackoutDates';

class DatePickerMobile extends Component {
    constructor(props) {
        super(props);
    }
    handleDayClick = (day, { selected, disabled }) => {
        if (disabled) {
            // Day is disabled, do nothing
            return;
        }
        if (selected) {
            // Keep day selected if alread selected
            this.props.handleClick(day);
            return;
        }
        this.props.handleClick(day);
    }

    render() {
        let modifiersStyles;
        // get the pickups in the selected Month
        let monthPickups = this.props.pickups.filter(pickup => {
            return getMonth(pickup.pickupDate) === this.props.selectedMonth
        })
        // get the days with pickups that have 'unconfirmed' status
        // we have to use getDate() so that we can safely ignore
        // the time part of the Date object
        let unconfirmed = monthPickups.filter(pickup => {
            return pickup.status === 'submitted'
        }).map(pickup => {
            return getDate(new Date(pickup.pickupDate))
        })

        // we need to check if the selected date is 'unconfirmed'
        // for styling purposes
        if (unconfirmed.includes(getDate(this.props.selectedDate))) {
            modifiersStyles = {
                selected: unconfirmedSelected
            }
        }
        else {
            modifiersStyles = {
                selected: {
                    backgroundColor: '#555555'
                }
            }
        }

        // we need to check if unconfirmed 

        // get the days with pickups that have 'confirmed' status
        // if a day contains a unconfirmed (submitted) date,
        // then the unconfirmed style should take priority
        // so confirmedDays should never return a day with
        // an unconfirmed day
        let confirmed = monthPickups.filter(pickup => {
            return pickup.status === 'confirmed'
        }).map(pickup => {
            return getDate(new Date(pickup.pickupDate))
        }).filter(confirmed => {
            return !unconfirmed.includes(confirmed)
        })

        // supply a function to the modifiers of day-picker
        // highlighted should be same month as selectedDate
        // as well as !confirmed
        const unconfirmedDays = (day) => {
            return unconfirmed.includes(getDate(day))
        }

        const confirmedDays = (day) => {
            return confirmed.includes(getDate(day))
        }

        const modifiers = {
            unconfirmedDays: unconfirmedDays,
            confirmedDays: confirmedDays,
        }

        const Weekday = ({ weekday, className, localeUtils, locale }) => {
            const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
            return (
                <div className={className} title={weekdayName}>
                    {weekdayName.slice(0, 2).toUpperCase()}
                </div>
            );
        }

        const Navbar = ({
            nextMonth,
            previousMonth,
            onPreviousClick,
            onNextClick,
            className,
            localeUtils,
        }) => {
            const styleLeft = {
                float: 'left',
            };
            const styleRight = {
                float: 'right',
            };
            return (
                <div className={className}>
                    <button style={styleLeft} onClick={() => onPreviousClick()}>
                        ←
                </button>
                    <button style={styleRight} onClick={() => onNextClick()}>
                        →
                </button>
                </div>
            );
        }

        return (
            this.props.showMobileDatePicker
                ? (
                    <div>
                        <style>{dayStyles + datePickerMobileStyles}</style>
                        <DayPicker
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}
                            onDayClick={this.handleDayClick}
                            onMonthChange={this.props.handleMonthChange}
                            selectedDays={this.props.selectedDate}
                            weekdayElement={<Weekday />}
                        />
                    </div>
                ) :
                ''
        )
    }
}

export default DatePickerMobile;