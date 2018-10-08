import * as React from 'react';
import Pickup from './Pickup';

interface IPickupMarkerProps {
    name: string;
    selectedPickup: Pickup;
}

class PickupMarker extends React.Component<IPickupMarkerProps, any> {
    constructor(props: IPickupMarkerProps) {
        super(props)
    }



    public render() {
        let classes = 'marker';
        if (this.props.selectedPickup) {
            classes += ' selected';
        }

        return (
            <div>
                <div className={classes} />
                <div className="pulse" />
            </div>

        );
    }
}

export default PickupMarker;