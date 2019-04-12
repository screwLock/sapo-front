import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { postalCodeValidator } from './postalCodeValidator'
import ZipcodeWeekdays from './ZipcodeWeekdays'
import { weekdays, IWeekday } from "./checkedWeekdays";
import { AppToaster } from '../Toaster'
import { produce } from 'immer';

class EditZipcode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcode: '',
            weekdays: weekdays.slice(),
        }
    }

    componentDidMount = () => {
        this.setState({zipcode: this.props.zipcode.zipcode, weekdays: this.props.zipcode.weekdays })
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
        // console.log(index)
        // console.log(this.state.weekdays)
        // the above is changing like its supposed to ...
        this.setState(
            produce(this.state, draft => {
                draft.weekdays[index][e.target.name] = !draft.weekdays[index][e.target.name]
            }), () => this.isAllChecked(index))
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
            this.props.handleClose();
            //database call
            //show toast if save successful
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOpen}
                title='Edit Zipcode'
                onClose={this.props.handleClose}
                style={{ width: '750px' }}
            >
                <DialogContainer>
                    <H3>Edit Zipcode {this.props.zipcode.zipcode}</H3>
                    <ZipcodeInputGroup id="zipcode-value"
                        placeholder="Enter a Zipcode"
                        defaultValue = {this.props.zipcode.zipcode}
                        // we use onBlur to modify the dialog's state zipcode
                        onBlur={this.handleBlur}
                        key = {this.props.zipcode.zipcode}
                    />
                    <ZipcodeWeekdays
                        onChange={this.handleCheckedChange}
                        weekdays={this.state.weekdays}
                    />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleClose}>Cancel</Button>
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

const ZipcodeInputGroup = styled(InputGroup)`
    width: 150px;
`

export default EditZipcode;