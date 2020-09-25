import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components'
import Logo from './Logo'

const LoadingScreen = (props) => {

    return <StyledLoadingScreen>
        <Logo mass={50}/>
    </StyledLoadingScreen>
}

const StyledLoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 500%;
    font-weight: bold;
`



export default LoadingScreen;