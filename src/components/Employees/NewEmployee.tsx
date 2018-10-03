import React, { Component } from 'react';
import { FormGroup, InputGroup } from "@blueprintjs/core";
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";
// import * as EmailValidator from 'email-validator';
import AccessLevelSelect from "./Access_Level_Select"


class NewEmployee extends Component {
    public render() {
        return (
            <div>
                <FormGroup
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeFirstName" placeholder="First Name" />
                </FormGroup>
                <FormGroup
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeLastName" placeholder="Last Name" />
                </FormGroup>
                <FormGroup
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeEmail" placeholder="Email" />
                </FormGroup>
                <AccessLevelSelect />
            </div>
        );
    }
}

export default NewEmployee;