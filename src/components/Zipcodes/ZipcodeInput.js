import React, { Component } from 'react';
import { FormGroup, InputGroup } from "@blueprintjs/core";


class ZipcodeInput extends Component {
    render() {
        return (
            <FormGroup
                label="New Zipcode"
                labelFor="text-input"
                labelInfo="(US or Canadian)"
            >
                <InputGroup id="text-input" placeholder="Enter a Zipcode" />
            </FormGroup>
        );
    }
}

export default ZipcodeInput;