import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@blueprintjs/core'
import SpringButton from './Status/SpringButton'
import StatusIcon from './Status/StatusIcon'
import { API } from "aws-amplify"
import { AppToaster } from '../../Toaster'
import { Mobile, Desktop } from '../../devices'

class PickupCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isStatusOpen: false,
            isRatingOpen: false,
            isActionsOpen: false,
            isCancelCredentialsOpen: false,
            isRejectCredentialsOpen: false,
            cancelUser: '',
            cancelPassword: '',
            rejectUser: '',
            rejectPassword: '',
        }
    }


    handleStatusChange = (pickup, newStatus) => {
        if (pickup == null) {
            return false
        }
        else if (newStatus === 'confirmed') {
            this.callAPI(
                pickup,
                'confirmed',
                this.props.userConfig.confirmedEmails.confirmedCCAddresses,
                this.props.userConfig.confirmedEmails.confirmedBCCAddresses,
                this.props.userConfig.confirmedEmails.confirmedSubjectLine,
                this.props.userConfig.confirmedEmails.confirmedMessageBody
            )
        }
        else if (newStatus === 'completed') {
            this.callAPI(
                pickup,
                'completed',
                this.props.userConfig.completedEmails.completedCCAddresses,
                this.props.userConfig.completedEmails.completedBCCAddresses,
                this.props.userConfig.completedEmails.completedSubjectLine,
                this.props.userConfig.completedEmails.completedMessageBody,
                this.props.userConfig.receipts
            )
        }
        else if (newStatus === 'rejected') {
            if (this.authenticateAdmin(this.state.rejectUser, this.state.rejectPassword)) {
                this.callAPI(
                    pickup,
                    'rejected',
                    this.props.userConfig.rejectedEmails.rejectedCCAddresses,
                    this.props.userConfig.rejectedEmails.rejectedBCCAddresses,
                    this.props.userConfig.rejectedEmails.rejectedSubjectLine,
                    this.props.userConfig.rejectedEmails.rejectedMessageBody
                )
            }
            else {
                this.showToast('Incorrect admin credentials')
            }
        }
        else if (newStatus === 'canceled') {
            if (this.authenticateAdmin(this.state.cancelUser, this.state.cancelPassword)) {
                this.callAPI(
                    pickup,
                    'canceled',
                    this.props.userConfig.canceledEmails.canceledCCAddresses,
                    this.props.userConfig.canceledEmails.canceledBCCAddresses,
                    this.props.userConfig.canceledEmails.canceledSubjectLine,
                    this.props.userConfig.canceledEmails.canceledMessageBody
                )
            }
            else {
                this.showToast('Incorrect admin credentials')
            }
        }
    }

    authenticateAdmin = (user, pass) => {
        /*
        let payload = this.props.payload
        if ((user === payload['custom:adminUserName1'] && pass === payload['custom:adminPassword1']) ||
            (user === payload['custom:adminUserName2'] && pass === payload['custom:adminPassword2']) ||
            (user === payload['custom:adminUserName3'] && pass === payload['custom:adminPassword3']) ||
            (user === payload['custom:adminUserName4'] && pass === payload['custom:adminPassword4']) ||
            (user === payload['custom:adminUserName5'] && pass === payload['custom:adminPassword5'])
        ) {
            return true
        }
        else {
            return false
        }
        */
        return true
    }

    callAPI = (pickup, newStatus = '', ccAddresses = [], bccAddresses = [], subjectLine = '', messageBody = '', receipts = null) => {
        API.put("sapo", "/pickups", {
            body: {
                ...pickup,
                status: newStatus,
                ccAddresses: ccAddresses,
                bccAddresses: bccAddresses,
                subjectLine: subjectLine,
                messageBody: messageBody,
                receipts: receipts
            }
        }).then(response => {
            this.props.updatePickups({ ...pickup, status: newStatus }, this.props.pickups, this.props.index)
            this.showToast(`Pickup Updated to ${newStatus.toUpperCase()}`)
        }).catch(error => {
            this.showToast('ERROR: Pickup Not Updated!')
            console.log(error)
        })
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    componentDidMount() {
        this.props.changeIsACardTabOpen(false)
    }

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    onStatusButtonClick = () => {
        if (this.props.isACardTabOpen) {
            return;
        }
        this.setState({ isStatusOpen: true, isRatingOpen: false, isActionsOpen: false })
        this.props.changeIsACardTabOpen(true)
    }

    onActionsButtonClick = () => {
        if (this.props.isACardTabOpen) {
            return;
        }
        this.setState({ isStatusOpen: false, isRatingOpen: false, isActionsOpen: true })
        this.props.changeIsACardTabOpen(true)
    }

    onBackButtonClick = () => {
        this.setState({ isStatusOpen: false, isRatingOpen: false, isActionsOpen: false })
        this.props.changeIsACardTabOpen(false)
    }

    onPickupInfoClick = () => {
        if (!this.props.isACardTabOpen) {
            this.props.changeIsPickupContainerOpen(true);
            this.props.selectPickup();
        }
    }

    onRatingButtonClick = () => {
        if (this.props.isACardTabOpen) {
            return;
        }
        this.setState({ isRatingOpen: true })
        this.props.changeIsACardTabOpen(true)
    }

    handleRouteClick = (index, driver) => {
        this.props.handleRouteChange(index, driver)
    }

    render() {
        const { provided, innerRef, pickup } = this.props;
        const buttonStyles = {
            confirmed: {
                color1: '#187bcd',
                color2: '#1167b1',
                icon: 'thumbs-up'
            },
            completed: {
                color1: '#187bcd',
                color2: '#1167b1',
                icon: 'tick-circle'
            },
            canceled: {
                color1: '#FA212F',
                color2: '#1167b1',
                icon: 'disable',
            },
            rejected: {
                color1: '#E76450',
                color2: '#1167b1',
                icon: 'thumbs-down',
            },
            submitted: {
                color1: '#FA212F',
                color2: '#1167b1',
                icon: 'issue'
            }
        }

        // conditional rendering for card
        let cardContent;
        if (!this.state.isStatusOpen && !this.state.isRatingOpen && !this.state.isActionsOpen) {
            cardContent =
                <React.Fragment>
                    <OpenStatusButton onClick={this.onStatusButtonClick} color1={buttonStyles[pickup.status].color1} color2={buttonStyles[pickup.status].color1} >
                        <StyledIcon><StatusIcon status={pickup.status}><Icon icon={buttonStyles[pickup.status].icon} iconSize={30} color={buttonStyles[pickup.status].color1} /></StatusIcon></StyledIcon>
                    </OpenStatusButton>
                    <PickupInfo>
                        <PickupInfoButton onClick={this.onPickupInfoClick}>{pickup.streetAddress} {pickup.zipcode}</PickupInfoButton>
                        <div>{pickup.lastName}, {pickup.firstName}</div>
                        {pickup.inRoute
                            ? (
                                <div>Driver: {pickup.inRoute.lastName}, {pickup.inRoute.firstName}</div>
                            )
                            : ''
                        }
                        {this.props.selectedDriver ?
                            pickup.inRoute
                                ? (
                                    <div><MapIcon icon='map-marker' iconSize={25} onClick={() => this.handleRouteClick(pickup.index, null)} color='#f44546' /></div>
                                )
                                : (
                                    <div><MapIcon icon='map-marker' iconSize={25} onClick={() => this.handleRouteClick(pickup.index, this.props.selectedDriver)} color='#d3d3d3' /></div>
                                )
                            : ''
                        }
                    </PickupInfo>
                    <ActionColumn onClick={this.onActionsButtonClick}>
                        <div><Icon icon='phone' /></div>
                        <div><Icon icon='mobile-phone' /></div>
                        <div><Icon icon='envelope' /></div>
                        <div><Icon icon='geolocation' /></div>
                    </ActionColumn>
                </React.Fragment>
        } else if (this.state.isStatusOpen) {
            cardContent =
                <React.Fragment>
                    <OpenStatusButton onClick={this.onBackButtonClick} color1={buttonStyles[pickup.status].color1} color2={buttonStyles[pickup.status].color2}><Icon icon='chevron-left' iconSize={25} /></OpenStatusButton>
                    <StatusButtonRow>
                        {pickup.status === 'submitted'
                            ? (
                                <SpringButton onClick={() => this.handleStatusChange(pickup, 'confirmed')} color={buttonStyles['submitted'].color2}><Icon icon={buttonStyles['submitted'].icon} iconSize={25} /></SpringButton>
                            ) :
                            (
                                <SpringButton onClick={() => this.handleStatusChange(pickup, 'completed')} color={buttonStyles['completed'].color1}><Icon icon={buttonStyles['completed'].icon} iconSize={25} /></SpringButton>
                            )
                        }
                        <SpringButton onClick={() => this.handleStatusChange(pickup, 'canceled')} color={buttonStyles['canceled'].color1}><Icon icon={buttonStyles['canceled'].icon} iconSize={25} /></SpringButton>
                        <SpringButton onClick={() => this.handleStatusChange(pickup, 'rejected')} color={buttonStyles['rejected'].color1}><Icon icon={buttonStyles['rejected'].icon} iconSize={25} /></SpringButton>
                    </StatusButtonRow>
                </React.Fragment>
        } else if (this.state.isRatingOpen) {
            cardContent =
                <React.Fragment>
                    <div onClick={this.onBackButtonClick}>back</div>
                </React.Fragment>
        } else if (this.state.isActionsOpen) {
            cardContent =
                <>
                    <ActionRow>
                        <div><a href={`tel:+1${pickup.phoneNumber}`}><Icon icon='phone' iconSize={35} /></a></div>
                        <div><a href={`sms:+1${pickup.phoneNumber}`}><Icon icon='mobile-phone' iconSize={35} /></a></div>
                        <div><a href={`mailto:${pickup.email}`}><Icon icon='envelope' iconSize={35} /></a></div>
                        <div><a href={`http://google.com/maps/dir/?api=1&destination=${pickup.lat},${pickup.lng}&zoom=18`} target="_blank"><Icon icon='geolocation' iconSize={35} /></a></div>
                    </ActionRow>
                    <ActionColumn onClick={this.onBackButtonClick}><Icon icon='chevron-right' iconSize={25} /></ActionColumn>
                </>

        }
        return (
            <>
                <Desktop>
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={this.setRef}
                        device='desktop'
                    >
                        {cardContent}
                    </Card>
                </Desktop>
                <Mobile>
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={this.setRef}
                        device='mobile'
                    >
                        {cardContent}
                    </Card>
                </Mobile>
            </>
        )
    }
}

const Card = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    width: ${props => props.device === 'desktop'? '80%': '100%'}
    height: 7em;
    margin: 1em;
    border-width: 0.05em; 
    border-color: lightgrey;
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    border-style: solid;
`

const OpenStatusButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10%;
    cursor: pointer;
    border-color: transparent;
    transition: background 250ms ease-in-out, 
    transform 150ms ease;
    :hover{
        border-color: ${props => props.color2};
      }
`

const fadingKeyFrames = keyframes`
    0% {width:0%}
    25% {width:25%}
    50% {width:50%}
    75% {width: 75%}
    100% {width:100%}
`
const IconFade = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 0%;
    background: white;
    animation: ${fadingKeyFrames} 2s ease-in infinite;
    animation-direction: reverse;
`

const StyledIcon = styled.div`
    position: relative;
    width: 100%;
    left: 25%;
`
const MapIcon = styled(Icon)`
      cursor: pointer;
`

const PickupInfoButton = styled.div`
      cursor: pointer;
`

const RatingButton = styled.div`
      background-color: white;
      border: none;
      :hover {
        font-color: #1167b1;
        font-weight: 600;
      }
      cursor: pointer;
`

const PickupInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-left: 1em;
`

const ActionColumn = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 10%;
      height: 100%;
      cursor: pointer;
`



const ActionRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
`

const StatusButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`

export default PickupCard