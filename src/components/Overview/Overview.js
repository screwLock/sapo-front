import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import OverviewMap from './OverviewMap.js';
import OverviewPickups from './OverviewPickups.js';
import OverviewDatePicker from './OverviewDatePicker.js';
import pickupMocks from './mocks/pickupMocks';
import { userMocks } from './mocks/userMocks.js'

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickups: [],
      allPickups: [],
      selectedPickup: null,
      selectedDate: new Date(),
      user: {},
      search: ''
    }
  }

  componentDidMount() {
    this.setState({
      pickups: pickupMocks,
      allPickups: pickupMocks,
      user: userMocks
    })
  }
  render() {
    return (
      <Grid columns={12}>
        <Cell width={12}><OverviewMap pickups={this.state.pickups} 
                                      selectedDate={this.state.selectedDate} 
                                      selectedPickup={this.state.selectedPickup}
                                      onClick={this.selectPickup}
                                      user={this.state.user}
                                      center={{'lat': this.state.user.lat, 'lng': this.state.user.lng}}
                                      zoom={9}
                                      />
        </Cell>
        <Cell width={4}><OverviewDatePicker selectedDate={this.state.selectedDate} handleClick={this.selectDate}/></Cell>
        <Cell width={7}><OverviewPickups pickups={this.state.pickups} handleClick={this.selectPickup} selectedDate={this.state.selectedDate}/></Cell>
        </Grid>
    );
  }

  selectPickup = (pickup) => {
    this.setState({
      selectedPickup: pickup
    })
  };
  selectDate = (date) => {
    this.setState({
      selectedDate: date
    })
  };
}

export default Overview;