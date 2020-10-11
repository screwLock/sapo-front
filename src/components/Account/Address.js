import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, Intent, H5, H6 } from '@blueprintjs/core'
import StateSelect from '../Overview/CustomerCallIn/StateSelect'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            streetAddress: '',
            city: '',
            province: '',
            zipcode: '',
            isProcessing: false
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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

    handleSubmit = () => {
        let newAddress = `${this.state.streetAddress}@${this.state.city}@${this.state.province}@${this.state.zipcode}`
        this.setState({ isProcessing: true },
            () => {
                API.post("sapo", '/account', {
                    body: {
                        attribute: 'address',
                        value: newAddress
                    }
                }).then(response => {
                    this.props.updateUserAttributes('address', newAddress )
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
        const address = this.props.userAttributes.address.split('@')
        return (
            <>
                <H5>Change Your Physical Address</H5>
                <H6>Current Address:</H6>
                <H6>{address[0]}</H6>
                <H6>{address[1]}, {address[2]} {address[3]}</H6>
                <div></div>
                <FormContainer>
                    <FormGroup
                        label={`Street Address`}
                    >
                        <InputGroup name='streetAddress'
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.streetAddress}
                        />
                    </FormGroup>
                    <FormGroup
                        label={`City`}
                    >
                        <InputGroup name='city'
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.city}
                        />
                    </FormGroup>
                    <FormGroup label='State/Province'>
                        <StateSelect onChange={this.handleStateSelect} selectedProvince={this.state.province} />
                    </FormGroup>
                    <FormGroup
                        label={`Zipcode`}
                    >
                        <InputGroup name='zipcode'
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.zipcode}
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

export default Address