import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import { keyframes } from "styled-components"
import { getDate, getMonth } from "date-fns"
import dayStyles from './datePickerStyles/dayStyles'
import datePickerFullScreenStyles from './datePickerStyles/datePickerFullScreenStyles'

class DatePickerFullScreen extends Component {
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
            confirmedDays: confirmedDays
        }


        return (
            <div>
                <style>{dayStyles + datePickerFullScreenStyles}</style>
                <DayPicker
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    onMonthChange={this.props.handleMonthChange}
                    selectedDays={this.props.selectedDate}
                />
            </div>
        );
    }
}

export default DatePickerFullScreen;