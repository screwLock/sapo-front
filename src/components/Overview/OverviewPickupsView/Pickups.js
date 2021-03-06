import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { format, isSameDay } from 'date-fns'
import PickupCard from './PickupCard'
import PickupContainer from './PickupContainer'

const Pickups = props => {
    let pickupsInitialState = {
        isACardTabOpen: false,
        isPickupInfoOpen: false,
        isCustomerCallInOpen: false,
        isPickupContainerOpen: false,
    }

    const [isACardTabOpen, setIsACardTabOpen] = useState(false)
    const [isPickupInfoOpen, setIsPickupInfoOpen] = useState(false)
    const [isCustomerCallInOpen, setIsCustomerCallInOpen] = useState(false)
    const [isPickupContainerOpen, setIsPickupContainerOpen] = useState(false)



    const onDragEnd = result => {
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

        const pickups = reorder(
            props.pickups,
            result.source.index,
            result.destination.index
        );

        props.onDragEnd(pickups);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const changeIsACardTabOpen = (boolean) => {
        setIsACardTabOpen(boolean)
    }
    const changeIsPickupInfoOpen = (boolean) => {
        setIsPickupInfoOpen(boolean)
    }
    const changeIsCustomerCallInOpen = (boolean) => {
        setIsCustomerCallInOpen(boolean)
    }
    const changeIsPickupContainerOpen = (boolean) => {
        setIsPickupContainerOpen(boolean)
    }

    const renderCards = (pickups) => {
        if (pickups.length > 0) {
            return pickups.map((pickup, index) => {
                return (
                    <Draggable draggableId={pickup.pickupID} index={pickup.index} >
                        {(provided, snapshot) => (
                            <PickupCard pickup={pickup}
                                isChecked={pickup.inRoute}
                                ordinal={index}
                                // setIndex={this.handleStatusIndexChange}
                                //use pickups index, not datepickups index!
                                index={pickup.index}
                                routes={props.routes}
                                innerRef={provided.innerRef}
                                provided={provided}
                                handleClick={props.handleClick}
                                handleRouteChange={props.handleRouteChange}
                                userConfig={props.userConfig}
                                changeIsACardTabOpen={changeIsACardTabOpen}
                                isACardTabOpen={isACardTabOpen}
                                changeIsPickupContainerOpen={changeIsPickupContainerOpen}
                                selectPickup={props.selectPickup(pickup)}
                            />
                        )}
                    </Draggable>
                );
            });
        } else {
            return (
                <div>No Pickups for {format(props.selectedDate, 'MM/DD/YYYY')}</div>
            )
        }
    }

    const datePickups = props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, props.selectedDate))
    const routePickups = datePickups.filter(pickup => pickup.inRoute === true)
    const selectedPickup = props.selectedPickup
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dropabble" direction="vertical">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                            style={ListContainer(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            <h1>{format(props.selectedDate, 'dddd Do, YYYY')}</h1>
                            <h5 onClick={() => { props.changeView('customerCallIn') }}>New Pickup</h5>
                            <h5 onClick={() => { props.showMap(); props.createRoute() }}>See Route</h5>
                            {
                                !isPickupContainerOpen
                                    ? renderCards(datePickups)
                                    :
                                    (
                                        <PickupContainer
                                            pickup={selectedPickup}
                                            changeIsPickupContainerOpen={changeIsPickupContainerOpen}
                                            userConfig={props.userConfig}
                                        />
                                    )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    )
}

const ListContainer = isDraggingOver =>
    isDraggingOver ?
        ({
            background: '#F8F8F8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 8,
            overflow: 'auto',
            height: '100%'
        }) :
        ({
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 8,
            overflow: 'auto',
            height: '100%'
        })

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 16 * 2,
    margin: `0 16px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

export default Pickups