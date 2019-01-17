import * as React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { eachDay } from 'date-fns'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import styled from 'styled-components'
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
      reason: '',
      dates: [],
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
        dates: eachDay(this.state.from, day)
      });
    }
  }

  handleClose = () => {
    this.setState(this.getInitialState())
    this.props.handleClose()
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

  handleSubmit = () => {
    if (!this.state.from || !this.state.to) {
      this.showToast('Select A Date')
    }
    else if (this.state.reason === '') {
      this.showToast('Enter A Reason')
    }
    else {
      this.state.dates.forEach(date => {
        this.props.addDate({ date: date, reason: this.state.reason })
      })
      this.setState(this.getInitialState())
      this.props.handleClose()
    }
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
      <Dialog isOpen={this.props.isOpen}
        title={'Add A Range of Dates'}
        onClose={this.props.handleClose}
      >
        <DialogContainer>
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
                <InputGroup id="dateRangeReason"
                  placeholder="Enter a Reason"
                  onBlur={(e) => { this.setState({ reason: e.target.value }) }}
                />
              </FormGroup>
            </InputContainer>
          </div>
        </DialogContainer>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}


const InputContainer = styled.div`
    width: 250px;
`
const DialogContainer = styled.div`
    maxWidth: 700px;
    maxHeight: 500px;
    margin: 20px;
`

export default BlackoutDatesRangeDatePicker;