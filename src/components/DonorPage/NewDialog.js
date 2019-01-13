import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import NewCategory from './NewCategory'

class NewDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            submittable: {},
            canSubmit: false,
        }
    }

    createSubmittable = ( value ) => {
        //this.props.addCategory(this.state.newCategory);
        this.setState({ submittable: value })
    }

    handleSubmit = () => {
        //console.log(this.state.submittable)
        //database stuff
        this.setState({ submittable: {} })
        this.handleClose();
    }

    canSubmit = (boolval) => {
        this.setState({ canSubmit: boolval })
    }


    handleClose = () => {
        this.setState({ canSubmit: false});
        this.props.handleClose();
    }

    renderSelection = (selection) => {
        if( selection === "Add A New Category" ){
            return(
                <NewCategory createSubmittable={this.createSubmittable} canSubmit={this.canSubmit}/>
            )
        }
        else if( selection === "Add A New Pickup Detail"){
            return(
                <div>b</div>
            )
        }
        else if( selection === "Add A New Item Restriction"){
            return ( 
                <div>c</div>
            )
        }
        return selection;
    }

    render() {
        const selection = this.props.selection;
        return (
            <Dialog isOpen={this.props.isOpen}
                title={selection}
                onClose={this.handleClose}
                enforceFocus={false}
            >
                <DialogContainer>
                    {this.renderSelection(selection)}
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit} disabled={!this.state.canSubmit} intent={Intent.PRIMARY}>Submit</Button>
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
export default NewDialog;