import * as React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import { InputContainer } from './styles/inputContainer'
import 'react-day-picker/lib/style.css'
import './styles/blackoutDatesRange.css'

class BlackoutDatesRangeDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
      reason: ''
    };
  }

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick = (day) => {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }

  handleDayMouseEnter = (day) => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  handleResetClick = () => {
    this.setState(this.getInitialState());
  }

  handleClick = () => {
    this.showToast(`Pick a range of dates`);
    //database call
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
        <div>
          <p>
            {!from && !to && 'Please select the first day.'}
            {from && !to && 'Please select the last day.'}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
              </button>
              )}
          </p>
        </div>
        <InputContainer>
          <FormGroup
            label="Enter a Reason"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="dateRangeReason" placeholder="Enter a Reason" />
          </FormGroup>
          <div><Button onClick={this.handleClick}>Submit</Button></div>
        </InputContainer>
      </div>
    );
  }
}

export default BlackoutDatesRangeDatePicker;