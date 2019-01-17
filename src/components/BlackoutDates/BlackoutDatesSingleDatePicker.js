import * as React from 'react';
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from '@blueprintjs/core'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import styled from 'styled-components'
import { AppToaster } from '../Toaster'

class BlackoutDatesSingleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  getInitialState = () => {
    return {
      selectedDay: undefined,
      reason: '',
    };
  }

  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day })
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  handleClose = () => {
    this.setState(this.getInitialState());
    this.props.handleClose();
  }

  handleSubmit = () => {
    if (this.state.selectedDay === undefined) {
      this.showToast('Select A Date')
    }
    else if (this.state.reason === '') {
      this.showToast('Enter A Reason')
    }
    else {
      this.props.addDate({date: this.state.selectedDay, reason: this.state.reason});
      this.handleClose();
    }
  }

  render() {
    return (
      <Dialog isOpen={this.props.isOpen}
        title={'Add A Single Blackout Date'}
        onClose={this.props.handleClose}
      >
        <DialogContainer>
          <div>
            <div>
              <DayPicker
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDay}
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
                <InputGroup id="singleDateReason" 
                            placeholder="Enter a Reason" 
                            onBlur = {(e) => {this.setState({reason: e.target.value })}}
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

const DialogContainer = styled.div`
    maxWidth: 700px;
    maxHeight: 500px;
    margin: 20px;
`

const InputContainer = styled.div`
    width: 250px;
`

export default BlackoutDatesSingleDatePicker;