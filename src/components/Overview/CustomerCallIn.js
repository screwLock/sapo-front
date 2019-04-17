import * as React from 'react';
import { AnchorButton, Button, Card, Classes, Elevation, Dialog, FormGroup, H4, H6, InputGroup, Checkbox } from '@blueprintjs/core'
import DayPicker, { DateUtils } from 'react-day-picker';
import getDisabledDates from '../Zipcodes/getDisabledDates'
import { format, getMonth } from 'date-fns'
import Select from 'react-select'
import styled from 'styled-components'
import {produce} from 'immer'


export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            streetAddress: '',
            phone: '',
            email: '',
            categories: [],
            donations: [],
            confirmed: true,
            completed: false,
            pickupID: '',
            selectedDate: null,
            selectedZipcode: '',
            showDatePicker: false,
            showPickupDetails: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            selectedDate: null,
            categories: this.props.userConfig.categories
        })
    }

    handleCancel = () => {
        this.setState({
            selectedZipcode: '',
            selectedDate: null,
            showDatePicker: false,
            showPickupDetails: false,
        })
        this.props.onClose()
    }

    handleSubmit = () => {
        this.setState({
            selectedZipcode: '',
            selectedDate: null,
            showDatePicker: false,
            showPickupDetails: false,
        })
        this.props.onClose()
    }

    handleZipcodeSelect = (zipcode, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    selectedZipcode: zipcode.value,
                    showDatePicker: true,
                    selectedDate: null,
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

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleCheckedChange = (cIndex, dIndex) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.categories[cIndex].donatables[dIndex].checked = !draft.categories[cIndex].donatables[dIndex].checked
            }))
    }

    renderDatePicker = (blackoutDates) => {
        let zipcode = this.props.userConfig.zipcodes.find(zip => zip.zipcode === this.state.selectedZipcode)
        if (this.state.showDatePicker) {
            return (
                <BlockContainer>
                    <H4>Select A Pickup Date</H4>
                    <DayPicker
                        disabledDays={[...getDisabledDates(zipcode.weekdays), ...blackoutDates]}
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

    renderPickupDetails = () => {
        if (this.state.showPickupDetails) {
            return (
                <BlockContainer>
                    <H4>Pickup Address</H4>
                    <SubBlockContainer>
                        <FormGroup>
                            <InputGroup name='streetAddress' onChange={this.onChange} />
                        </FormGroup>
                    </SubBlockContainer>
                    <H4>Contact Info</H4>
                    <SubBlockContainer>
                        <FormGroup>
                            <InputGroup placeholder='Contact Name' name='name' onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup placeholder='Contact Phone' name='phone' onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup placeholder='Contact Email' name='email' onChange={this.onChange} />
                        </FormGroup>
                    </SubBlockContainer>
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }

    renderPickupItems = (categories) => {
        if (this.state.showPickupDetails) {
            return (
                <BlockContainer>
                    <H4>Select Donations</H4>
                    {categories.map( (category, cIndex) => {
                        return (
                            <div key={category.name + cIndex}>
                                <H6>{category.name}</H6>
                                <SubBlockContainer>
                                    {category.donatables.map( (donatable, dIndex) => {
                                        return (
                                            <Checkbox name={donatable.name}
                                                // label={cIndex}
                                                // key={category.name + donatable.name}
                                                // label={this.state.categories[cIndex].name}
                                                //  onChange={this.handleCheckedChange(cIndex, dIndex)}
                                            />
                                        )
                                    })}
                                </SubBlockContainer>
                            </div>
                        )
                    })}
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }

    renderServiceDetails = () => {
        return ''
    }

    handleDayClick = (date) => {
        this.setState({
            selectedDate: date,
            showPickupDetails: true
        })
    }

    render() {
        let zipcodeOptions = []
        let blackoutDates = []
        if (this.props.userConfig.zipcodes) {
            zipcodeOptions = this.props.userConfig.zipcodes.map(zipcode => ({ value: zipcode.zipcode, label: zipcode.zipcode }));
        }
        if (this.props.userConfig.blackoutDates) {
            blackoutDates = this.props.userConfig.blackoutDates.map(bDate => new Date(bDate.date))
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
                    {this.props.userConfig.zipcodes ? this.renderDatePicker(blackoutDates) : ''}
                    <div>
                        {this.renderPickupDetails()}
                    </div>
                    <div>
                        {(this.props.userConfig.categories) ?
                            this.renderPickupItems(this.props.userConfig.categories) :
                            ''}
                    </div>
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

const SubBlockContainer = styled.div`
    width: 250px;
    margin: 10px;
    margin-left: 20px;
`

const DialogContainer = styled.div`
    width: 400px;
    margin: 20px;
`

const FormGroupContainer = styled(FormGroup)`
    width: 250px;
`

const SelectContainer = styled.div`
    width: 250px;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 20px;
`

