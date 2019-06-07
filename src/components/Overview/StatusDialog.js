import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"

class StatusDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            bs: ''
        }
    }

    render(){
        return(
            <Dialog
                isOpen={this.props.isOpen}
                onClose={this.props.handleOpen}
                title='Change Pickup Status'
            >

            </Dialog>
        )
    }

}

export default StatusDialog;