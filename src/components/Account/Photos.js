import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, H5, Radio, RadioGroup } from '@blueprintjs/core'

const Photos = (props) => {

    const [loading, setLoading] = useState(false)
    const [isPhotosEnabled, setIsPhotosEnabled] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [photosAmount, setPhotosAmount] = useState('one')

    const handlePhotosSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // add the color to userConfig
            await props.updateUserConfig('photos', {
                photosEnabled: isPhotosEnabled,
                photosAmount: photosAmount
            },
                {
                    photos: {
                        photosEnabled: false,
                        photosAmount: photosAmount
                    }
                }
            )
            setLoading(false)
        } catch (e) {
            // onError(e);
            setLoading(false);
        }
    }

    const handleIsPhotosEnabledClick = () => {
        setIsPhotosEnabled(!isPhotosEnabled)
    }

    const handlePhotoAmountsChange = (e) => {
        setPhotosAmount(e.target.value)
    }

    return (
        <>
            <H5>Configure How You Require Photos for Pickup Requests</H5>
            {props.membership !== 'SAPO Premium'
                ? (
                    <div>Allow Your Customers To Upload Donation Photos</div>
                )
                : (
                    <>
                        <div>
                            <Checkbox checked={isPhotosEnabled} label="Enable Photo Uploads" onChange={handleIsPhotosEnabledClick} />
                        </div>
                        <div>
                            <RadioGroup
                                label="Select the Amount Of Photos To Allow"
                                onChange={handlePhotoAmountsChange}
                                selectedValue={photosAmount}
                            >
                                <Radio label="One" value="one" />
                                <Radio label="Two" value="two" />
                                <Radio label="Three" value="three" />
                            </RadioGroup>
                        </div>
                        <SubmitButton><Button loading={loading} text='Submit' onClick={handlePhotosSubmit} /></SubmitButton>
                        <ErrorText>{errorText}</ErrorText>
                    </>
                )
            }
        </>
    )
}

const SubmitButton = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
const ErrorText = styled.div`
    color: red;
    margin-top: 10px;
`

export default Photos