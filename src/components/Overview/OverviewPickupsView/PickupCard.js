import * as React from 'react'
import styled from 'styled-components'

class PickupCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isButtonClicked: false,
        }
    }

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    onStatusButtonClick = () => {
        this.setState({ isButtonClicked: !this.state.isButtonClicked })
    }

    render() {
        const { provided, innerRef, pickup } = this.props;
        return (
            <Card
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={this.setRef}
            >
                {!this.state.isButtonClicked ? (
                    <React.Fragment>
                        <StatusButton onClick={this.onStatusButtonClick} />
                        <PickupInfo>
                            <h5>{pickup.streetAddress} {pickup.zipcode}</h5>
                        </PickupInfo>
                    </React.Fragment>
                ) : (<React.Fragment>
                        <h5>clicked</h5>
                    </React.Fragment>
                    )}
            </Card>
        )
    }
}

const Card = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 1em; 
`
const StatusButton = styled.button`
    background-color: blue;
    width: 10%;
    border: none;
    :hover{
        background-color: red;
      }
`

const PickupInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default PickupCard