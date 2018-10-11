import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Cell } from "styled-css-grid";
import { format, isSameDay } from 'date-fns';
import './styles/pickups.css';
import OverviewCard from './OverviewCard.js';
import { Button } from '@blueprintjs/core';
import { makeDailyPickupsPDF } from './PickupPDFMake';

class OverviewPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAll: false
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
                                openAll={this.state.openAll}
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
                <Button minimal="false" onClick={this.handleOpenAllClick} rightIcon="eye-open" id="openAll">Open All</Button>
            </div>
        )
    }

    renderFooter = () => {
        return (
            <div className="footer">
                <Button minimal="false" onClick={makeDailyPickupsPDF} rightIcon="document" id="createPDF">Convert to PDF</Button>
            </div>
        )
    }

    handleOpenAllClick = () => {
        this.setState({ openAll: !this.state.openAll });
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