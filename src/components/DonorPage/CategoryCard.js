import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Draggable } from 'react-beautiful-dnd';

class CategoryCard extends Component {
    render() {
        const { provided, innerRef, snapshot } = this.props;

        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                <Card interactive={true} elevation={Elevation.TWO}>
                    <h5>{this.props.item.content}</h5>
                </Card>
            </div>
        );
    }
}

export default CategoryCard;