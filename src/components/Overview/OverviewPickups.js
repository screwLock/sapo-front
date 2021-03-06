import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Cell } from "styled-css-grid"
import { format, isSameDay } from 'date-fns'
import OverviewCard from './OverviewCard.js'
import { Button } from '@blueprintjs/core'
import styled from 'styled-components'
import { makeDailyPickupsPDF } from './PickupPDFMake'
import { CustomerCallIn } from './CustomerCallIn/CustomerCallIn'
import StatusDialog from './StatusDialog'
import SendDirectionsDialog from './SendDirectionsDialog.js';

class OverviewPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllOpen: false,
            isOverlayOpen: false,
            isStatusOpen: false,
            statusIndex: '',
            isSendDirectionsOpen: false
        }
    };

    renderCards = (pickups) => {
        if (pickups.length > 0) {
            return pickups.map((pickup, index) => {
                return (
                    <Cell height={1} width={4} left={2} key={pickup.pickupID}>
                        <Draggable draggableId={pickup.pickupID} index={pickup.index}>
                            {(provided) => (
                                <OverviewCard pickup={pickup}
                                    isChecked={pickup.inRoute}
                                    ordinal={index}
                                    handleStatusOpen={this.handleStatusClick}
                                    setIndex={this.handleStatusIndexChange}
                                    //use pickups index, not datepickups index!
                                    index={pickup.index}
                                    routes={this.props.routes}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    handleClick={this.props.handleClick}
                                    isAllOpen={this.state.isAllOpen}
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

    renderHeader = () => {
        return (
            <Header>
                <h3>Pickups for {format(this.props.selectedDate, 'MM/DD/YYYY')}</h3>
                <HeaderButtons>
                    <Button minimal="false" onClick={this.handleOpenAllClick} rightIcon="eye-open" id="openAll">
                        {this.renderOpenAllButton()}
                    </Button>
                    <Button minimal="false" onClick={this.props.handleRefresh} icon='refresh' text='Refresh' />
                </HeaderButtons>
            </Header>
        )
    }

    renderOpenAllButton = () => {
        if (this.state.isAllOpen) {
            return "Close All"
        }
        return "Open All"
    }

    // in renderFooter(), a key was added to CustomerCallIn to ensure categories is set when loaded or changed

    renderFooter = (routePickups) => {
        if (Object.keys(this.props.userConfig).length > 0) {
            return (
                <Footer>
                    <Button minimal="false" onClick={this.toggleOverlay} rightIcon="phone">Customer Call In</Button>
                    <CustomerCallIn isOverlayOpen={this.state.isOverlayOpen} onClose={this.toggleOverlay} userConfig={this.props.userConfig} exceededDays={this.props.exceededDays}/>
                    <Button minimal="false" onClick={this.handleSendDirectionsClick(routePickups)} rightIcon="document" id="createPDF">Dispatch Routes</Button>
                    <Button minimal="false" onClick={()=>{this.props.updateNewRoute(true)}} rightIcon="map-create">Preview Route On Map</Button>
                </Footer>
            )
        }
        else {
            return (
                <div>Loading...</div>
            )
        }
    }

    handleSendDirectionsClick = (pickups) => () => {
        // don't create if no pickups
        if (pickups.length === 0 ||
            this.props.userConfig.employees == null ||
            this.props.userConfig.employees.length === 0
        ) {
            return false;
        }
        this.setState({ isSendDirectionsOpen: !this.state.isSendDirectionsOpen })
    }

    handleStatusClick = () => {
        this.setState({ isStatusOpen: !this.state.isStatusOpen })
    }

    handleStatusIndexChange = (index) => {
        this.setState({ statusIndex: index })
    }

    handleOpenAllClick = () => {
        this.setState({ isAllOpen: !this.state.isAllOpen });
    }

    toggleOverlay = () => {
        this.setState({ isOverlayOpen: !this.state.isOverlayOpen })
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

    render() {
        const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.props.selectedDate))
        const routePickups = datePickups.filter(pickup => pickup.inRoute === true)

        return (
            <React.Fragment>
                <SendDirectionsDialog
                    isOpen={this.state.isSendDirectionsOpen}
                    handleOpen={this.handleSendDirectionsClick(routePickups)}
                    userConfig={this.props.userConfig}
                    pickups={routePickups}
                    user={this.props.user}
                />
                <StatusDialog
                    isOpen={this.state.isStatusOpen}
                    handleOpen={this.handleStatusClick}
                    pickups={this.props.pickups}
                    index={this.state.statusIndex}
                    updatePickups={this.props.updatePickups}
                    userConfig={this.props.userConfig}
                    payload={this.props.payload}
                />
                <Pickups>
                    {this.renderHeader()}
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
                    {this.renderFooter(routePickups)}
                </Pickups>
            </React.Fragment>
        );
    }
}

const Header = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
`

const Footer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-self: flex-start;
`

const Pickups = styled.div`
    display: flex;
    flex-direction: column;
`

const Cards = styled.div`
    overflow-y: auto;
    height: 250px;
    padding-top: 10px;
    padding-bottom: 10px;
`

export default OverviewPickups;