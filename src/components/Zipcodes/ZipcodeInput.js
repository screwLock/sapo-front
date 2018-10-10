import React, { Component } from 'react';
import { FormGroup, InputGroup, H3 } from "@blueprintjs/core";


class ZipcodeInput extends Component {
    render() {
        return (

            <FormGroup
                labelFor="text-input"
                helperText="(US or Canadian)"
            >
                <H3>Add a New Zipcode</H3>
                <InputGroup id="text-input" placeholder="Enter a Zipcode" />
            </FormGroup>
        );
    }
}

export default ZipcodeInput;