import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'

class StatusDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bs: ''
        }
    }

    handleCancelClick = () => {
        console.log('canceled')
    }

    handleCompleteClick = () => {
        console.log('complete')
    }

    render() {
        const { pickups, index } = this.props
        if (pickups == null || index === '') {
            return ''
        }
        const pickup = pickups[index]
        let newStatus = ''
        if(pickup.status === 'submitted'){
            newStatus = 'confirmed'
        }
        else if(pickup.status === 'confirmed'){
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
                    <ButtonContainer>Change Status to {newStatus.toUpperCase()} and Send {newStatus.toUpperCase()} Email</ButtonContainer>
                    <ButtonContainer>Cancel Pickup</ButtonContainer>
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
    margin: 50px;
`

export default StatusDialog;