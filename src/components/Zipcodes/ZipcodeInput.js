import React, { Component } from 'react';
import { FormGroup, InputGroup, H3 } from "@blueprintjs/core";


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
                    helperText="(US or Canadian)"
                >
                    <H3>Add a New Zipcode</H3>
                    <InputGroup id="zipcode-value" 
                                placeholder="Enter a Zipcode" 
                                value={this.state.value}
                                onBlur={this.props.onBlur}
                                onChange={this.handleChange}
                    />
                </FormGroup>
        )
    }
}

export default ZipcodeInput;