import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@blueprintjs/core'

class PickupCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isStatusOpen: false,
        }
    }

    componentDidMount() {
        this.props.changeIsDragDisabled(false)
    }

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    onStatusButtonClick = () => {
        if (this.props.isAStatusOpen) {
            return;
        }
        this.setState({ isStatusOpen: true })
        this.props.changeIsDragDisabled(true)
        this.props.changeIsAStatusOpen(true)
    }

    onBackButtonClick = () => {
        this.setState({ isStatusOpen: false })
        this.props.changeIsDragDisabled(false)
        this.props.changeIsAStatusOpen(false)
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
            submitted: {
                color1: '#187bcd',
                color2: '#1167b1'
            }
        }
        return (
            <Card
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={this.setRef}
            >
                {!this.state.isStatusOpen ? (
                    <React.Fragment>
                        <OpenStatusButton onClick={this.onStatusButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2} />
                        <PickupInfo>
                            <div>{pickup.streetAddress} {pickup.zipcode}</div>
                            <div>{pickup.lastName}, {pickup.firstName}</div>
                        </PickupInfo>
                        <ActionColumn>
                            <div><a href={`tel:+1${pickup.phoneNumber}`}><Icon icon='phone' /></a></div>
                            <div><a href={`mailto:${pickup.email}`}><Icon icon='envelope' /></a></div>
                            <div><a href={`http://maps.google.com/?q=${pickup.lat},${pickup.lng}`} target="_blank"><Icon icon='geolocation' /></a></div>
                        </ActionColumn>
                    </React.Fragment>
                ) : (<React.Fragment>
                    <React.Fragment>
                        <OpenStatusButton onClick={this.onBackButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2} />
                        <StatusButtonRow>
                            <Button color='blue'>Confirm</Button>
                            <Button color='red'>Cancel</Button>
                            <Button color='red'>Reject</Button>
                        </StatusButtonRow>
                    </React.Fragment>
                </React.Fragment>
                    )}
            </Card>
        )
    }
}

const Card = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    width: 80%;
    height: 8em;
    margin: 1em;
    border-width: 0.05em; 
    border-color: lightgrey;
    border-radius: 0.2em;
    border-style: solid;
`

const OpenStatusButton = styled.button`
    background-color: ${props => props.color1};
    width: 10%;
    border: none;
    transition: background 250ms ease-in-out, 
    transform 150ms ease;
    :hover{
        background-color: ${props => props.color2};
      }
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
      background-color: transparent;
      color: ${props => props.color};
      border-width: 0.05em; 
      border-color: ${props => props.color};
      border-radius: 0.2em;
      border-style: solid;
      height: 100%;
`

export default PickupCard