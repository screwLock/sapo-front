import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, H3, H5, Radio, RadioGroup } from '@blueprintjs/core'

const Photos = (props) => {

    const [loading, setLoading] = useState(false)
    const [isPhotosEnabled, setIsPhotosEnabled] = useState(props.userConfig.photos? props.userConfig.photos.isPhotosEnabled:false)
    const [errorText, setErrorText] = useState('')
    const [photosAmount, setPhotosAmount] = useState(props.userConfig.photos? props.userConfig.photos.photosAmount: 1)
    const [isMandatory, setIsMandatory] = useState(props.userConfig.photos? props.userConfig.photos.isMandatory:false)

    const handlePhotosSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // add the color to userConfig
            await props.updateUserConfig('photos', {
                isPhotosEnabled: isPhotosEnabled,
                photosAmount: photosAmount,
                isMandatory: isMandatory
            },
                {
                    photos: {
                        isPhotosEnabled: false,
                        photosAmount: photosAmount,
                        isMandatory: isMandatory
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
            <H3>Manage The Photos of Pickup Donations</H3>
            <H5>Configure How You Require Photos for Pickup Requests</H5>
            {props.membership !== 'SAPO Premium'
                ? (
                    <div>Allow Your Customers To Upload Donation Photos</div>
                )
                : (
                    <>
                        <div>
                            <Checkbox checked={isPhotosEnabled} label="Enable Photo Uploads" onChange={() => setIsPhotosEnabled(!isPhotosEnabled)} />
                        </div>
                        {/*
                        <div>
                            <Checkbox checked={isMandatory} label="Make Photos Mandatory For Pickups" onChange={() => setIsMandatory(!isMandatory)} />
                        </div>
                        <div>
                            <RadioGroup
                                label="Select the Amount Of Photos To Allow"
                                onChange={(e) => setPhotosAmount(parseInt(e.target.value))}
                                selectedValue={photosAmount.toString()}
                            >
                                <Radio label="One" value={'1'} />
                                <Radio label="Two" value={'2'} />
                                <Radio label="Three" value={'3'} />
                            </RadioGroup>
                        </div>
                        */}
                        <SubmitButton><Button loading={loading} text='Submit' onClick={handlePhotosSubmit} /></SubmitButton>
                        <ErrorText>{errorText}</ErrorText>
                    </>
                )
            }
        </Container>
    )
}

const Container = styled.div`
  margin: 25px;
`

const SubmitButton = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
const ErrorText = styled.div`
    color: red;
    margin-top: 10px;
`

export default Photos