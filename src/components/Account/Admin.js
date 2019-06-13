import * as React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { FormGroup, H6, InputGroup } from "@blueprintjs/core"

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: { value: 'admin1', label: 'Admin 1' },
            admin1: '',
            admin1pass: '',
            admin2: '',
            admin2pass: '',
            admin3: '',
            admin3pass: '',
            admin4: '',
            admin4pass: '',
            admin5: '',
            admin5pass: '',
        }
    }

    getSelectOptions = (membership) => {
        if (membership === 'basic') {
            return [
                { value: 'admin1', label: 'Admin 1' }
            ]
        }
        else if (membership === 'standard') {
            return [
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
                { value: 'admin3', label: 'Admin 3' },
                { value: 'admin4', label: 'Admin 4' },
                { value: 'admin5', label: 'Admin 5' },
            ]
        }
        else if (membership === 'premium') {
            return [
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
                { value: 'admin3', label: 'Admin 3' },
            ]
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        const options = this.getSelectOptions('standard')

        return (
            <React.Fragment>
            <H6>Change The Admin Usernames and Passwords</H6>
                <SelectContainer>
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={options}
                    />
                </SelectContainer>
                <FormContainer>
                    <FormGroup
                        label={`${this.state.selectedOption.label}`}
                    >
                        <InputGroup name={`${this.state.selectedOption.value}`}
                            type="text"
                            onChange={this.handleInputChange}
                            disabled={this.state.selectedOption === ''}
                            value={this.state[this.state.selectedOption.value]}
                        />
                    </FormGroup>
                    <FormGroup
                        label={`${this.state.selectedOption.label} Password`}
                    >
                        <InputGroup name={`${this.state.selectedOption.value}pass`}
                            type="text"
                            onChange={this.handleInputChange}
                            disabled={this.state.selectedOption === ''}
                            value={this.state[`${this.state.selectedOption.value}pass`]}
                        />
                    </FormGroup>
                </FormContainer>
            </React.Fragment>
        )
    }
}

const SelectContainer = styled.div`
    width: 250px;
    margin: 20px;
`

const FormContainer = styled.div`
    width: 300px;
    margin: 20px;
`

export default Admin;