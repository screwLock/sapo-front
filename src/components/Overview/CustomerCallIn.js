import * as React from 'react';
import { AnchorButton, Button, Card, Classes, Elevation, Dialog, FormGroup, H4, H6, InputGroup, Checkbox } from '@blueprintjs/core'
import DayPicker, { DateUtils } from 'react-day-picker'
import getDisabledDates from '../Zipcodes/getDisabledDates'
import { format, getMonth } from 'date-fns'
import Select from 'react-select'
import styled from 'styled-components'
import { produce } from 'immer'
import CategoryCheckboxes from './CategoryCheckboxes'
import ServiceDetailCheckboxes from './ServiceDetailCheckboxes'
import { AppToaster } from '../Toaster'
import * as EmailValidator from 'email-validator'
import { API } from "aws-amplify"
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'


export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            orgName: '',
            streetAddress: '',
            phoneNumber: '',
            email: '',
            categories: [],
            donations: [],
            lat: '',
            lng: '',
            pickupID: '',
            selectedDate: null,
            selectedZipcode: '',
            showDatePicker: false,
            showPickupDetails: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            categories: this.props.userConfig.categories
        })
    }

    addDonation = (name) => {
        if(this.state.donations.includes(name)){
            this.state.donations.splice( this.state.donations.indexOf(name), 1 );
        }
        else {
            this.state.donations.push(name)
            this.state.donations.sort()
        }
    }

    handleClose = () => {
        this.setState({
            selectedZipcode: '',
            selectedDate: null,
            lat: '',
            lng: '',
            showDatePicker: false,
            showPickupDetails: false,
            categories: this.props.userConfig.categories,
            donations: [],
            serviceDetails: [],
        })
        this.props.onClose()
    }

    handleSubmit = () => {
        if (this.validateForms()) {
            this.getLatLng()
        }
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

    handleBlur = e => this.setState({ [e.target.name]: e.target.value })

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
                            <InputGroup name='streetAddress' onBlur={this.handleBlur} />
                        </FormGroup>
                    </SubBlockContainer>
                    <H4>Contact Info</H4>
                    <SubBlockContainer>
                        <FormGroup>
                            <InputGroup placeholder='Contact First Name' name='firstName' onBlur={this.handleBlur} />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup placeholder='Contact Last Name' name='lastName' onBlur={this.handleBlur} />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup placeholder='Contact Phone' name='phoneNumber' onBlur={this.handleBlur} />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup placeholder='Contact Email' name='email' onBlur={this.handleBlur} />
                        </FormGroup>
                    </SubBlockContainer>
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }

    handleDayClick = (date) => {
        this.setState({
            selectedDate: date,
            showPickupDetails: true
        })
    }

    getLatLng = () => {
        const platform = new H.service.Platform({
            'app_id': 'u3uFI5c0XaweKx6Yh31t',
            'app_code': 'wUPW8ZhbclB20ZTwqRC4fA'
        });
        const geocoder = platform.getGeocodingService();

        let lat = ''
        let lng = ''

        //get the lat and lng from a geocoder call
        geocoder.geocode({ searchText: `${this.state.streetAddress + this.state.selectedZipcode}` },
            (result) => {
                if (result.Response.View[0]) {
                    lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
                    lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                    //after setting lat/lng in state, create the pickup and persist the data
                    if (!(lng === '') && !(lat === '')) {
                        this.setState({ lat: lat, lng: lng },
                            () => {
                                API.post("sapo", "/pickups", {
                                    body: {
                                        zipcode: this.state.selectedZipcode,
                                        pickupDate: this.state.selectedDate.toISOString(),
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                        streetAddress: this.state.streetAddress,
                                        orgName: 'NA',
                                        lat: this.state.lat,
                                        lng: this.state.lng,
                                        phoneNumber: this.state.phoneNumber,
                                        email: this.state.email,
                                        confirmed: true,
                                        completed: false,
                                        pickupID: `${this.state.email}..${this.state.selectedZipcode}..${new Date().toISOString()}`,
                                        donations: this.state.donations,
                                        serviceDetails: this.state.serviceDetails
                                    }
                                }).then( response => {
                                    console.log(response)
                                    this.handleClose()
                                    this.showToast('Pickup Successfully Saved')
                                    // send email
                                }).catch( error => {
                                    alert(error)
                                })
                            })// end of setState
                    } //end of if
                }
                else {
                    this.showToast('Not a valid street address')
                }
            }, (e) => {
                alert(e);
            });
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForms = () => {
        const phoneValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.email === '' ||
            this.state.phoneNumber === '' ||
            this.state.streetAddress === '' ||
            this.state.selectedZipcode === '' ||
            !this.state.selectedDate 
        ) {
            this.showToast('Required fields are missing')
            return false;
        }
        else if (!EmailValidator.validate(this.state.email)) {
            this.showToast('Enter a valid email address')
            return false
        }
        else if (!phoneValidate.test(this.state.phoneNumber)) {
            this.showToast('Enter a valid phone number')
            return false
        }
        else {
            return true;
        }
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
        if (this.props.userConfig) {
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
                        {this.props.userConfig.blackoutDates ?
                            this.renderDatePicker(blackoutDates) :
                            ''
                        }
                        <div>
                            {this.renderPickupDetails()}
                        </div>
                        <div>
                            {(this.props.userConfig.categories) ?
                                (
                                    <CategoryCheckboxes categories={this.props.userConfig.categories}
                                        isVisible={this.state.showPickupDetails}
                                        key={this.props.userConfig.categories}
                                        addDonation={this.addDonation}
                                    />
                                ) :
                                ''
                            }
                        </div>
                        <div>
                            {(this.props.userConfig.serviceDetails) ?
                                (
                                    <ServiceDetailCheckboxes serviceDetails={this.props.userConfig.serviceDetails}
                                        isVisible={this.state.showPickupDetails}
                                        key={this.props.userConfig.serviceDetails}
                                    />
                                ) :
                                ''
                            }
                        </div>
                    </DialogContainer>
                    <div className={Classes.DIALOG_FOOTER}>
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </Dialog>
            )
        }
        else {
            return ''
        }
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

