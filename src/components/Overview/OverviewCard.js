import React, { Component } from 'react';
import { Button, Card, Checkbox, Collapse, Elevation, H5 } from "@blueprintjs/core";
import { Draggable } from 'react-beautiful-dnd';

class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isChecked: this.props.pickup.inRoute
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isAllOpen !== this.props.isAllOpen) {
            this.setState({ isOpen: this.props.isAllOpen });
        }
    }
    render() {
        const { provided, innerRef, pickup } = this.props;
        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                <Card interactive={true} elevation={Elevation.TWO} className={'card'}>
                    <H5 onClick={this.handleClick}>{this.props.pickup.name}</H5>
                    <Checkbox
                        label="Include In Route"
                        checked={this.state.isChecked}
                        inline={true}
                        onChange={this.handleCheckedChange}
                    />
                    <Collapse isOpen={this.state.isOpen} transitionDuration={1}>
                        <pre>
                            {this.props.pickup.name}
                        </pre>
                    </Collapse>
                </Card>
            </div>
        );
    }
    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.handleClick(this.props.pickup);
    }

    handleCheckedChange = ()  => {
        this.setState({isChecked: !this.state.isChecked})
        this.props.handleRouteChange(this.props.index);       
    }

}

export default OverviewCard;