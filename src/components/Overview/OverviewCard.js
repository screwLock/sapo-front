import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Draggable } from 'react-beautiful-dnd';

class OverviewCard extends Component {
    render() {
        const { provided, innerRef } = this.props;

        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                <Card interactive={true} elevation={Elevation.TWO}>
                    <h5>{this.props.pickup.name}</h5>
                    <h5>{this.props.pickup.id}</h5>
                    <h5>{this.props.pickup.address}</h5>
                </Card>
            </div>
        );
    }
}

export default OverviewCard;