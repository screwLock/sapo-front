import * as React from 'react';
import Pickup from './Pickup';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';

interface IPickupMarkerProps {
    name: string;
    pickup: Pickup;
    selectedPickup: Pickup;
    onClick: any;
}

class PickupMarker extends React.Component<IPickupMarkerProps, any> {
    constructor(props: IPickupMarkerProps) {
        super(props)
    }



    public render() {
        let classes = 'marker';
        if (this.props.pickup === this.props.selectedPickup) {
            classes += ' selected';
        }

        return (
            <Popover interactionKind={PopoverInteractionKind.HOVER}>
            <div onClick={this.handleClick}><div className={classes} /><div className="pulse" /></div>
            <div>{this.props.name}</div>
            </Popover>

        );
    }

    public handleClick=()=>{
        this.props.onClick(this.props.pickup)
     };
}

export default PickupMarker;