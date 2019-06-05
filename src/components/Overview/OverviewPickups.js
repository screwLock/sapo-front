import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Cell } from "styled-css-grid"
import { format, isSameDay } from 'date-fns'
import './styles/pickups.css'
import OverviewCard from './OverviewCard.js'
import { Card, Button, Overlay, Classes, Elevation } from '@blueprintjs/core'
import { makeDailyPickupsPDF } from './PickupPDFMake'
import { CustomerCallIn } from './CustomerCallin/CustomerCallIn'

class OverviewPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllOpen: false,
            isOverlayOpen: false
        }
    };

    renderCards = () => {
        if (this.props.datePickups.length > 0) {
            return this.props.datePickups.map((pickup, index) => {
                return (
                    <Cell height={1} width={4} left={2} key={pickup.pickupID}>
                        <Draggable draggableId={pickup.pickupID} index={index}>
                            {(provided) => (
                                <OverviewCard pickup={pickup}
                                    isChecked={pickup.inRoute}
                                    // this is the problem
                                    // index should refer to this.props.pickups index
                                    // not datePickups index
                                    index={pickup.index}
                                    routes={this.props.routes}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    handleClick={this.props.handleClick}
                                    isAllOpen={this.state.isAllOpen}
                                    handleRouteChange={this.props.handleRouteChange}
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
            <div className="header">
                <h3>Pickups for {format(this.props.selectedDate, 'MM/DD/YYYY')}</h3>
                <Button minimal="false" onClick={this.handleOpenAllClick} rightIcon="eye-open" id="openAll">
                    {this.renderOpenAllButton()}
                </Button>
            </div>
        )
    }

    renderOpenAllButton = () => {
        if (this.state.isAllOpen) {
            return "Close All"
        }
        return "Open All"
    }

    // in renderFooter(), a key was added to CustomerCallIn to ensure categories is set when loaded or changed

    renderFooter = () => {
        if (Object.keys(this.props.userConfig).length > 0) {
            return (
                <div className="footer">
                    <Button minimal="false" onClick={this.toggleOverlay} rightIcon="phone">Customer Call In</Button>
                    <CustomerCallIn isOverlayOpen={this.state.isOverlayOpen} onClose={this.toggleOverlay} userConfig={this.props.userConfig} />
                    <Button minimal="false" onClick={makeDailyPickupsPDF(this.props.datePickups, this.props.user)} rightIcon="document" id="createPDF">Create Directions</Button>
                    <Button minimal="false" onClick={this.props.createRoute} rightIcon="map-create">Preview Route On Map</Button>
                </div>
            )
        }
        else {
            return (
                <div>You need to setup your donor page first!</div>
            )
        }
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
        return (
            <div className="pickups">
                {this.renderHeader()}
                <div className="cards">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="dropabble">
                            {(provided) => (
                                <div ref={provided.innerRef}>
                                    <Grid columns={6}>
                                        {this.renderCards()}
                                        {provided.placeholder}
                                    </Grid>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                {this.renderFooter()}
            </div>
        );
    }
}

export default OverviewPickups;