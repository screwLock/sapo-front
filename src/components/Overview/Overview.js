import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";
import produce from 'immer';
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
      newRoute: false,
      search: ''
    }
  }

  componentDidMount() {
    const addedRoutes = pickupMocks.map(pickup => pickup.inRoute = false)
    this.setState({
      pickups: pickupMocks,
      allPickups: addedRoutes,
      user: userMocks
    })
  }

  createRoute = () => {
    this.setState({newRoute: !this.state.newRoute});
  }

  render() {
    return (
      <Grid columns={12}>
        <Cell width={12}><OverviewMap pickups={this.state.pickups}
          selectedDate={this.state.selectedDate}
          selectedPickup={this.state.selectedPickup}
          onClick={this.selectPickup}
          user={this.state.user}
          center={{ 'lat': this.state.user.lat, 'lng': this.state.user.lng }}
          zoom={9}
          routeKey={this.state.newRoute}
        />
        </Cell>
        <Cell width={4}><OverviewDatePicker selectedDate={this.state.selectedDate} handleClick={this.selectDate} /></Cell>
        <Cell width={7}><OverviewPickups pickups={this.state.pickups}
          user={this.state.user}
          routes={this.state.routes}
          handleClick={this.selectPickup}
          selectedDate={this.state.selectedDate}
          onDragEnd={this.onDragEnd}
          handleRouteChange={this.handleRouteChange}
          createRoute={this.createRoute}
        />
        </Cell>
      </Grid>
    );
  }

  onDragEnd = (pickups) => {
    this.setState({
      pickups,
    });
  };

  selectPickup = (pickup) => {
    this.setState({
      selectedPickup: pickup
    })
  };

  handleRouteChange = (index) => {
    this.setState(
      produce(this.state, draft => {
        draft.pickups[index].inRoute = !draft.pickups[index].inRoute;
      }));
  }

  selectDate = (date) => {
    this.setState({
      selectedDate: date
    })
  };
}

export default Overview;