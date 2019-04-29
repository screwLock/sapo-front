import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";
import produce from 'immer';
import OverviewMap from './OLD_OverviewMap.js';
import OverviewPickups from './OverviewPickups.js';
import OverviewDatePicker from './OverviewDatePicker.js';
import pickupMocks from './mocks/pickupMocks';
import { userMocks } from './mocks/userMocks.js'
import { format, getMonth, getYear, lastDayOfMonth } from 'date-fns'
import { API, Auth } from "aws-amplify"
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickups: [],
      allPickups: [],
      selectedPickup: null,
      selectedDate: new Date(),
      selectedMonth: getMonth(new Date()),
      unconfirmedDates: [],
      user: {},
      newRoute: false,
      search: ''
    }
  }

  componentDidMount = async () => {
    if (!this.props.authState) {
      return;
    }
    let letlng = this.props.authData.signInUserSession.idToken.payload['custom:latlng']
    try {
      if (this.props.user.latlng.length !== 0) {
        /*
        const platform = new H.service.Platform({
          'app_id': 'u3uFI5c0XaweKx6Yh31t',
          'app_code': 'wUPW8ZhbclB20ZTwqRC4fA'
        });
        const geocoder = platform.getGeocodingService();

        let lat = ''
        let lng = ''
        let streetAddress = this.props.authData.signInUserSession.idToken.payload['custom:streetAddress']
        let zipcode = this.props.authData.signInUserSession.idToken.payload['custom:zipcode']
        //get the lat and lng from a geocoder call
        geocoder.geocode({ searchText: `${streetAddress + zipcode}` },
          (result) => {
            if (result.Response.View[0]) {
              lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
              lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
            }
          })
          const result = await Auth.updateUserAttributes(user, {
            'latLng': `${lat}:${lng}`
        });
        */
      }
      else {
        // grab the already created latitude and longitude
      }
      // let pickups = await this.getPickupsByMonth(startDate, endDate)

    } catch (e) {
      alert(e);
    }
  }

  createRoute = () => {
    this.setState({ newRoute: !this.state.newRoute });
  }

  getPickupsByMonth = () => {
    let currentMonth = this.state.selectedMonth
    let currentYear = getYear(new Date())
    let endDate = lastDayOfMonth(new Date(currentYear, currentMonth + 1)).toISOString().substr(0, 10)
    let startDate = new Date(currentYear, currentMonth - 1, 1).toISOString().substr(0, 10)
    return API.get("sapo", "/pickups");
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
        <Cell width={4}><OverviewDatePicker selectedDate={this.state.selectedDate}
          handleClick={this.selectDate}
          handleMonthChange={this.handleMonthChange}
          selectedMonth={this.state.selectedMonth}
        /></Cell>
        <Cell width={7}><OverviewPickups pickups={this.state.pickups}
          user={this.state.user}
          routes={this.state.routes}
          handleClick={this.selectPickup}
          selectedDate={this.state.selectedDate}
          onDragEnd={this.onDragEnd}
          handleRouteChange={this.handleRouteChange}
          createRoute={this.createRoute}
          userConfig={this.props.userConfig}
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
      selectedPickup: pickup,
    })
  };

  handleRouteChange = (index) => {
    this.setState(
      produce(this.state, draft => {
        draft.pickups[index].inRoute = !draft.pickups[index].inRoute;
      }));
  }

  handleMonthChange = (month) => {
    this.setState({ selectedMonth: getMonth(month) })
  }

  // for the datepicker ondayclick handler
  // unconfirmed pickups should be shown based
  // on the month of the selected day
  selectDate = async (date) => {
    try {
      let pickups = await this.getPickupsByMonth()
      console.log(pickups)
      this.setState({
        pickups: pickupMocks,
        user: userMocks,
      })
    } catch (e) {
      alert(e);
    }
    this.setState({
      selectedDate: date
    })
  }
}

export default Overview;