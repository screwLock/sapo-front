import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Cell } from "styled-css-grid";
import { isSameDay } from 'date-fns';

import OverviewCard from './OverviewCard.js';

class OverviewPickups extends Component {
    constructor(props) {
        super(props);
    };

    renderCards = () => {
        const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.date, this.props.selectedDate));
        return datePickups.map((pickup) => {
                return (
                    <Cell height={1} width={4} left={2}>
                        <Draggable key={pickup.lat} draggableId={pickup.lat}>
                            {(provided) => (
                                <OverviewCard pickup={pickup}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    handleClick={this.props.handleClick}
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
                            <div innerRef={provided.innerRef} ref={provided.innerRef}>
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