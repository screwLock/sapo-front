import * as React from 'react';
import "./styles/pickupMarker.css"

interface IPickupMarkerProps {
    name: string;
}

class PickupMarker extends React.Component<IPickupMarkerProps, any> {    
    constructor(props: IPickupMarkerProps) {
        super(props)
    }



    public render() {
        return (
            <div className="marker">
                {this.props.name}
            </div>
        );
    }
}

export default PickupMarker;