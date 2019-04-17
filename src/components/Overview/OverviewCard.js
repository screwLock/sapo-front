import React, { Component } from 'react'
import { Button, Card, Checkbox, Collapse, Elevation, H5 } from "@blueprintjs/core"
import { StyledCard} from './styles/StyledCard'
import { Draggable } from 'react-beautiful-dnd'

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

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
      };

    render() {
        const { provided, innerRef, pickup } = this.props;
        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={this.setRef}
            >
                <StyledCard interactive={true} elevation={Elevation.TWO} className={'card'}>
                    <H5 className={'cardHeader'} onClick={this.handleClick}>{this.props.pickup.name}</H5>
                    <Checkbox
                        label="Include In Route"
                        checked={this.state.isChecked}
                        inline={true}
                        onChange={this.handleCheckedChange}
                    />
                    <Collapse isOpen={this.state.isOpen} transitionDuration={1}>
                        <div>{this.props.pickup.name}</div>
                        <div>Contact: </div>
                        <div>Address: </div>
                        <div>Order: </div>
                    </Collapse>
                </StyledCard>
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