import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H3, H6, InputGroup, Intent } from "@blueprintjs/core"
import { Storage } from "aws-amplify"
import { BlockPicker } from 'react-color'

const Branding = (props) => {

    const [text, setText] = useState('Choose PNG or JPEG/JPG...')
    const [errorText, setErrorText] = useState('')
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)

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

    const handleLogoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const filename = `${props.userAttributes.id}/branding/logo`
        try {
            // upload logo to s3 bucket
            // key is located in stored.key if it's needed
            await Storage.put(filename, selectedLogo, {
                contentType: selectedLogo.type,
            });
            setLoading(false)
        } catch (e) {
            // onError(e);
            setLoading(false);
        }
    }

    const handleColorSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // add the color to userConfig
            await props.updateUserConfig('branding', {
                color1: selectedColor
            },
                {
                    branding: {
                        color1: selectedColor
                    }
                }
            )
            setLoading(false)
        } catch (e) {
            // onError(e);
            setLoading(false);
        }
    }


    return (
        <Container>
            <H3>Manage Your Branding</H3>
            {props.userAttributes.id
                ? <StyledLogo src={`https://sapo-prod-uploads.s3.amazonaws.com/public/${props.userAttributes.id}/branding/logo`} />
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
            <SubmitButton><Button disabled={!selectedLogo} loading={loading} text='Submit' onClick={handleLogoSubmit} /></SubmitButton>
            <StyledH6>Choose Your Brand Color</StyledH6>
            <BlockPicker color={selectedColor || '#000'} onChangeComplete={handleChangeComplete} />
            <SubmitButton><Button disabled={!selectedColor} loading={loading} text='Submit' onClick={handleColorSubmit} /></SubmitButton>
            <ErrorText>{errorText}</ErrorText>
        </Container>
    )
}

const Container = styled.div`
  margin: 25px;
`

const StyledH6 = styled(H6)`
    margin-top: 0.75rem;
    margin-bottom: 1rem;
`

const StyledLogo = styled.img`
    margin-left: 1.5em;
    margin-bottom: 1.5em;
    width: 150px;
    height: 150px;
`

const StyledPreview = styled.img`
    width: 150px;
    height: 150px;
`

const Preview = styled.div`
    margin: 1.5em;
`

const StyledInput = styled(FileInput)`
    margin-top: 1rem;
    margin-left: 1.5rem;
`

const FileName = styled.div`
    color: blue;
`
const SubmitButton = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
const ErrorText = styled.div`
    color: red;
    margin-top: 10px;
`

export default Branding