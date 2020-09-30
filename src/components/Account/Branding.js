import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"

const Branding = (props) => {

    const [text, setText] = useState('Choose PNG...')
    const [selectedPNG, setSelectedPNG] = useState(null)

    // On file select (from the pop up) 
    const onFileChange = event => {

        // Update the state 
        setSelectedPNG(event.target.files[0])

    };

    return (
        <>
            <H6>Upload Your Logo and Header</H6>
            <H6>We recommend using a logo with a maximum height of 100px</H6>
            <FileInput text={text} onInputChange={onFileChange}/>
            <H6>{selectedPNG? selectedPNG.name: ''}</H6>
        </>
    )
}

export default Branding