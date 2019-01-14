import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import BlackoutDatesSingleDatePicker from './BlackoutDatesSingleDatePicker';
import BlackoutDatesRangeDatePicker from './BlackoutDatesRangeDatePicker';

class NewBlackoutDate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            submittable: {},
            
        }
    }

    addDate = () => {
        this.props.addDate(this.state.newDate);
        this.props.handleClose();
    }

    renderSelection = (selection) => {
        if( selection === "Select A Single Date" ){
            return(
                <BlackoutDatesSingleDatePicker />
            )
        }
        else if( selection === "Select A Date Range"){
            return(
                <BlackoutDatesRangeDatePicker /> 
            )
        }
        return selection;
    }

    render() {
        const selection = this.props.selection;
        return (
            <Dialog isOpen={this.props.isOpen}
                title={'Add New Blackout Dates'}
                onClose={this.props.handleClose}
            >
                <DialogContainer>
                    {this.renderSelection(selection)}
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleClose}>Cancel</Button>
                        <Button onClick={this.addDate} intent={Intent.PRIMARY}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const DialogContainer = styled.div`
    maxWidth: 700px;
    maxHeight: 500px;
    margin: 20px;
`
export default NewBlackoutDate;