import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"
import { Storage } from "aws-amplify";

const Branding = (props) => {

    const [text, setText] = useState('Choose PNG or JPEG/JPG...')
    const [errorText, setErrorText] = useState('')
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [loading, setLoading] = useState(false)

    // On file select (from the pop up) 
    const onFileChange = event => {
        let logo = event.target.files[0]
        // Image upload was canceled
        if (!logo) {
            return
        }
        if (logo.size > 1000000) {
            setErrorText('Image should not exceed a megabyte')
            return
        }
        else if (logo.type !== 'image/png' && logo.type !== 'image/jpeg' && logo.type !== 'image/jpg') {
            setErrorText('Image should be a PNG or a JPEG/JPG')
            return
        }
        // Update the state 
        setErrorText('')
        setSelectedLogo(logo)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const filename = `/branding/${selectedLogo.name}`
        try {
            const stored = await Storage.put(filename, selectedLogo, {
                contentType: selectedLogo.type,
                level: 'private'
              });
            // key is located in stored.key if it's needed
            setLoading(false)
            console.log(stored)
        } catch (e) {
            // onError(e);
            setLoading(false);
        }
    }

    // upload file to s3 call it /{bucketName}/{userID}/logos/logo1
    // save url in userconfig

    return (
        <>
            <H6>Upload Your Logo and Header</H6>
            <H6>We recommend using a logo with a maximum height of 100px</H6>
            <StyledInput text={text} onInputChange={onFileChange} />
            <FileName>{selectedLogo ? selectedLogo.name : ''}</FileName>
            <Button disabled={!selectedLogo} loading={loading} text='Submit' onClick={handleSubmit} />
            <ErrorText>{errorText}</ErrorText>
        </>
    )
}

const StyledInput = styled(FileInput)`
    margin: 1.5em;
`

const FileName = styled.div`
    color: blue;
`

const ErrorText = styled.div`
    color: red;
`

export default Branding