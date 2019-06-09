import * as React from 'react'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog } from "@blueprintjs/core"

class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            admin1: '',
            pass1: '',
            admin2: '',
            pass2: '',
            admin3: '',
            pass3: '',
            admin4: '',
            pass4: '',
            admin5: '',
            pass5: '',
        }
    }

    render(){
        return(
            <React.Fragment>
                <div>Admin</div>
            </React.Fragment>
        )
    }
}

export default Admin;