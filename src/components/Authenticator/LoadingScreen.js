import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components'

const LoadingScreen = (props) => {

    return <StyledLoadingScreen>SAPO</StyledLoadingScreen>
}

const blinking = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0
    }
    100% {
        opacity: 1;
    }
`

const StyledLoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 500%;
    font-weight: bold;
    animation: ${blinking} 2s ease-in-out infinite;
    opacity: 1;
`



export default LoadingScreen;