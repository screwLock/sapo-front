import * as React from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import { IPickup } from './types/pickup';
import styled from 'styled-components';

interface IPickupMarkerProps {
    streetAddress: string;
    pickup: IPickup;
    selectedPickup: IPickup;
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
                <Info>{this.props.pickup.streetAddress}</Info>
            </Popover>

        );
    }

    public handleClick=()=>{
        this.props.onClick(this.props.pickup)
     };
}

const Info = styled.div`
    padding: 5px;
`
export default PickupMarker;