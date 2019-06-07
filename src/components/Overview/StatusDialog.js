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

    handleConfirmClick = () => {
        console.log('confirm')
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
                    <div>Confirmed? {`${pickup.confirmed.toString()}`}</div>
                    <div>Completed? {`${pickup.completed.toString()}`}</div>
                    <div onClick={this.handleConfirmClick}>Confirm and Send Email</div>
                    <div onClick={this.handleCompleteClick}>Complete and Send Email </div>
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

export default StatusDialog;