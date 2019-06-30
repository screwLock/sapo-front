import * as React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { Button, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"
import AdminDialog from './AdminDialog'

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdminOpen: false,
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

    getUsernamesAndPasswords = (membership) => {
        if(membership === 'basic'){
            return [
                { admin: this.state.admin1, pass: this.state.admin1pass}
            ]
        }
        else if(membership === 'standard'){
            return [
                { admin: this.state.admin1, pass: this.state.admin1pass},
                { admin: this.state.admin2, pass: this.state.admin2pass},
                { admin: this.state.admin3, pass: this.state.admin3pass}
            ]
        }
        else if(membership === 'premium'){
            return [
                { admin: this.state.admin1, pass: this.state.admin1pass},
                { admin: this.state.admin2, pass: this.state.admin2pass},
                { admin: this.state.admin3, pass: this.state.admin3pass},
                { admin: this.state.admin4, pass: this.state.admin4pass},
                { admin: this.state.admin5, pass: this.state.admin5pass}
            ]
        }
    }

    getSelectOptions = (membership) => {
        if (membership === 'SAPO Basic') {
            return [
                { value: 'admin1', label: 'Admin 1' }
            ]
        }
        else if (membership === 'SAPO Standard') {
            return [
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
                { value: 'admin3', label: 'Admin 3' },
            ]
        }
        else if (membership === 'SAPO Premium') {
            return [
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
                { value: 'admin3', label: 'Admin 3' },
                { value: 'admin4', label: 'Admin 4' },
                { value: 'admin5', label: 'Admin 5' },
            ]
        }
    }

    handleAdminOpen = () => {
        this.setState({ isAdminOpen: !this.state.isAdminOpen })
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        const membership = 'standard'

        return (
            <React.Fragment>
                <H6>Change The Admin Usernames and Passwords</H6>
                <SelectContainer>
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.getSelectOptions(membership)}
                    />
                </SelectContainer>
                <FormContainer>
                    <FormGroup
                        label={`${this.state.selectedOption.label} Username`}
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
                <Button text='Save Admin'
                    onClick={this.handleAdminOpen}
                    intent={Intent.PRIMARY}
                />
                <AdminDialog isOpen={this.state.isAdminOpen}
                    handleOpen={this.handleAdminOpen}
                    admins={this.getUsernamesAndPasswords(membership)}
                />
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