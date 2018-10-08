import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';


export const StyledNavbar = styled.div`

    ul {
        list-style: none;
        padding: 0;
        left-margin: 0;
        display: flex;
        flex-direction: column;


        li {
            top-margin: 0;
            font-size: 16px;
            display: flex;

            &:hover {
                background: #f4f4f4;
                color:#0078d4;
            }

        }
    }
`;

export const StyledNavLink = styled(NavLink)`
    color: black;
    padding: 15px;
    flex: 1;
    &.selected{
        font-weight: bold;
        color:#0078d4;
        background-color: #f4f4f4;

        :hover {
            background-color: #DCDCDC;
        }
    }
    &:hover {
        text-decoration:none;
    }

`;
