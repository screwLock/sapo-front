import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class StatusDialog extends React.Component {
    constructor(props) {
        super(props)
    }

    handleCancelClick = () => {
        console.log('canceled')
    }

    handleCompleteClick = () => {
        console.log('complete')
    }

    handleStatusChange = (pickup) => () => {
        if(pickup == null){
            return false
        } 
        const emails = this.props.userConfig.emails
        let newStatus = ''
        let ccAddresses = []
        let bccAddresses = []
        let subjectLine = ''
        let messageBody = ''
        if (pickup.status === 'submitted') {
            newStatus = 'confirmed'
            ccAddresses = emails.confirmedCCAddresses
            bccAddresses = emails.confirmedBCCAddresses
            subjectLine = emails.confirmedSubjectLine
            messageBody = emails.confirmedMessageBody
        }
        else if (pickup.status === 'confirmed') {
            newStatus = 'completed'
            ccAddresses = emails.completedCCAddresses
            bccAddresses = emails.completedBCCAddresses
            subjectLine = emails.completedSubjectLine
            messageBody = emails.completedMessageBody
        }
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
            this.props.handleOpen()
            this.showToast(`Pickup Updated to ${newStatus.toUpperCase()}`)
        }).catch(error => {
            this.showToast('ERROR: Pickup Not Updated!')
        })
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        const { pickups, index } = this.props
        if (pickups == null || index === '') {
            return ''
        }
        const pickup = pickups[index]
        let newStatus = ''
        if (pickup.status === 'submitted') {
            newStatus = 'confirmed'
        }
        else if (pickup.status === 'confirmed') {
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
                        <Button intent={Intent.DANGER} text={`Cancel Pickup`} />
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button intent={Intent.DANGER} text={`Reject Submitted Pickup`} />
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