import * as React from 'react'
import { Grid, Cell } from "styled-css-grid";
import styled from 'styled-components'
import HeaderAccount from './HeaderAccount'
import Notifications from './Notifications'
import { withRouter } from 'react-router'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAdminOpen: false,
        }
    }

    handleClose = () => {
        this.setState({isAdminOpen: false})
    }

    render() {
        const props = {...this.props}
        return (
            <Header1>
                <Grid columns={12}>
                    <Cell width={7}>SAPO</Cell>
                    {/*
                    <Cell width={1}><Notifications {...props}/></Cell>
                    */}
                    <Cell width={5}><HeaderAccount {...props}/></Cell>
                </Grid>
            </Header1>
        );
    }
}

const Header1 = styled.h1`
    padding-left: 20px;
    padding-bottom: 10px;
    padding-right: 25px;
    color: black;
    border-width: medium;
    border-bottom: solid;
    border-color: lightgrey;
`;

export default withRouter(Header);