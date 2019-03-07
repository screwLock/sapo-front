import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
    const modifiers = { highlighted: {
      from: new Date(2019, this.props.selectedMonth, 12), 
      to: new Date(2019, this.props.selectedMonth, 16) 
    }
    }
    const highlightedStyle = `.DayPicker-Day--highlighted {
      background-color: red;
      color: white;
    }`;
    return (
      <div>
        <style>{highlightedStyle}</style>
        <DayPicker
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          selectedDays={this.props.selectedDate}
          disabledDays={{ daysOfWeek: [0] }}
        />
      </div>
    );
  }
}

export default OverviewDatePicker;