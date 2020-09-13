import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@blueprintjs/core'

class PickupCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isStatusOpen: false,
            isRatingOpen: false,
        }
    }

    componentDidMount() {
        this.props.changeIsDragDisabled(false)
        this.props.changeIsACardTabOpen(false)
    }

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    onStatusButtonClick = () => {
        if (this.props.isACardTabOpen) {
            return;
        }
        this.setState({ isStatusOpen: true })
        this.props.changeIsDragDisabled(true)
        this.props.changeIsACardTabOpen(true)
    }

    onBackButtonClick = () => {
        this.setState({ isStatusOpen: false, isRatingOpen: false })
        this.props.changeIsDragDisabled(false)
        this.props.changeIsACardTabOpen(false)
    }

    onPickupInfoClick = () => {
        if (!this.props.isACardTabOpen) {
            this.props.changeIsPickupInfoOpen(true);
            this.props.selectPickup();
        }
    }

    onRatingButtonClick = () => {
        if (this.props.isACardTabOpen) {
            return;
        }
        this.setState({ isRatingOpen: true })
        this.props.changeIsDragDisabled(true)
        this.props.changeIsACardTabOpen(true)
    }

    render() {
        const { provided, innerRef, pickup } = this.props;
        const colors = {
            confirmed: {
                color1: '#187bcd',
                color2: '#1167b1'
            },
            completed: {
                color1: '#187bcd',
                color2: '#1167b1'
            },
            cancelled: {
                color1: '#187bcd',
                color2: '#1167b1'
            },
            rejected: {
                color1: '#187bcd',
                color2: '#1167b1'
            },
            submitted: {
                color1: '#187bcd',
                color2: '#1167b1'
            }
        }

        // conditional rendering for card
        let cardContent;
        if (!this.state.isStatusOpen && !this.state.isRatingOpen) {
            cardContent =
                <React.Fragment>
                    <OpenStatusButton onClick={this.onStatusButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2} />
                    <PickupInfo>
                        <PickupInfoButton onClick={this.onPickupInfoClick}>{pickup.streetAddress} {pickup.zipcode}</PickupInfoButton>
                        <div>{pickup.lastName}, {pickup.firstName}</div>
                        <RatingButton onClick={this.onRatingButtonClick}>Rate This Pickup</RatingButton>
                    </PickupInfo>
                    <ActionColumn>
                        <div><a href={`tel:+1${pickup.phoneNumber}`}><Icon icon='phone' /></a></div>
                        <div><a href={`mailto:${pickup.email}`}><Icon icon='envelope' /></a></div>
                        <div><a href={`http://maps.google.com/?q=${pickup.lat},${pickup.lng}`} target="_blank"><Icon icon='geolocation' /></a></div>
                    </ActionColumn>
                </React.Fragment>
        } else if (this.state.isStatusOpen) {
            cardContent =
                <React.Fragment>
                    <OpenStatusButton onClick={this.onBackButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2} />
                    <StatusButtonRow>
                        <Button color='blue'>Confirm</Button>
                        <Button color='red'>Cancel</Button>
                        <Button color='red'>Reject</Button>
                    </StatusButtonRow>
                </React.Fragment>
        } else if (this.state.isRatingOpen) {
            cardContent =
                <React.Fragment>
                    asdf
                </React.Fragment>
        }
        return (
            <Card
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={this.setRef}
            >
                {cardContent}
            </Card>
        )
    }
}

const Card = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    width: 80%;
    height: 7em;
    margin: 1em;
    border-width: 0.05em; 
    border-color: lightgrey;
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    border-style: solid;
`

const OpenStatusButton = styled.div`
    background-color: ${props => props.color1};
    width: 10%;
    cursor: pointer;
    border: none;
    transition: background 250ms ease-in-out, 
    transform 150ms ease;
    :hover{
        background-color: ${props => props.color2};
      }
`

const PickupInfoButton = styled.div`
      cursor: pointer;
`

const RatingButton = styled.div`
      background-color: white;
      border: none;
      :hover {
        font-color: #1167b1;
        font-weight: 600;
      }
      cursor: pointer;
`

const PickupInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-left: 1em;
`

const ActionColumn = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 10%;
      height: 100%;
`

const StatusButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`

const Button = styled.button`
    background-color: ${props => props.color};;
    color: white;
    border-width: 0.05em; 
    border-color: ${props => props.color};
    border-radius: 0.2em;
    border-style: solid;
    height: 75%;
    align-self: center;
    width: 20%;
`

export default PickupCard