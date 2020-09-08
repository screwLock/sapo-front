import * as React from 'react'
import Header from './Header'
import Pickups from './Pickups'
import { Grid, Cell } from "styled-css-grid"

class OverviewPickupsView extends React.Component {
    constructor(props){
        super(props)
    }

    
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Pickups {...this.props}/>
            </React.Fragment>
        )
    }
}

export default OverviewPickupsView;