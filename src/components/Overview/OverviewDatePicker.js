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
      // Unselect the day if already selected
      this.props.handleClick(undefined);
      return;
    }
    this.props.handleClick(day);
  }
  render() {
    return (
      <div>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.props.selectedDate}
          disabledDays={{ daysOfWeek: [0] }}
        />
        {this.props.selectedDate ? (
          <p>You clicked {this.props.selectedDate.toLocaleDateString()}</p>
        ) : (
            <p>Please select a day.</p>
          )}
      </div>
    );
  }
}

export default OverviewDatePicker;