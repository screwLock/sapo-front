/* eslint-disable */
import * as React from 'react';
import { Button, Classes, Elevation, Dialog, FormGroup, H4, H6, InputGroup, Intent } from '@blueprintjs/core'
import getDisabledDates from '../../Zipcodes/getDisabledDates'
import styled from 'styled-components'
import { StateSelect } from './StateSelect'
import { produce } from 'immer'
import { addDays } from 'date-fns'
import CategoryCheckboxes from './CategoryCheckboxes'
import ServiceDetailCheckboxes from './ServiceDetailCheckboxes'
import MandatoryCheckboxes from './MandatoryCheckboxes'
import ZipcodeSelect from './ZipcodeSelect'
import DatePicker from './DatePicker'
import { AppToaster } from '../../Toaster'
import * as EmailValidator from 'email-validator'
import { API } from "aws-amplify"
import config from '../../../config'
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'


export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            organization: '',
            streetAddress: '',
            province: '',
            city: '',
            phoneNumber: '',
            email: '',
            categories: [],
            serviceDetails: [],
            mandatoryDetails: [],
            selectedServiceDetails: [],
            donations: [],
            disabledDays: [],
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
        const userConfig = this.props.userConfig
        // this check should occur in the parent render function, but just so we don't
        // get a undefined error ...
        if (userConfig.categories != null && userConfig.serviceDetails != null) {
            this.setState({
                categories: this.props.userConfig.categories,
                serviceDetails: this.props.userConfig.serviceDetails.filter(detail => {
                    return detail.isMandatory === false
                }),
                mandatoryDetails: this.props.userConfig.serviceDetails.filter(detail => {
                    return detail.isMandatory === true
                })
            })
        }
    }

    handleCategoryCheckedChange = (cIndex, dIndex) => (e) => {
        // add or remove from the donations array
        const donations = [...this.state.donations]
        const name = this.state.categories[cIndex].donatables[dIndex].name
        if (donations.includes(name)) {
            donations.splice(donations.indexOf(name), 1);
        }
        else {
            donations.push(name)
            donations.sort()
        }
        // save the checkbox change and new array
        this.setState(
            produce(this.state, draft => {
                draft.categories[cIndex].donatables[dIndex].checked = !draft.categories[cIndex].donatables[dIndex].checked
                draft.donations = [...donations]
            })
        )
    }

    handleServiceCheckedChange = (sdIndex) => (e) => {
        // add or remove from the selected array
        const selectedServiceDetails = [...this.state.selectedServiceDetails]
        const name = this.state.serviceDetails[sdIndex].name
        if (selectedServiceDetails.includes(name)) {
            selectedServiceDetails.splice(selectedServiceDetails.indexOf(name), 1);
        }
        else {
            selectedServiceDetails.push(name)
            selectedServiceDetails.sort()
        }
        // save the checkbox change and new selected array
        this.setState(
            produce(this.state, draft => {
                draft.serviceDetails[sdIndex].checked = !draft.serviceDetails[sdIndex].checked
                draft.selectedServiceDetails = [...selectedServiceDetails]
            })
        )
    }

    handleMandatoryCheckedChange = (mIndex) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.mandatoryDetails[mIndex].checked = !draft.mandatoryDetails[mIndex].checked
            })
        )
    }

    handleClose = () => {
        this.setState({
            firstName: '',
            lastName: '',
            organization: '',
            streetAddress: '',
            province: '',
            city: '',
            phoneNumber: '',
            email: '',
            selectedZipcode: '',
            selectedDate: null,
            lat: '',
            lng: '',
            showDatePicker: false,
            showPickupDetails: false,
            donations: [],
            selectedServiceDetails: [],
            categories: this.props.userConfig.categories,
            serviceDetails: this.props.userConfig.serviceDetails.filter(detail => {
                return detail.isMandatory === false
            }),
            mandatoryDetails: this.props.userConfig.serviceDetails.filter(detail => {
                return detail.isMandatory === true
            })
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
                    disabledDays: [...getDisabledDates(this.props.userConfig.zipcodes.find(zip => zip.zipcode === zipcode.value).weekdays),
                    ...this.props.userConfig.blackoutDates.map(bDate => new Date(bDate.date)),
                    { before: addDays(new Date(), 1) }
                    ]
                });
                break;
            case 'clear':
                this.setState({
                    selectedZipcode: '',
                    showDatePicker: false,
                    showPickupDetails: false
                });
                break;
        }
    }

    handleStateSelect = (st, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    province: st.value,
                });
                break;
            case 'clear':
                this.setState({
                    province: '',
                });
                break;
        }
    }

    handleBlur = e => this.setState({ [e.target.name]: e.target.value })

    renderPickupAddress = () => {
        return (
            <BlockContainer>
                <H4>Pickup Address</H4>
                <SubBlockContainer >
                    <FormGroup label='Street Address'>
                        <InputGroup name='streetAddress' onBlur={this.handleBlur} autoComplete="new-street-address" />
                    </FormGroup>
                    <ContactForms>
                        <NameForm label='City'>
                            <InputGroup name='city' autoComplete='new-password' onBlur={this.handleBlur} />
                        </NameForm>
                        <FormGroup label='State/Province'>
                            <StateSelect onChange={this.handleStateSelect} />
                        </FormGroup>
                    </ContactForms>
                    <FormGroup label='Organization Name (If Not Residential)'>
                        <InputGroup name='organization' onBlur={this.handleBlur} />
                    </FormGroup>
                </SubBlockContainer>
                <H4>Contact Info</H4>
                <SubBlockContainer>
                    <ContactForms>
                        <NameForm label='First Name'>
                            <InputGroup name='firstName' autoComplete='new-password' onBlur={this.handleBlur} />
                        </NameForm>
                        <FormGroup label='Last Name'>
                            <InputGroup name='lastName' autoComplete='new-password' onBlur={this.handleBlur} />
                        </FormGroup>
                    </ContactForms>
                    <ContactForms>
                        <FormGroup label='Email'>
                            <InputGroup name='email' autoComplete='new-password' onBlur={this.handleBlur} />
                        </FormGroup>
                        <PhoneForm label='Phone Number'>
                            <InputGroup name='phoneNumber' autoComplete='new-password' onBlur={this.handleBlur} />
                        </PhoneForm>
                    </ContactForms>
                </SubBlockContainer>
            </BlockContainer>
        )
    }

    handleDayClick = (date) => {
        this.setState({
            selectedDate: date,
            showPickupDetails: true
        })
    }

    getLatLng = () => {
        const platform = new H.service.Platform({
            'app_id': config.HERE_APP_ID,
            'app_code': config.HERE_APP_CODE,
            useHTTPS: true
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
                                        city: this.state.city,
                                        province: this.state.province,
                                        organization: 'NA',
                                        lat: this.state.lat,
                                        lng: this.state.lng,
                                        phoneNumber: this.state.phoneNumber.replace(/[^A-Za-z0-9]/g, ''),
                                        email: this.state.email,
                                        status: 'confirmed',
                                        donations: this.state.donations,
                                        serviceDetails: this.state.serviceDetails
                                    }
                                }).then(response => {
                                    this.handleClose()
                                    this.showToast('Pickup Successfully Saved')
                                    // send email
                                }).catch(error => {
                                    this.showToast('ERROR: Pickup not saved!')
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
        if (this.state.selectedZipcode === '') {
            this.showToast('Please select a zipcode')
        }
        else if (!this.state.selectedDate) {
            this.showToast('Please select a pickup date')
        }
        else if (this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.email === '' ||
            this.state.phoneNumber === '' ||
            this.state.streetAddress === '' ||
            this.state.city === '' ||
            this.state.province === ''
        ) {
            this.showToast('Please enter pickup and contact info')
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
        else if (this.state.donations.length === 0) {
            this.showToast('You have not selected any donations')
            return false
        }
        // If there are mandatory details AND if all checkboxes are selected
        // return false
        else if ((this.state.mandatoryDetails.length > 0)
            && (this.state.mandatoryDetails.filter(detail => { return detail.checked === true }).length !== this.state.mandatoryDetails.length)) {
            this.showToast('Customer must certify that all requirements are met')
            return false
        }
        else {
            return true;
        }
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOverlayOpen}
                onClose={this.props.onClose}
                transitionDuration={100}
                title="Customer Call-In"
            >
                <DialogContainer>
                    <H4>Select The Pickup Zipcode</H4>
                    <ZipcodeSelect zipcodes={this.props.userConfig.zipcodes}
                        onChange={this.handleZipcodeSelect}
                        selectedZipcode={this.state.selectedZipcode}
                    />
                    <BlockContainer>
                        <DatePicker disabledDays={this.state.disabledDays}
                            onClick={this.handleDayClick}
                            zipcode={this.state.selectedZipcode}
                            selectedDate={this.state.selectedDate}
                            isVisible={this.state.showDatePicker}
                        />

                    </BlockContainer>
                    <p>
                        {this.state.selectedDate
                            ? `Selected Pickup Date: ${this.state.selectedDate.toLocaleDateString()}`
                            : ''}
                    </p>
                    {this.state.showPickupDetails ? this.renderPickupAddress() : ''}
                    <div>
                        <CategoryCheckboxes
                            categories={this.state.categories}
                            onChange={this.handleCategoryCheckedChange}
                            isVisible={this.state.showPickupDetails}
                        />
                    </div>
                    <div>
                        <ServiceDetailCheckboxes
                            serviceDetails={this.state.serviceDetails}
                            onChange={this.handleServiceCheckedChange}
                            isVisible={(this.state.showPickupDetails && this.state.serviceDetails.length > 0)}
                        />
                    </div>
                    <div>
                        <MandatoryCheckboxes
                            mandatoryDetails={this.state.mandatoryDetails}
                            onChange={this.handleMandatoryCheckedChange}
                            // should not render if NO mandatory service details
                            isVisible={(this.state.showPickupDetails && this.state.mandatoryDetails.length > 0)}
                        />
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

}

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const SubBlockContainer = styled.div`
    width: 350px;
    margin: 10px;
    margin-left: 20px;
`

const DialogContainer = styled.div`
    width: 400px;
    margin: 20px;
`

const ContactForms = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const NameForm = styled(FormGroup)`
    width: 150px;
`

const PhoneForm = styled(FormGroup)`
    width: 125px;
`

const SelectContainer = styled.div`
    width: 250px;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 20px;
`

