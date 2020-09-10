import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

class PickupCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isButtonClicked: false,
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
        this.setState({ isButtonClicked: !this.state.isButtonClicked })
        this.props.changeIsDragDisabled(true)
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
                {!this.state.isButtonClicked ? (
                    <React.Fragment>
                        <StatusButton onClick={this.onStatusButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2}/>
                        <PickupInfo>
                            <h5>{pickup.streetAddress} {pickup.zipcode}</h5>
                            <h5>{pickup.lastName}, {pickup.firstName}</h5>
                        </PickupInfo>
                    </React.Fragment>
                ) : (<React.Fragment>
                    <React.Fragment>
                        <StatusButton onClick={this.onStatusButtonClick} color1={colors[pickup.status].color1} color2={colors[pickup.status].color2}/>
                        <button>Confirm</button>
                        <button>Cancel</button>
                        <button>Reject</button>
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
    margin: 1em;
    border-width: 0.05em; 
    border-color: lightgrey;
    border-radius: 0.2em;
    border-style: solid;
`

const StatusButton = styled.button`
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
    width: 90%;
    text-align: center;
`

export default PickupCard