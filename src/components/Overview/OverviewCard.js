import React, { Component } from 'react'
import { Button, Card, Checkbox, Collapse, Elevation, H5, Icon } from "@blueprintjs/core"
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { getConfirmation } from 'history/DOMUtils';

class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isAllOpen !== this.props.isAllOpen) {
            this.setState({ isOpen: this.props.isAllOpen });
        }
    }

    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.handleClick(this.props.pickup);
    }

    handleCheckedChange = () => {
        this.props.handleRouteChange(this.props.index);       
    }

    handleStatusClick = (index) => () => {
        this.props.setIndex(index)
        this.props.handleStatusOpen()
    }

    setIcon = (pickup) => {
        if(pickup.status === 'submitted'){
            return 'issue'
        }
        else if(pickup.status === 'confirmed'){
            return 'tick'
        }
        else if(pickup.status === 'completed'){
            return 'tick-circle'
        }
        else if(pickup.status === 'canceled'){
            return 'disable'
        }
        else if(pickup.status === 'rejected'){
            return 'delete'
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
                    <H5 className={'cardHeader'} 
                        onClick={this.handleClick}>
                        {`${this.props.ordinal + 1}) ${this.props.pickup.streetAddress}, ${this.props.pickup.zipcode} `} 
                        <Icon icon={this.setIcon(this.props.pickup)}/>
                    </H5>
                    <H5>{`${this.props.pickup.lastName}, ${this.props.pickup.firstName}`}</H5>
                    <Checkbox
                        label="Include In Route"
                        checked={this.props.isChecked}
                        inline={true}
                        onChange={this.handleCheckedChange}
                    />
                    <Status onClick={this.handleStatusClick(this.props.index)}>Change Status</Status>
                    <Collapse isOpen={this.state.isOpen} transitionDuration={1}>
                        <div>Contact Name: {`${this.props.pickup.lastName}, ${this.props.pickup.firstName}`}</div>
                        <div>Contact Number: {this.props.pickup.phoneNumber}</div>
                        <div></div>
                        <div>Order: 
                            <ul>{this.props.pickup.donations.map(donation => (<li key={donation}>{donation}</li>))}</ul>
                        </div>
                    </Collapse>
                </StyledCard>
            </div>
        );
    }

}

const Status = styled.div`
    &:hover {
        font-weight: bold;
        color: blue;
    }
`
const StyledCard = styled(Card)`
    color: black;

    .cardHeader:hover {
        font-weight: bold;
        color: blue;
    }
`


export default OverviewCard;