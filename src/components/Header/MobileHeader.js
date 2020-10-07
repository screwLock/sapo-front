import * as React from 'react'
import { Grid, Cell } from "styled-css-grid";
import styled from 'styled-components'
import HeaderAccount from './HeaderAccount'
import AdminLogin from './AdminLogin'
import { withRouter } from 'react-router'

class MobileHeader extends React.Component {
    constructor(props){
        super(props)
    }


    render() {
        const props = {...this.props}
        return (
            <div>Mobile Header</div>
        );
    }
}

export default withRouter(MobileHeader);