import * as React from 'react';

class PickupInfo extends React.Component {
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
            this.props.changeIsPickupInfoOpen(false)
        }
    }

    render() {
        const pickup = this.props.pickup
        return (
            <div
                ref={this.setWrapperRef}
            >
                <h3>{pickup.lastName}, {pickup.firstName}</h3>
                <h3>{pickup.streetAddress}, {pickup.zipcode}</h3>
                <h5>{pickup.phoneNumber}</h5>
                <h5>{pickup.email}</h5>
            </div>
        )
    }
}

export default PickupInfo