import * as React from 'react'
import { Grid, Cell } from "styled-css-grid";
import styled from 'styled-components'
import HeaderAccount from './HeaderAccount'


class Header extends React.Component {
    render() {
        const props = {...this.props}
        return (
            <Header1>
                <Grid columns={12}>
                    <Cell width={10}>SAPO</Cell>
                    <Cell width={2}><HeaderAccount {...props}/></Cell>
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