import * as React from 'react';

class PickupContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    //For detecting if a click was outside the pickupInfo container

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /*
    * We need to set a wrapper ref for clicking outside of the pickupInfo container
    */
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    /*
    * If there is a click outside the container, unmount the container and re-render the cards
    */
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.changeIsPickupContainerOpen(false)
        }
    }

    render() {
        const pickup = this.props.pickup
        return (
            <div
                ref={this.setWrapperRef}
            >
                <React.Fragment>
                    <h3>{pickup.lastName}, {pickup.firstName}</h3>
                    <h3>{pickup.streetAddress}, {pickup.zipcode}</h3>
                    <h5>{pickup.phoneNumber}</h5>
                    <h5>{pickup.email}</h5>
                    <h5>This pickup has been {pickup.status.toUpperCase()}</h5>
                    <div>Order:
                    {/* this is for early pickups when donations was an array instead of an object} */}
                        {/* from here on out, donations is an object with key-value pairs of name: qty */}
                        {/* should probably delete ALL pickups before 7/8/19 from dynamoDB */}
                        {Array.isArray(pickup.donations) ? (
                            <ul>{pickup.donations.map(donation => (<li key={donation}>{donation}</li>))}</ul>
                        ) : (<ul>{Object.entries(pickup.donations).map((kv) => {
                            return (<li key={kv[0]}>{`${kv[0]} - Qty: ${kv[1]}`}</li>)
                        })} </ul>
                            )}
                    </div>
                    <div>Pickup Details:
                            <ul>{pickup.serviceDetails.map(detail => {
                        return (<li key={detail}>{`${detail}`}</li>)
                    })
                        }</ul>
                    </div>
                    <div>Comments: {pickup.comments ? `${pickup.comments}` : 'None'}</div>
                    <div>Submitted By: {pickup.createdBy}</div>
                </React.Fragment>
            </div>
        )
    }
}

export default PickupContainer