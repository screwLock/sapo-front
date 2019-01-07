import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { postalCodeValidator } from './postalCodeValidator'
import ZipcodeWeekdays from './ZipcodeWeekdays'
import ZipcodeInput from './ZipcodeInput'
import { weekdays, IWeekday } from "../common_types/checkedWeekdays";
import { AppToaster } from '../Toaster'
import { produce } from 'immer';

class NewZipcode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newZipcode: '',
            weekdays: [],
        }
    }

    componentDidMount = () => {
        this.setState({weekdays: weekdays.slice()})
    }

    filterSelectedWeekdays = () => {
        let selectedWeekdays = this.state.weekdays.filter(weekday => {
            return weekday.checked === true
        })
        selectedWeekdays = selectedWeekdays.map(weekday => {
            return weekday.day
        })
        return `${selectedWeekdays} `;
    };
    

    handleBlur = (e) => {
        this.setState({ newZipcode: e.target.value });
    }
    
    handleCheckedChange = (index) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.weekdays[index].checked = !draft.weekdays[index].checked;
            }));
    }

    handleSubmit = () => {
        if (!postalCodeValidator(this.state.newZipcode)) {
            this.showToast(`Enter a valid postal code`);
        }
        else if (weekdays.length === 0) {
            this.showToast(`Please select at least one weekday`);
            console.log(this.state.weekdays)
        }
        else {
            this.props.addZipcode({zipcode: this.state.newZipcode, weekdays: this.filterSelectedWeekdays()});
            //reset the checked weekday values
            this.setState({weekdays: weekdays.slice()});
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
                title='Add a New Zipcode'
                onClose={this.props.handleClose}
            >
                <DialogContainer>
                    <ZipcodeInput
                        onBlur={this.handleBlur}
                        value={this.state.newZipcode}
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
    width: 400px;
    margin: 20px;
    margin-top: 10px;
`

export default NewZipcode;
