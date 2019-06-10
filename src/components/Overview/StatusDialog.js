import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class StatusDialog extends React.Component {
    constructor(props) {
        super(props)
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
            this.props.updatePickups({...pickup, status: newStatus}, this.props.pickups, this.props.index)
            this.showToast(`Pickup Updated to ${newStatus.toUpperCase()}`)
        }).catch(error => {
            this.showToast('ERROR: Pickup Not Updated!')
        })
    }

    handleCancelClick = (pickup) => () => {
        if (pickup == null) {
            return false
        }
        this.callAPI(
            pickup,
            'canceled',
            this.props.userConfig.emails.canceledCCAddresses,
            this.props.userConfig.emails.canceledBCCAddresses,
            this.props.userConfig.emails.canceledSubjectLine,
            this.props.userConfig.emails.canceledMessageBody
        )
    }

    handleRejectedClick = (pickup) => () => {
        if (pickup == null) {
            return false
        }
        this.callAPI(
            pickup,
            'rejected',
            this.props.userConfig.emails.rejectedCCAddresses,
            this.props.userConfig.emails.rejectedBCCAddresses,
            this.props.userConfig.emails.rejectedSubjectLine,
            this.props.userConfig.emails.rejectedMessageBody
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
                this.props.userConfig.emails.confirmedCCAddresses,
                this.props.userConfig.emails.confirmedBCCAddresses,
                this.props.userConfig.emails.confirmedSubjectLine,
                this.props.userConfig.emails.confirmedMessageBody
            )
        }
        else {
            this.callAPI(
                pickup,
                'completed',
                this.props.userConfig.emails.completedCCAddresses,
                this.props.userConfig.emails.completedBCCAddresses,
                this.props.userConfig.emails.completedSubjectLine,
                this.props.userConfig.emails.completedMessageBody
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
        if(pickups[index] == null){
            return ''
        }
        //Remove the following if statement
        if(pickups[index].status == null){
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
                onClose={this.props.handleOpen}
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
                    <ButtonContainer>
                        <Button intent={Intent.DANGER} text={`Cancel Pickup`} onClick={this.handleCancelClick(pickup)}/>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button intent={Intent.DANGER} text={`Reject Submitted Pickup`} onClick={this.handleRejectedClick(pickup)}/>
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

export default StatusDialog;