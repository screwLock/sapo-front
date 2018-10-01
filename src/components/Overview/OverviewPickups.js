import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Cell } from "styled-css-grid";

import OverviewCard from './OverviewCard.js';
import pickupMocks from './mocks/pickupMocks.js';

class OverviewPickups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickups: []
        };
    };


    componentDidMount() {
        //fetch('https://api.mydomain.com')
        //  .then(response => response.json())
        //  .then(data => this.setState({ data }));
        this.setState({ pickups: pickupMocks });
    }

    renderCards() {
        return this.state.pickups.map((pickup) => {
            return (
                <Cell height={1} width={4} left={2}>
                    <Draggable key={pickup.id} draggableId={pickup.id}>
                        {(provided) => (
                            <OverviewCard pickup={pickup} 
                                          innerRef={provided.innerRef}
                                          provided={provided}
                            /> 
                        )}
                    </Draggable>
                </Cell>
            );
        });
    }

    onDragEnd = () => {
        //TODO
    };
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="dropabble" >
                    {(provided) => (
                    <div innerRef={provided.innerRef}  ref={provided.innerRef}>
                    <Grid columns={6}>
                        {this.renderCards()}
                        {provided.placeholder}
                    </Grid>
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default OverviewPickups;