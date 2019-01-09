import * as React from 'react';
import { AnchorButton, Button, Card, Classes, Elevation, Dialog, FormGroup, InputGroup, Tooltip } from '@blueprintjs/core'
import OverviewDateInput from './OverviewDateInput'
import './styles/customerCallIn.css'

export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pickup: {}
        }
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOverlayOpen}
                onClose={this.props.onClose}
                transitionDuration={100}
                title="Customer Call-In"
            >
                <div className='container'>
                    <OverviewDateInput />
                    <FormGroup
                        helperText="Helper text with details..."
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" />
                    </FormGroup>
                    <FormGroup
                        helperText="Helper text with details..."
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" />
                    </FormGroup>
                    <FormGroup
                        helperText="Helper text with details..."
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" />
                    </FormGroup>
                    <FormGroup
                        helperText="Helper text with details..."
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" />
                    </FormGroup>
                    <FormGroup
                        helperText="Helper text with details..."
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" />
                    </FormGroup>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.onClose}>Cancel</Button>
                        <Button onClick={this.props.onClose}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

