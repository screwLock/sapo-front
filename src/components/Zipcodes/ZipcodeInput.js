import React, { Component } from 'react'
import { FormGroup, InputGroup, H3 } from "@blueprintjs/core"
import styled from 'styled-components'


class ZipcodeInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputField: ''
        }
    }

    handleChange = (e) => {
        this.setState({inputField :e.target.value})
    } 


    render() {
        return (
                <FormGroup
                    labelFor="text-input"
                >
                    <H3>US or Canadian Postal Code</H3>
                    <ZipcodeInputGroup id="zipcode-value" 
                                placeholder="Enter a Zipcode" 
                                value={this.state.value}
                                onBlur={this.props.onBlur}
                                onChange={this.handleChange}
                    />
                </FormGroup>
        )
    }
}

const ZipcodeInputGroup = styled(InputGroup)`
    width: 150px;
`

export default ZipcodeInput;