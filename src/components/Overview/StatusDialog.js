import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class StatusDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCancelCredentialsOpen: false,
            cancelUser: '',
            cancelPassword: '',
        }
    }

    authenticateAdmin = () => {
        let payload = this.props.payload
        if ((this.state.cancelUser === payload['custom:adminUserName1'] && this.state.cancelPassword === payload['custom:adminPassword1']) ||
            (this.state.cancelUser === payload['custom:adminUserName2'] && this.state.cancelPassword === payload['custom:adminPassword2']) ||
            (this.state.cancelUser === payload['custom:adminUserName3'] && this.state.cancelPassword === payload['custom:adminPassword3']) ||
            (this.state.cancelUser === payload['custom:adminUserName4'] && this.state.cancelPassword === payload['custom:adminPassword4']) ||
            (this.state.cancelUser === payload['custom:adminUserName5'] && this.state.cancelPassword === payload['custom:adminPassword5'])
        ) {
            return true
        }
        else {
            return false
        }
    }

    callAPI = (pickup, newStatus = '', ccAddresses = [], bccAddresses = [], subjectLine = '', messageBody = '') => {
        API.put("sapo", "/pickups", {
            body: {
                ...pickup,
                status: newStatus,
                ccAddresses: ccAddresses,
                bccAddresses: bccAddresses,
                subjectLine: subjectLine,
                messageBody: messageBody,
            }
        }).then(response => {
            this.props.updatePickups({ ...pickup, status: newStatus }, this.props.pickups, this.props.index)
            this.showToast(`Pickup Updated to ${newStatus.toUpperCase()}`)
        }).catch(error => {
            this.showToast('ERROR: Pickup Not Updated!')
        })
    }

    handleCancelClick = (pickup) => () => {
        if (pickup == null) {
            return false
        }
        if (this.authenticateAdmin()) {
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

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleCancelOpen = () => {
        this.setState({ isCancelCredentialsOpen: true })
    }

    handleDialogClose = () => {
        this.setState({
            isCancelCredentialsOpen: false,
            cancelUser: '',
            cancelPassword: '',
        }, this.props.handleOpen)
    }

    handleRejectedClick = (pickup) => () => {
        if (pickup == null) {
            return false
        }
        this.callAPI(
            pickup,
            'rejected',
            this.props.userConfig.rejectedEmails.rejectedCCAddresses,
            this.props.userConfig.rejectedEmails.rejectedBCCAddresses,
            this.props.userConfig.rejectedEmails.rejectedSubjectLine,
            this.props.userConfig.rejectedEmails.rejectedMessageBody
        )
    }

    handleStatusChange = (pickup) => () => {
        if (pickup == null) {
            return false
        }
        else if (pickup.status === 'submitted') {
            this.callAPI(
                pickup,
                'confirmed',
                this.props.userConfig.confirmedEmails.confirmedCCAddresses,
                this.props.userConfig.confirmedEmails.confirmedBCCAddresses,
                this.props.userConfig.confirmedEmails.confirmedSubjectLine,
                this.props.userConfig.confirmedEmails.confirmedMessageBody
            )
        }
        else {
            this.callAPI(
                pickup,
                'completed',
                this.props.userConfig.completedEmails.completedCCAddresses,
                this.props.userConfig.completedEmails.completedBCCAddresses,
                this.props.userConfig.completedEmails.completedSubjectLine,
                this.props.userConfig.completedEmails.completedMessageBody
            )
        }

    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        const { pickups, index } = this.props
        if (pickups == null || index === '') {
            return ''
        }
        if (pickups[index] == null) {
            return ''
        }
        //Remove the following if statement
        if (pickups[index].status == null) {
            return ''
        }
        const pickup = pickups[index]
        let newStatus = ''
        if (pickup.status === 'submitted') {
            newStatus = 'confirmed'
        }
        else {
            newStatus = 'completed'
        }
        return (
            <Dialog
                isOpen={this.props.isOpen}
                onClose={this.handleDialogClose}
                title='Change Pickup Status'
            >
                <DialogContainer>
                    <div>{`${pickup.streetAddress}`}</div>
                    <div>{`${pickup.city}, ${pickup.province} ${pickup.zipcode} `}</div>
                    <div>Contact Name: {`${pickup.lastName}, ${pickup.firstName}`}</div>
                    <div>Contact Number: {`${pickup.phoneNumber}`}</div>
                    <div>Email: {`${pickup.email}`}</div>
                    <div>Status: {`${pickup.status.toUpperCase()}`}</div>
                    <ButtonContainer>
                        <Button intent={Intent.PRIMARY}
                            text={`Change Status to ${newStatus.toUpperCase()} and Send ${newStatus.toUpperCase()} Email`}
                            onClick={this.handleStatusChange(pickup)}
                        />
                    </ButtonContainer>
                    {!this.state.isCancelCredentialsOpen ?
                        (
                            <ButtonContainer>
                                <Button intent={Intent.DANGER} text={`Cancel Pickup`} onClick={this.handleCancelOpen} />
                            </ButtonContainer>
                        ) : (
                            <CancelForm>
                                <InputGroup name='cancelUser' onChange={this.handleChange} />
                                <InputGroup name='cancelPassword' onChange={this.handleChange} />
                                <ButtonContainer>
                                    <Button intent={Intent.DANGER} text={`Cancel Pickup`} onClick={this.handleCancelClick(pickup)} />
                                </ButtonContainer>
                            </CancelForm>
                        )
                    }
                    <ButtonContainer>
                        <Button intent={Intent.DANGER} text={`Reject Submitted Pickup`} onClick={this.handleRejectedClick(pickup)} />
                    </ButtonContainer>
                </DialogContainer>

            </Dialog>
        )
    }

}

const DialogContainer = styled.div`
    width: 550px;
    margin: 20px;
    margin-top: 10px;
`

const ButtonContainer = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
`

const CancelForm = styled.div`
    width: 150px;
    margin-top: 25px;
    margin-bottom: 25px;
`

export default StatusDialog;