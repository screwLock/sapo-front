import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { postalCodeValidator } from './postalCodeValidator'
import ZipcodeWeekdays from './ZipcodeWeekdays'
import ZipcodeInput from './ZipcodeInput'
import { weekdays, IWeekday } from "./checkedWeekdays";
import { AppToaster } from '../Toaster'
import { produce } from 'immer';

class EditZipcode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcode: this.getInitialState.zipcode,
            weekdays: this.getInitialState.weekdays,
        }
    }

    // getInitialState and constructor are only called once, should
    // not be given props

    getInitialState = () => {
        if (this.props.zipcode) {
            return {
                zipcode: this.props.zipcode.zipcode,
                weekdays: this.props.zipcode.weekdays,
            }
        }
        else {
            return {
                zipcode: '',
                weekdays: weekdays
            }
        }
    }


    isAllChecked = (index) => {
        if (this.state.weekdays[index].all === true) {
            produce(this.state, draft => {
                draft.weekdays[index].disabledCheckbox = true;
            })
        }
        else if (this.state.weekdays[index].all === false) {
            produce(this.state, draft => {
                draft.weekdays[index].disabledCheckbox = false;
            })
        }
    }

    countCheckedDays = () => {
        return this.state.weekdays.filter(weekday => {
            return weekday.all === true
                || weekday.first === true
                || weekday.second === true
                || weekday.third === true
                || weekday.fourth === true
                || weekday.fifth === true
        }).length
    }

    handleBlur = (e) => {
        this.setState({ zipcode: e.target.value });
    }

    handleCheckedChange = (index) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.weekdays[index][e.target.name] = !draft.weekdays[index][e.target.name]
            }), () => this.isAllChecked(index))
    }

    handleClose = () => {
        this.setState({ zipcode: '', weekdays: weekdays.slice() });
        this.props.handleClose();
    }

    handleSubmit = () => {
        if (!postalCodeValidator(this.state.zipcode)) {
            this.showToast(`Enter a valid postal code`);
        }
        else if (this.countCheckedDays() === 0) {
            this.showToast(`Please select at least one weekday`);
        }
        else {
            this.props.editZipcode({ zipcode: this.state.zipcode, weekdays: this.state.weekdays });
            //reset the checked weekday values
            this.setState({ zipcode: '', weekdays: weekdays.slice() });
            this.props.handleClose();
            console.log(this.props.index)
            //database call
            //show toast if save successful
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        let title = 'Edit Zipcode';
        return (
            <Dialog isOpen={this.props.isOpen}
                title={title}
                onClose={this.handleClose}
                style={{ width: '750px' }}
            >
                <DialogContainer>
                    <ZipcodeInput
                        onBlur={this.handleBlur}
                        value={this.state.zipcode}
                    />
                    <ZipcodeWeekdays
                        onChange={this.handleCheckedChange}
                        weekdays={this.state.weekdays}
                    />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const DialogContainer = styled.div`
    width: 750px;
    margin: 20px;
    margin-top: 10px;
`

export default EditZipcode;