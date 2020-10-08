import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@blueprintjs/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { format, isSameDay } from 'date-fns'
import PickupCard from './PickupCard'
import PickupContainer from './PickupContainer'
import EmployeeSelect from '../CustomerCallIn/EmployeeSelect'
import { API } from "aws-amplify"
import { AppToaster } from '../../Toaster'

const Pickups = props => {
    let pickupsInitialState = {
        isACardTabOpen: false,
        isPickupInfoOpen: false,
        isCustomerCallInOpen: false,
        isPickupContainerOpen: false,
        isSendDirectionsOpen: false,
    }

    const [isACardTabOpen, setIsACardTabOpen] = useState(false)
    const [isPickupInfoOpen, setIsPickupInfoOpen] = useState(false)
    const [isCustomerCallInOpen, setIsCustomerCallInOpen] = useState(false)
    const [isPickupContainerOpen, setIsPickupContainerOpen] = useState(false)
    const [isSendDirectionsOpen, setIsSendDirectionsOpen] = useState(false)


    const showToast = (message) => {
        AppToaster.show({ message: message });
    }

    const callAPI = (pickups) => {
        API.put("sapo", "/routing", {
            body: pickups
        }).then(response => {
            // ??? updateRoutes
            // also look up ordinal prop on pickup cards
            showToast(`Route Saved`)
        }).catch(error => {
            showToast('ERROR: Pickup Not Updated!')
            console.log(error)
        })
    }

    const sendEmailDirections = () => {
        const driver = props.selectedDriver
        if(Object.entries(driver).length !== 0){
            API.post("sapo", '/routing', {
                body: {
                    email: driver.email,
                    pickups: props.pickups,
                    user: props.user
                }
            }).then(response => {
                showToast('Successfully Saved!')
            }).catch(error => {
                showToast(`Save Failed`)
            })
        }
        else {
            // this should probably be removed
            this.showToast('You need to select a driver to send routes to')
        }
    }

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

    const handleEmployeeSelect = (employee, action) => {
        switch (action.action) {
            case 'select-option':
                props.setSelectedDriver(employee.value);
                break;
            case 'clear':
                props.setSelectedDriver(null)
                break;
        }
    }

    const changeIsSendDirectionsOpen = (boolean) => {
        setIsSendDirectionsOpen(boolean)
        props.setSelectedDriver(null)
    }

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
                                selectedDriver={props.selectedDriver}
                                innerRef={provided.innerRef}
                                provided={provided}
                                handleClick={props.handleClick}
                                handleRouteChange={props.handleRouteChange}
                                userConfig={props.userConfig}
                                changeIsACardTabOpen={changeIsACardTabOpen}
                                isACardTabOpen={isACardTabOpen}
                                changeIsPickupContainerOpen={changeIsPickupContainerOpen}
                                selectPickup={props.selectPickup(pickup)}
                                updatePickups={props.updatePickups}
                                pickups={props.pickups}
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

    // need to sort datePickups by driver then index
    // using email because its required and should be unique
    // should probably only be used on component mount
    const sort = (x, y) => {
        if (x.inRoute === null) return -1;
        else if (y.inRoute === null) return 1
        else {
            return x.inRoute.lastName - y.inRoute.lastName
        }
    }

    // if there is a routeOrdinal that is non null,
    // and inRoute is null,
    // that means the inRoute was unset.
    // we should send these null

    const datePickups = props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, props.selectedDate))
    const routePickups = props.selectedDriver ? datePickups.filter(pickup => pickup.inRoute).filter(pickup => pickup.inRoute.lastName === props.selectedDriver.lastName) : null
    const uncheckedPickups = datePickups.filter((pickup) => ((pickup.inRoute == null) && (pickup.routeOrdinal != null)))
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
                            <ButtonRow>
                                <ButtonIcon onClick={() => { props.changeView('customerCallIn') }} icon='add' iconSize={25} />
                                <ButtonIcon onClick={() => { if (datePickups.length > 0) { props.showMap(true); changeIsSendDirectionsOpen(true); } else return; }} icon='path-search' iconSize={25} disabled={!(datePickups.length > 0)} />
                                <ButtonIcon onClick={() => { props.showMap(false); changeIsSendDirectionsOpen(false); }} icon='calendar' iconSize={25} />
                            </ButtonRow>
                            {(isSendDirectionsOpen) ?
                                (
                                    <SendDirectionsContainer>
                                        <EmployeeSelect
                                            employees={props.userConfig.employees}
                                            onChange={handleEmployeeSelect}
                                            selectedEmployee={props.selectedDriver}
                                        />
                                        {props.selectedDriver ?
                                            (
                                                <SpanRow>
                                                    <span><ButtonIcon icon='envelope' iconSize={25} onClick={() => sendEmailDirections(props.selectedDriver)}/></span>
                                                    <span><ButtonIcon onClick={() => { props.createRoute() }} icon='map-create' iconSize={25} /></span>
                                                    <span><ButtonIcon onClick={() => { callAPI([...uncheckedPickups, ...routePickups]) }} icon='upload' iconSize={25} /></span>
                                                </SpanRow>
                                            ) : (
                                                <SpanRow>
                                                    <span>No Driver Selected</span>
                                                </SpanRow>
                                                // onSubmit, send pickups in route with index of routePickups
                                                // need pickupID, 'driver', routeIndex === index in routePickups
                                            )
                                        }
                                    </SendDirectionsContainer>
                                ) :
                                ''
                            }
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

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
`

const SpanRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 1.0em;
`

const ButtonIcon = styled(Icon)`
    cursor: pointer;
    color: ${props => props.disabled ? '#d3d3d3' : 'black'};
`

const SendDirectionsContainer = styled.div`
    margin: 1.5em;
    width: 50%;
`

export default Pickups