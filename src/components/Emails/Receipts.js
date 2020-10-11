import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button, FileInput, FormGroup, H6, InputGroup, Intent } from "@blueprintjs/core"
import { Storage } from "aws-amplify";
import SignaturePad from 'react-signature-canvas'

const Receipts = (props) => {

    const [errorText, setErrorText] = useState('')
    const [trimmedDataURL, setTrimmedDataURL] = useState(null)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [representative, setRepresentative] = useState('')

    const sigPad = useRef({});
    const clear = () => {
        sigPad.current.clear()
        setTrimmedDataURL(null)
    }
    const save = () => {
        setTrimmedDataURL(sigPad.current.getTrimmedCanvas()
            .toDataURL('image/png'))
    }

    const handleInputChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'representative') {
            setRepresentative(e.target.value)
        }
    }

    const validateForms = () => {
        if (trimmedDataURL === null) {
            setErrorText('You need to create a digital signature')
            return false
        }
        else if (title === '') {
            setErrorText('You need to provide a title')
            return false
        }
        else if (representative === '') {
            setErrorText('You need to provide a representative name')
            return false
        }
        else {
            setErrorText('')
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForms()) return false;
        setLoading(true);
        try {
            await props.updateUserConfig('receipts', {
                title: title,
                representative: representative,
            },
                {
                    receipts: {
                        title: title,
                        representative: representative,
                    }
                }
            )
            const stored = await Storage.put('receipts/signature', trimmedDataURL, {
                contentType: 'image/jpeg',
                level: 'private'
            });
            setLoading(false)
        } catch (e) {
            setErrorText('Save Failed')
            console.log(e)
            setLoading(false);
        }
    }

    // upload file to s3 call it /{bucketName}/{userID}/logos/logo1
    // save url in userconfig

    return (
        <>
            <H6>Create A Representative Signature For Your Tax Receipts</H6>
            {props.userConfig.receipts ?
                <div>
                    <H6>Current Representative: {props.userConfig.receipts.representative}</H6>
                    <H6>Current Title: {props.userConfig.receipts.title}</H6>
                    <H6>Current Signature: </H6>
                </div>
                : ''
            }
            <PadContainer>
                <SignaturePad
                    canvasProps={{ width: '300px', height: '150px' }}
                    ref={sigPad}
                    onEnd={save}
                />
            </PadContainer>
            <Button onClick={clear} text='Clear' />
            <FormContainer>
                <FormGroup
                    label={`Representative Title`}
                >
                    <InputGroup name='title'
                        type="text"
                        onChange={handleInputChange}
                        value={title}
                    />
                </FormGroup>
                <FormGroup
                    label={`Representative Name`}
                >
                    <InputGroup name='representative'
                        type="text"
                        onChange={handleInputChange}
                        value={representative}
                    />
                </FormGroup>
            </FormContainer>
            <Button loading={loading} text='Submit' onClick={handleSubmit} />
            <ErrorText>{errorText}</ErrorText>
        </>
    )
}

const PadContainer = styled.div`
    margin: 1em;
`

const ErrorText = styled.div`
    margin: 1em;
    color: red;
`
const FormContainer = styled.div`
    width: 300px;
    margin: 1em;
`

export default Receipts