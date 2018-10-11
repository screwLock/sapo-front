import React, { Component } from 'react';
import { Button, Card, Collapse, Elevation, H5 } from "@blueprintjs/core";
import { Draggable } from 'react-beautiful-dnd';

class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    };
    render() {
        const { provided, innerRef, pickup } = this.props;
        const open = this.props.openAll || this.state.isOpen;
        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                onClick={this.handleClick}
            >
                <Card interactive={true} elevation={Elevation.TWO} >
                    <H5>{this.props.pickup.name}</H5>
                    <Collapse isOpen={open} transitionDuration={1}>
                        <pre>
                            {this.props.pickup.name}
                        </pre>
                    </Collapse>
                </Card>
            </div>
        );
    }
    handleClick = ()=> {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.handleClick(this.props.pickup);
     };

}

export default OverviewCard;