import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, Intent, H5, H6 } from '@blueprintjs/core'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class EIN extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProcessing: false,
            ein: ''
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        this.setState({ isProcessing: true },
            () => {
                API.post("sapo", '/account', {
                    body: {
                        attribute: 'ein',
                        value: this.state.ein
                    }
                }).then(response => {
                    this.props.updateUserAttributes('ein', this.state.ein )
                    this.setState({ isProcessing: false})
                    this.showToast('Successfully Saved!')
                }).catch(error => {
                    this.setState({ isProcessing: false})
                    this.showToast(`Save Failed`)
                })
            }
        )
    }

    render() {
        const ein = this.props.userAttributes.ein
        return (
            <>
                <H5>Change Your EIN</H5>
                <H6>Current EIN: {ein}</H6>
                <div></div>
                <FormContainer>
                    <FormGroup
                        label={`New EIN`}
                    >
                        <InputGroup name='ein'
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.ein}
                        />
                    </FormGroup>
                </FormContainer>
                <Button onClick={this.handleSubmit} intent={Intent.PRIMARY} loading={this.state.isProcessing}>Submit</Button>
            </>
        )
    }
}

const FormContainer = styled.div`
    width: 300px;
    margin: 20px;
`

export default EIN