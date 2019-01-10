import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import DonorPageCategories from './DonorPageCategories'

class NewCategory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            newCategory: {}
        }
    }

    addCategory = () => {
        this.props.addCategory(this.state.newCategory);
        this.props.handleClose();
    }

    renderSelection = (selection) => {
        if( selection === "Add A New Category" ){
            return(
                <DonorPageCategories />
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
                onClose={this.props.handleClose}
                enforceFocus={false}
            >
                <DialogContainer>
                    {this.renderSelection(selection)}
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleClose}>Cancel</Button>
                        <Button onClick={this.addCategory} intent={Intent.PRIMARY}>Submit</Button>
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
export default NewCategory;