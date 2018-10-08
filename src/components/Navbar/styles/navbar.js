import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';


export const StyledNavbar = styled.div`
    display: flex;

    ul {
        list-style: none;
        padding: 0;
        left-margin: 0;

        li {
            top-margin: 0;
            font-size: 16px;
            padding: 15px;
            justify-content: center;
            align-items: center;


            &:hover {
                background: #f4f4f4;
                color:#0078d4;
            }
        }
    }
`;

export const StyledNavLink = styled(NavLink)`
    color: black;
    &.selected{
        font-weight: bold;
        color:#0078d4;
    }
    &:hover {
        text-decoration:none;
    }
`;
