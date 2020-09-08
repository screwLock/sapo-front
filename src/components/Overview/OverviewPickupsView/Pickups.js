import * as React from 'react'
import { Card, Checkbox, Collapse, Elevation, H5, Icon } from "@blueprintjs/core"
import styled from 'styled-components'
import { Grid, Cell } from "styled-css-grid";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { format, isSameDay } from 'date-fns'
import PickupCard from './PickupCard'


class Pickups extends React.Component {
    constructor(props) {
        super(props)
    }

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        // shouldn't reorder if nothing changed!
        if (result.destination.droppableId === result.source.droppableID &&
            result.destination.index === result.source.index
        ) {
            return;
        }

        const pickups = this.reorder(
            this.props.pickups,
            result.source.index,
            result.destination.index
        );

        this.props.onDragEnd(pickups);
    };

    renderCards = (pickups) => {
        if (pickups.length > 0) {
            return pickups.map((pickup, index) => {
                return (
                    <Cell height={10} width={4} left={2} key={pickup.pickupID}>
                        <Draggable draggableId={pickup.pickupID} index={pickup.index}>
                            {(provided) => (
                                <PickupCard pickup={pickup}
                                    isChecked={pickup.inRoute}
                                    ordinal={index}
                                    // setIndex={this.handleStatusIndexChange}
                                    //use pickups index, not datepickups index!
                                    index={pickup.index}
                                    routes={this.props.routes}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    handleClick={this.props.handleClick}
                                    handleRouteChange={this.props.handleRouteChange}
                                    userConfig={this.props.userConfig}
                                />
                            )}
                        </Draggable>
                    </Cell>
                );
            });
        } else {
            return (
                <Cell height={1} width={4} left={2}>No Pickups for {format(this.props.selectedDate, 'MM/DD/YYYY')}</Cell>
            )
        }
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    render() {
        const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.props.selectedDate))
        const routePickups = datePickups.filter(pickup => pickup.inRoute === true)
        return (
            <Cards>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="dropabble">
                        {(provided) => (
                            <div ref={provided.innerRef}>
                                <Grid columns={6}>
                                    {this.renderCards(datePickups)}
                                    {provided.placeholder}
                                </Grid>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Cards>
        )
    }
}

const Cards = styled.div`
    overflow-y: auto;
    height: 250px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
`

export default Pickups