import * as React from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { format, isSameDay } from 'date-fns'
import PickupCard from './PickupCard'
import PickupContainer from './PickupContainer'


class Pickups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDragDisabled: false,
            isACardTabOpen: false,
            isPickupInfoOpen: false,
            isCustomerCallInOpen: false,
            isPickupContainerOpen: false,
        }
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

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    changeIsDragDisabled = (boolean) => {
        this.setState({ isDragDisabled: boolean })
    }
    changeIsACardTabOpen = (boolean) => {
        this.setState({ isACardTabOpen: boolean })
    }
    changeIsPickupInfoOpen = (boolean) => {
        this.setState({ isPickupInfoOpen: boolean })
    }
    changeIsCustomerCallInOpen = (boolean) => {
        this.setState({ isCustomerCallInOpen: boolean })
    }

    changeIsPickupContainerOpen = (boolean) => {
        this.setState({ isPickupContainerOpen: boolean })
    }

    renderCards = (pickups) => {
        if (pickups.length > 0) {
            return pickups.map((pickup, index) => {
                return (
                    <Draggable draggableId={pickup.pickupID} index={pickup.index} isDragDisabled={this.state.isDragDisabled}>
                        {(provided, snapshot) => (
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
                                changeIsDragDisabled={this.changeIsDragDisabled}
                                isDragDisabled={this.state.isDragDisabled}
                                changeIsACardTabOpen={this.changeIsACardTabOpen}
                                isACardTabOpen={this.state.isACardTabOpen}
                                changeIsPickupContainerOpen={this.changeIsPickupContainerOpen}
                                selectPickup={this.props.selectPickup(pickup)}
                            />
                        )}
                    </Draggable>
                );
            });
        } else {
            return (
                <div>No Pickups for {format(this.props.selectedDate, 'MM/DD/YYYY')}</div>
            )
        }
    }

    render() {
        const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.props.selectedDate))
        const routePickups = datePickups.filter(pickup => pickup.inRoute === true)
        const selectedPickup = this.props.selectedPickup
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="dropabble" direction="vertical">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                                style={ListContainer(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                <h1>{format(this.props.selectedDate, 'dddd Do, YYYY')}</h1>
                                <h5 onClick={() => {this.props.changeView('customerCallIn')}}>New Pickup</h5>
                                {
                                    !this.state.isPickupContainerOpen
                                        ? this.renderCards(datePickups)
                                        :
                                        (
                                            <PickupContainer
                                                pickup={selectedPickup}
                                                changeIsPickupContainerOpen={this.changeIsPickupContainerOpen}
                                                userConfig={this.props.userConfig}
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