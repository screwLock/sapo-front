import * as React from 'react'
import { Grid, Cell } from "styled-css-grid";
import styled from 'styled-components'
import HeaderAccount from './HeaderAccount'
import AdminLogin from './AdminLogin'
import { withRouter } from 'react-router'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAdminOpen: false,
        }
    }

    handleOpen = () => {
        if(this.props.isAdminLoggedIn){
            // Logging out
            this.props.onAdminLogin()
            this.setState({isAdminOpen: false})
            //Redirect back to overview page
            this.props.history.push('/')
        }
        else{
            // Bring up Login Dialog
            this.setState({isAdminOpen: true})
        }
    }

    handleClose = () => {
        this.setState({isAdminOpen: false})
    }

    render() {
        const props = {...this.props}
        return (
            <Header1>
                <AdminLogin
                    isOpen={this.state.isAdminOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    {...props}
                />
                <Grid columns={12}>
                    <Cell width={10}>SAPO</Cell>
                    <Cell width={2}><HeaderAccount {...props} handleAdminOpen={this.handleOpen}/></Cell>
                </Grid>
            </Header1>
        );
    }
}

const Header1 = styled.h1`
    padding-left: 20px;
    padding-bottom: 10px;
    color: black;
    border-width: medium;
    border-bottom: solid;
    border-color: lightgrey;
`;



export default withRouter(Header);