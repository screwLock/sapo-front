import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Cell } from "styled-css-grid"
import { format, isSameDay } from 'date-fns'
import './styles/pickups.css'
import OverviewCard from './OverviewCard.js'
import { Card, Button, Overlay, Classes, Elevation } from '@blueprintjs/core'
import { makeDailyPickupsPDF } from './PickupPDFMake'
import { CustomerCallIn } from './CustomerCallIn'

class OverviewPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOverlayOpen: false
        }
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
                                isOpen={this.state.isOpen}
                            />
                        )}
                    </Draggable>
                </Cell>
            );
        });
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
        if(this.state.isOpen) {
            return "Close All"
        }
        return "Open All"
    }

    renderFooter = () => {
        return (
            <div className="footer">
                <Button minimal="false" onClick={this.toggleOverlay} rightIcon="phone">Customer Call In</Button>
                    <CustomerCallIn isOverlayOpen={this.state.isOverlayOpen} onClose={this.toggleOverlay}/>
                <Button minimal="false" onClick={makeDailyPickupsPDF} rightIcon="document" id="createPDF">Convert to PDF</Button>
            </div>
        )
    }

    handleOpenAllClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    toggleOverlay = () => {
        this.setState({isOverlayOpen: !this.state.isOverlayOpen})
    }

    onDragEnd = () => {
        //TODO
    };

    render() {
        return (
            <div className="pickups">
                {this.renderHeader()}
                <div className="cards">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="dropabble">
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
                </div>
                {this.renderFooter()}
            </div>
        );
    }
}

export default OverviewPickups;