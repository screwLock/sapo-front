import styled from 'styled-components'
import HeaderAccount from '../HeaderAccount';

export const StyledHeader = styled.h1`
    padding-left: 20px;
    padding-bottom: 10px;
    color: black;
    border-width: medium;
    border-bottom: solid;
    border-color: lightgrey;
`;

export const StyledHeaderAccount = styled(HeaderAccount)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;