import * as React from 'react'
import { AppToaster } from '../Toaster'
import { API, Auth } from "aws-amplify"
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog, Radio, RadioGroup } from "@blueprintjs/core"
import styled from 'styled-components'

class CancelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cancelText: '',
            isProcessing: false,
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = () => {
        if(this.validateForm()){
            this.props.handleOpen()
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForm = () => {
        if (this.state.cancelText === 'Cancel SAPO') {
            return true
        }
        else {
            this.showToast('Incorrect text')
            return false
        }
    }

    render() {
        return (
            <Dialog
                onClose={this.props.handleOpen}
                title="Cancel MemberShip"
                isOpen={this.props.isOpen}
            >
                <DialogContainer>
                    <FormGroup>
                        <InputGroup name="cancelText" type="text" onChange={this.handleChange} />
                    </FormGroup>
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleOpen} loading={this.state.isProcessing}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY} loading={this.state.isProcessing}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }

}

const DialogContainer = styled.div`
    margin: 20px;
    margin-top: 10px;
`

export default CancelDialog