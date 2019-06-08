import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { keyframes } from "styled-components"
import { getDate, getMonth } from "date-fns"

class OverviewDatePicker extends Component {
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
    // we have to use getDate() so that we can safely ignore
    // the time part of the Date object
    let unconfirmed = monthPickups.filter(pickup => {
      return pickup.status === 'submitted'
    }).map(pickup => {
      return getDate(new Date(pickup.pickupDate))
    })
    // highlighted should be same month as selectedDate
    // as well as !confirmed
    const unconfirmedDays = (day) => {
      return unconfirmed.includes(getDate(day))
    }

    const modifiers = {
      unconfirmedDays: unconfirmedDays
    }

    const pulse = keyframes `
      0% {
        color: red;
      }
      50% {
        color: white;
      }
      100 {
        color: red;
      }
    `

    const highlightedStyle = `.DayPicker-Day--unconfirmedDays {
      color: red;
      font-weight: 800;
      animation-name: ${pulse};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }`

    return (
      <div>
        <style>{highlightedStyle}</style>
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

export default OverviewDatePicker;