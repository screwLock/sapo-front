import * as React from 'react';
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from '@blueprintjs/core'
import DayPicker, { DateUtils } from 'react-day-picker';
import '../Overview/CustomerCallIn/node_modules/react-day-picker/lib/style.css'
import styled from 'styled-components'
import { AppToaster } from '../Toaster'

class BlackoutDatesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  getInitialState = () => {
    return {
      selectedDays: [],
      reason: '',
    };
  }

  handleDayClick = (day, { selected }) => {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else if(!this.props.dates.includes(day.toISOString())){
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  handleClose = () => {
    this.setState(this.getInitialState());
    this.props.handleClose();
  }

  handleSubmit = () => {
    if (!(this.state.selectedDays.length > 0)) {
      this.showToast('Select A Date')
    }
    else if (this.state.reason === '') {
      this.showToast('Enter A Reason')
    }
    else {
      this.props.addDates(this.state.selectedDays, this.state.reason)
      this.handleClose()
    }
  }

  render() {
    return (
      <Dialog isOpen={this.props.isOpen}
        title='Add Blackout Dates'
        onClose={this.props.handleClose}
      >
        <DialogContainer>
          <div>
            <div>
              <DayPicker
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDays}
              />
              {this.state.selectedDays.length > 0 ? (
                <p>You clicked {this.state.selectedDays.map(day => `${day.toLocaleDateString()}, `)}</p>
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

const DialogContainer = styled.div`
    maxWidth: 700px;
    maxHeight: 500px;
    margin: 20px;
`

const InputContainer = styled.div`
    width: 250px;
`

export default BlackoutDatesPicker;