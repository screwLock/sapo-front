import React, { Component } from 'react';
import { FormGroup, InputGroup } from "@blueprintjs/core";
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";

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