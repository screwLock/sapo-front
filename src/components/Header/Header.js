import * as React from 'react'
import { Grid, Cell } from "styled-css-grid";
import styled from 'styled-components'
import HeaderAccount from './HeaderAccount'
import AdminLogin from './AdminLogin'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAdminOpen: false,
        }
    }

    handleOpen = () => {
        this.setState({isAdminOpen: !this.state.isAdminOpen})
    }

    render() {
        const props = {...this.props}
        return (
            <Header1>
                <AdminLogin
                    isOpen={this.state.isAdminOpen}
                    onOpen={this.handleOpen}
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



export default Header;