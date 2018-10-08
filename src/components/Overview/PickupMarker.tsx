import * as React from 'react';
import Pickup from './Pickup';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';

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
            <Popover interactionKind={PopoverInteractionKind.HOVER}>
            <div><div className={classes} /><div className="pulse" /></div>
            <div>{this.props.name}</div>
            </Popover>

        );
    }
}

export default PickupMarker;