import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"
import { Storage } from "aws-amplify"
import { BlockPicker } from 'react-color'

const Branding = (props) => {

    const [text, setText] = useState('Choose PNG or JPEG/JPG...')
    const [errorText, setErrorText] = useState('')
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#d9e3f0')

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

    const handleChangeComplete = (color) => {
        setSelectedColor(color.hex)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const filename = `${props.userAttributes.id}/branding/logo`
        try {
            // upload logo to s3 bucket
            // key is located in stored.key if it's needed
            const stored = await Storage.put(filename, selectedLogo, {
                contentType: selectedLogo.type,
            });
            // add the color to userConfig
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
            {props.userAttributes.id
                ? <StyledLogo src={`https://sapo-prod-uploads.s3.amazonaws.com/public/${props.userAttributes.id}/branding/logo`} />
                : ''
            }
            {props.userConfig.brandColor
                ? <StyledUnderline color={props.userConfig.brandColor} />
                : ''
            }

            <StyledH6>Upload Your Logo</StyledH6>
            <StyledInput text={text} onInputChange={onFileChange} />
            <FileName>{selectedLogo ? selectedLogo.name : ''}</FileName>
            {selectedLogo
                ? (
                    <Preview>
                        <StyledPreview src={selectedLogo ? URL.createObjectURL(selectedLogo) : null} />
                    </Preview>
                )
                : ''
            }
            <StyledH6>Choose Your Brand Color</StyledH6>
            <BlockPicker color={selectedColor} onChangeComplete={handleChangeComplete} />
            <SubmitButton disabled={!selectedLogo} loading={loading} text='Submit' onClick={handleSubmit} />
            <ErrorText>{errorText}</ErrorText>
        </>
    )
}

const StyledH6 = styled(H6)`
    margin: 1.5em;
`

const StyledLogo = styled.img`
    margin-left: 1.5em;
    margin-bottom: 1.5em;
    width: 150px;
    height: 150px;
`

const StyledUnderline = styled.hr`
    height: 3;
    border: none;
    background-color: ${props => props.color};
    width: 450px;
`

const StyledPreview = styled.img`
    width: 150px;
    height: 150px;
`

const Preview = styled.div`
    margin: 1.5em;
`

const StyledInput = styled(FileInput)`
    margin: 1.5em;
`

const FileName = styled.div`
    color: blue;
`
const SubmitButton = styled(Button)`
    margin-top: 20px;
`
const ErrorText = styled.div`
    color: red;
    margin-top: 10px;
`

export default Branding