import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"
import { Storage } from "aws-amplify";
import SignaturePad from 'react-signature-canvas'

const Receipts = (props) => {

    const [text, setText] = useState('Choose PNG or JPEG/JPG...')
    const [errorText, setErrorText] = useState('')
    const [trimmedDataURL, setTrimmedDataURL] = useState(null)
    const [loading, setLoading] = useState(false)

    const sigPad = useRef({});
    const clear = () => {
      sigPad.current.clear()
    }
    const save = () => {
      setTrimmedDataURL(sigPad.getTrimmedCanvas()
        .toDataURL('image/png'))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // key is located in stored.key if it's needed
            setLoading(false)
        } catch (e) {
            // onError(e);
            setLoading(false);
        }
    }

    // upload file to s3 call it /{bucketName}/{userID}/logos/logo1
    // save url in userconfig

    return (
        <>
            <H6>Create a Signature</H6>
            <PadContainer>
                <SignaturePad 
                    canvasProps={{width: '300px', height: '150px'}}
                    ref={sigPad} 
                />
            </PadContainer>
            <Button onClick={clear} text='Clear' /><Button onClick={save} text='Save' />
            <Button disabled={true} loading={loading} text='Submit' onClick={handleSubmit} />
            <ErrorText>{errorText}</ErrorText>
        </>
    )
}

const PadContainer = styled.div`
    margin: 1em;
`

const ErrorText = styled.div`
    color: red;
`

export default Receipts