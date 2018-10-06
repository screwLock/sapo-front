import * as React from 'react';
import Pickup from './Pickup';
import "./styles/pickupMarker.css"

interface IPickupMarkerProps {
    name: string;
    selectedPickup: Pickup;
}

class PickupMarker extends React.Component<IPickupMarkerProps, any> {    
    constructor(props: IPickupMarkerProps) {
        super(props)
    }



    public render() {
        let classes='marker';
        if(this.props.selectedPickup){
            classes+= ' selected';
        }
        return (
            <div className={classes}>
                {this.props.name}
            </div>
        );
    }
}

export default PickupMarker;