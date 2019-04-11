import * as React from 'react';
import { AnchorButton, Button, Card, Classes, Elevation, Dialog, FormGroup, H4, InputGroup, Tooltip } from '@blueprintjs/core'
import DayPicker, { DateUtils } from 'react-day-picker';
import getDisabledDates from '../Zipcodes/getDisabledDates'
import { format, getMonth } from 'date-fns'
import Select from 'react-select'
import styled from 'styled-components'


export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pickup: {},
            selectedDate: null,
            selectedZipcode: '',
            showDatePicker: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            selectedDate: null,
        })
    }

    handleCancel = () => {
        this.setState({
            selectedDate: null,
            showDatePicker: false,
        })
        this.props.onClose()
    }

    handleSubmit = () => {
        this.setState({
            selectedDate: null,
            showDatePicker: false
        })
        this.props.onClose()
    }

    handleZipcodeSelect = (zipcode, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    selectedZipcode: zipcode.value,
                    showDatePicker: true,
                });
                break;
            case 'clear':
                this.setState({
                    selectedZipcode: '',
                    showDatePicker: false,
                });
                break;
        }
    }

    renderDatePicker = () => {
        let zipcode = this.props.userConfig.zipcodes.find(zip => zip.zipcode === this.state.selectedZipcode)
        if (this.state.showDatePicker) {
            return (
                <BlockContainer>
                    <H4>Select A Pickup Date</H4>
                    <DayPicker
                        disabledDays={getDisabledDates(zipcode.weekdays)}
                        onDayClick={this.handleDayClick}
                        selectedDays={this.state.selectedDate}
                    />
                    <p>
                        {this.state.selectedDate
                            ? `Selected Pickup Date: ${this.state.selectedDate.toLocaleDateString()}`
                            : ''}
                    </p>
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }

    handleDayClick = (date) => {
        this.setState({
            selectedDate: date
        })
    }

    render() {
        let zipcodeOptions = []
        if (this.props.userConfig.zipcodes) {
            zipcodeOptions = this.props.userConfig.zipcodes.map(zipcode => ({ value: zipcode.zipcode, label: zipcode.zipcode }));

        }
        return (
            <Dialog isOpen={this.props.isOverlayOpen}
                onClose={this.props.onClose}
                transitionDuration={100}
                title="Customer Call-In"
            >
                <DialogContainer>
                    <H4>Select The Pickup Zipcode</H4>
                    <SelectContainer>
                        <Select
                            value={{ value: this.state.selectedZipcode, label: this.state.selectedZipcode }}
                            onChange={this.handleZipcodeSelect}
                            options={zipcodeOptions}
                            isClearable={true}
                        />
                    </SelectContainer>
                    {this.props.userConfig.zipcodes ? this.renderDatePicker() : ''}
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.handleCancel}>Cancel</Button>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const DialogContainer = styled.div`
    width: 400px;
    margin: 20px;
`

const SelectContainer = styled.div`
    width: 300px;
    margin-top: 25px;
    margin-bottom: 25px;
`

