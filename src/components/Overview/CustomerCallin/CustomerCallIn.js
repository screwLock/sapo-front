/* eslint-disable */
import * as React from 'react';
import { Button, Classes, Elevation, Dialog, FormGroup, H4, H6, InputGroup, Intent, TextArea } from '@blueprintjs/core'
import getDisabledDates from './getDisabledDates'
import styled from 'styled-components'
import StateSelect from './StateSelect'
import EmployeeSelect from './EmployeeSelect'
import { produce } from 'immer'
import { addDays, addMonths } from 'date-fns'
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
            apt: '',
            province: '',
            city: '',
            phoneNumber: '',
            email: '',
            comments: '',
            categories: [],
            serviceDetails: [],
            mandatoryDetails: [],
            selectedServiceDetails: [],
            donations: {},
            disabledDays: [],
            lat: '',
            lng: '',
            pickupID: '',
            selectedDate: null,
            selectedZipcode: '',
            selectedEmployee: null,
            showZipcodePicker: true,
            showDatePicker: false,
            stage: 0,
            submitDisabled: false,
        }
    }

    componentDidMount = () => {
        const userConfig = this.props.userConfig
        // this check should occur in the parent render function, but just so we don't
        // get a undefined error ...
        if (userConfig.donorPage != null) {
            userConfig = userConfig.donorPage;
            this.setState({
                categories: userConfig.categories,
                serviceDetails: this.props.userConfig.serviceDetails.filter(detail => {
                    return detail.isMandatory === false
                }),
                mandatoryDetails: this.props.userConfig.serviceDetails.filter(detail => {
                    return detail.isMandatory === true
                })
            })
        }
        else if (userConfig.categories != null && userConfig.serviceDetails != null) {
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

    // here is where we check which dates are maxed out for pickups
    // n should correspond to the toMonth of the DatePicker
    getMaxedPickupsForNMonths = async (n) => {
        // current Month ...
        let startDate = new Date()
        // ... to N months from current month
        let endDate = addMonths(new Date(), n)
        return API.get("sapo", "/maxedDays", {
            'queryStringParameters': {
                'startDate': startDate.toISOString(),
                'endDate': endDate.toISOString()
            }
        }).then(result => {
            return result
        }).catch(error => {
            console.log(error)
            return []
        })
    }

    handleCategorySelect = (cIndex, dIndex) => {
        // add to the donations array
        let donations = { ...this.state.donations }
        const name = this.state.categories[cIndex].donatables[dIndex].name
        if (donations.hasOwnProperty(name)) {
            return;
        }
        else {

            donations[name] = 1
        }
        // save the checkbox change and new array
        this.setState(
            produce(this.state, draft => {
                draft.categories[cIndex].donatables[dIndex].checked = true,
                    draft.donations = { ...donations }
            })
        )
    }

    handleDonationQuantityChange = (cIndex, dIndex) => (e) => {
        let donations = { ...this.state.donations }
        if (e.target.value === '0' || e.target.value === '') {
            delete donations[e.target.name]
            this.setState(
                produce(this.state, draft => {
                    draft.donations = { ...donations },
                        draft.categories[cIndex].donatables[dIndex].checked = false
                })
            )
        }
        else {
            donations[e.target.name] = e.target.value
            this.setState(
                produce(this.state, draft => {
                    draft.donations = { ...donations }
                })
            )
        }
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
            apt: '',
            province: '',
            city: '',
            phoneNumber: '',
            email: '',
            selectedZipcode: '',
            selectedEmployee: null,
            selectedDate: null,
            lat: '',
            lng: '',
            showDatePicker: false,
            stage: 0,
            comments: '',
            donations: [],
            selectedServiceDetails: [],
            categories: this.props.userConfig.categories,
            serviceDetails: this.props.userConfig.serviceDetails.filter(detail => {
                return detail.isMandatory === false
            }),
            mandatoryDetails: this.props.userConfig.serviceDetails.filter(detail => {
                return detail.isMandatory === true
            }),
            submitDisabled: false
        })
        this.props.changeView('dailyPickups')
    }

    handleSubmit = () => {
        if (this.validateForms()) {
            this.setState({ submitDisabled: true })
            this.getLatLng()
        }
    }

    handleZipcodeSelect = async (zipcode, action) => {
        switch (action.action) {
            case 'select-option':
                let exceededDays = await this.getMaxedPickupsForNMonths(6)
                this.setState({
                    selectedZipcode: zipcode.value,
                    showDatePicker: true,
                    selectedDate: null,
                    disabledDays: [...getDisabledDates(this.props.userConfig.zipcodes.find(zip => zip.zipcode === zipcode.value).weekdays),
                    ...this.props.userConfig.blackoutDates.map(bDate => new Date(bDate.date)), ...exceededDays.map(eDay => new Date(eDay)),
                    { before: addDays(new Date(), 1) }
                    ]
                });
                break;
            case 'clear':
                this.setState({
                    selectedZipcode: '',
                    selectedDate: null,
                    showDatePicker: false,
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

    handleEmployeeSelect = (employee, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    selectedEmployee: employee.value,
                });
                break;
            case 'clear':
                this.setState({
                    selectedEmployee: null,
                });
                break;
        }
    }

    handleBlur = e => this.setState({ [e.target.name]: e.target.value })

    handleCommentsChange = e => this.setState({ [e.target.name]: e.target.value })

    handleStageChange = (stage) => (e) => {
        this.setState({ stage })
    }

    handleDayClick = (date, modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }
        this.setState({
            selectedDate: modifiers.selected ? undefined : date,
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
                                        firstName: this.state.firstName.toUpperCase(),
                                        lastName: this.state.lastName.toUpperCase(),
                                        streetAddress: this.state.streetAddress.toUpperCase(),
                                        apt: this.state.apt || null,
                                        city: this.state.city.toUpperCase(),
                                        province: this.state.province.toUpperCase(),
                                        organization: 'NA',
                                        lat: this.state.lat,
                                        lng: this.state.lng,
                                        phoneNumber: this.state.phoneNumber.replace(/[^A-Za-z0-9]/g, ''),
                                        email: this.state.email,
                                        status: 'submitted',
                                        comments: this.state.comments || null,
                                        donations: this.state.donations,
                                        serviceDetails: this.state.selectedServiceDetails,
                                        route: null,
                                        createdBy: this.state.selectedEmployee.ID,
                                        ccAddresses: this.props.userConfig.submittedEmails.submittedCCAddresses,
                                        bccAddresses: this.props.userConfig.submittedEmails.submittedBCCAddresses,
                                        subjectLine: this.props.userConfig.submittedEmails.submittedSubjectLine,
                                        messageBody: this.props.userConfig.submittedEmails.submittedMessageBody
                                    }
                                }).then(response => {
                                    this.handleClose()
                                    this.showToast('Pickup Successfully Saved')
                                    // send email
                                    // TODO:  we should recalculate max pickups again
                                }).catch(error => {
                                    this.showToast('ERROR: Pickup not saved!')
                                    this.setState({ submitDisabled: false })
                                })
                            })// end of setState
                    } //end of if
                }
                else {
                    this.showToast('Not a valid street address')
                    this.setState({ submitDisabled: false })
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
        else if (Object.getOwnPropertyNames(this.state.donations).length === 0) {
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
        else if (this.state.selectedEmployee === null) {
            this.showToast('Please select your employee signature')
            return false
        }
        else {
            return true;
        }
    }

    render() {
        const { stage } = this.state;
        const renderFooter = (stage) => {
            if (stage === 0) {
                return (
                    <>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleStageChange(1)} disabled={this.state.selectedDate === null}>Next</Button>
                    </>
                )
            }
            else if (stage === 1) {
                return (
                    <>
                        <Button onClick={this.handleStageChange(0)}>Back</Button>
                        <Button onClick={this.handleStageChange(2)} disabled={this.state.submitDisabled}>Next</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </>
                )
            }
            else if (stage === 2) {
                return (
                    <>
                        <Button onClick={this.handleStageChange(1)}>Back</Button>
                        <Button onClick={this.handleSubmit} disabled={this.state.submitDisabled}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </>
                )
            }
        }
        return (
            <CCIContainer>
                <Body>
                    {stage === 0
                        ? (
                            <Cell>
                                <H4>Select The Pickup Zipcode</H4>
                                <ZipcodeBlock>
                                    <ZipcodeSelect zipcodes={this.props.userConfig.zipcodes}
                                        onChange={this.handleZipcodeSelect}
                                        selectedZipcode={this.state.selectedZipcode}
                                    />
                                </ZipcodeBlock>
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
                            </Cell>
                        )
                        : ''
                    }
                    <Cell>
                        {stage === 1 ?
                            (
                                <BlockContainer>
                                    <H4>Pickup Address</H4>
                                    <SubBlockContainer >
                                        <ContactForms>
                                            <StreetAddressForm label='Street Address'>
                                                <InputGroup name='streetAddress' onBlur={this.handleBlur} autoComplete="new-street-address" />
                                            </StreetAddressForm>
                                            <AptForm label='Apt #'>
                                                <InputGroup name='apt' onBlur={this.handleBlur} autoComplete="new-password" />
                                            </AptForm>
                                        </ContactForms>
                                        <ContactForms>
                                            <NameForm label='City'>
                                                <InputGroup name='city' autoComplete='new-password' onBlur={this.handleBlur} />
                                            </NameForm>
                                            <StateForm label='State/Province'>
                                                <StateSelect onChange={this.handleStateSelect} />
                                            </StateForm>
                                        </ContactForms>
                                        <FormGroup label='Organization Name (Required If Not Residential)'>
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
                            : ''}
                    </Cell>
                    {stage === 2 ? (
                        <Cell>
                            <div>
                                <CategoryCheckboxes
                                    categories={this.state.categories}
                                    restrictions={this.props.userConfig.restrictions}
                                    donations={this.state.donations}
                                    onChange={this.handleCategorySelect}
                                    handleQuantityChange={this.handleDonationQuantityChange}
                                />
                            </div>
                            <div>
                                <ServiceDetailCheckboxes
                                    serviceDetails={this.state.serviceDetails}
                                    onChange={this.handleServiceCheckedChange}
                                    isVisible={(this.state.serviceDetails.length > 0)}
                                />
                            </div>
                            <div>
                                <H4>Additional Comments</H4>
                                <CommentsTextArea
                                    name='comments'
                                    large={false}
                                    intent={Intent.PRIMARY}
                                    onChange={this.handleCommentsChange}
                                    value={this.state.comments}
                                />
                            </div>
                            <div>
                                <MandatoryCheckboxes
                                    mandatoryDetails={this.state.mandatoryDetails}
                                    onChange={this.handleMandatoryCheckedChange}
                                    // should not render if NO mandatory service details
                                    isVisible={(this.state.mandatoryDetails.length > 0)}
                                />
                            </div>
                        </Cell>
                    )
                        : ''}
                    <Cell>
                        <div>
                            {this.state.showPickupDetails ? (
                                <EmployeeSelect employees={this.props.userConfig.employees}
                                    onChange={this.handleEmployeeSelect}
                                    selectedEmployee={this.state.selectedEmployee}
                                />
                            ) : ''}
                        </div>
                    </Cell>
                </Body>
                <Footer>
                    {renderFooter(stage)}
                </Footer>
            </CCIContainer>
        )
    }
}

const CCIContainer = styled.div`
    width: 50%;
`
const Body = styled.div`
    height: 95%;
`
const Cell = styled.div`
`

const Footer = styled.div`
    height: 5%;
`

const BlockContainer = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
`;

const ZipcodeBlock = styled.div`
    width: 60%;
`

const SubBlockContainer = styled.div`
                width: 350px;
                margin: 10px;
                margin-left: 20px;
            `

const ContactForms = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StreetAddressForm = styled(FormGroup)`
            width: 275px;
        `

const AptForm = styled(FormGroup)`
            width: 50px;
        `

const StateForm = styled(FormGroup)`
            width: 100px;
        `

const NameForm = styled(FormGroup)`
            width: 150px;
        `

const PhoneForm = styled(FormGroup)`
            width: 125px;
        `

const CommentsTextArea = styled(TextArea)`
            width: 400px;
        `

const SelectContainer = styled.div`
                width: 250px;
                margin-top: 25px;
                margin-bottom: 25px;
                margin-left: 20px;
            `

