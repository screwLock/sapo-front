import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Draggable } from 'react-beautiful-dnd';
import Pickup from './Pickup';

class OverviewCard extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        const { provided, innerRef, pickup } = this.props;

        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                onClick={this.handleClick}
            >
                <Card interactive={true} elevation={Elevation.TWO} >
                    <Pickup name ={pickup.name}
                            lat = {pickup.lat}
                            lng = {pickup.lng}
                    />

                </Card>
            </div>
        );
    }
    handleClick=()=>{
        this.props.handleClick(this.props.pickup)
     };
}

export default OverviewCard;