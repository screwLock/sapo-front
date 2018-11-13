import * as React from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { InputContainer } from './styles/inputContainer'
import { AppToaster } from '../Toaster'

class BlackoutDatesSingleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      reason: ''
    };
  }

  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  }

  handleClick = () => {
    this.showToast(`Pick a single blackout date`);
    //database call
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  render() {
    return (
      <div>
        <div>
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
            disabledDays={{ daysOfWeek: [0] }}
          />
          {this.state.selectedDay ? (
            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
              <p>Please select a day.</p>
            )}
        </div>
        <InputContainer>
          <FormGroup
            label="Enter a Reason"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="singleDateReason" placeholder="Enter a Reason" />
          </FormGroup>
          <div><Button onClick={this.handleClick}>Submit</Button></div>
        </InputContainer>
      </div>
    );
  }
}

export default BlackoutDatesSingleDatePicker;