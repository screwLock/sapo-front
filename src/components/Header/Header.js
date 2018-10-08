import * as React from 'react'
import { StyledHeader, StyledHeaderAccount } from './styles/header.js'
import { Grid, Cell } from "styled-css-grid";


class Header extends React.Component {
    render() {
        return (
            <StyledHeader>
                <Grid columns={12}>
                    <Cell width={10}>SAPO</Cell>
                    <Cell width={2}><StyledHeaderAccount /></Cell>
                </Grid>
            </StyledHeader>
        );
    }
}

export default Header;