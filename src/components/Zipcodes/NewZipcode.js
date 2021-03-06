import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { postalCodeValidator } from './postalCodeValidator'
import ZipcodeWeekdays from './ZipcodeWeekdays'
import { weekdays, IWeekday } from "./checkedWeekdays";
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

    isAllChecked = (index) => {
        if(this.state.weekdays[index].all === true){
            produce(this.state, draft => {
                draft.weekdays[index].disabledCheckbox = true;
            })
        }
        else if(this.state.weekdays[index].all === false){
            produce(this.state, draft => {
                draft.weekdays[index].disabledCheckbox = false;
            })
        }
    }

    componentDidMount = () => {
        this.setState({weekdays: weekdays.slice()})
    }
    
    countCheckedDays= () => {
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
        this.setState({ newZipcode: e.target.value });
    }
    
    handleCheckedChange = (index) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.weekdays[index][e.target.name] = !draft.weekdays[index][e.target.name]
            }), () => this.isAllChecked(index))
    }

    handleClose = () => {
        this.setState({zipcode:'', weekdays: weekdays.slice()});
        this.props.handleClose();
    }

    handleSubmit = () => {
        if (!postalCodeValidator(this.state.newZipcode)) {
            this.showToast(`Enter a valid postal code`);
        }
        else if(this.props.zipcodes.some(zipcode => zipcode.zipcode === this.state.newZipcode)){
            this.showToast(`Zipcode is already present`)
        }
        else if (this.countCheckedDays() === 0) {
            this.showToast(`Please select at least one weekday`);
        }
        else {
            this.props.addZipcode({zipcode: this.state.newZipcode, weekdays: this.state.weekdays});
            //reset the checked weekday values
            this.setState({newZipcode: '', weekdays: weekdays.slice()});
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
                onClose={this.handleClose}
                style={{width: '750px'}}
            >
                <DialogContainer>
                <H3>US or Canadian Postal Code</H3>
                    <ZipcodeInputGroup id="zipcode-value" 
                                placeholder="Enter a Zipcode" 
                                defaultValue=''
                                onBlur={this.handleBlur}
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

const ZipcodeInputGroup = styled(InputGroup)`
    width: 150px;
`

export default NewZipcode;
