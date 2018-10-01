import React, { Component } from 'react';
import { FormGroup, InputGroup} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import * as EmailValidator from 'email-validator';

class NewEmployee extends Component {
    render() {
        return (
            <div>
                <FormGroup
                    helperText="Helper text with details..."
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeFirstName" placeholder="First Name" />
                </FormGroup>
                <FormGroup
                    helperText="Helper text with details..."
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeLastName" placeholder="Last Name" />
                </FormGroup>
                <FormGroup
                    helperText="Helper text with details..."
                    label="Add "
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup id="employeeEmail" placeholder="Email" />
                </FormGroup>
                <div class="bp3-select">
                    <select>
                        <option selected>Access Level</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default NewEmployee;