import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { keyframes } from "styled-components";

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
    // highlighted should be same month as selectedDate
    // as well as !confirmed
    const modifiers = {
      highlighted: {
        from: new Date(2019, this.props.selectedMonth, 12),
        to: new Date(2019, this.props.selectedMonth, 16)
      }
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

    const highlightedStyle = `.DayPicker-Day--highlighted {
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
          disabledDays={{ daysOfWeek: [0] }}
        />
      </div>
    );
  }
}

export default OverviewDatePicker;