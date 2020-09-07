/* eslint-disable */
import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";
import produce from 'immer';
import EmbedMap from './Maps/EmbedMap'
import OverviewPickups from './OverviewPickups.js';
import OverviewDatePicker from './OverviewDatePicker.js';
import { getMonth, getYear, lastDayOfMonth } from 'date-fns'
import { API, Auth } from "aws-amplify"
import { AppToaster } from '../Toaster'
import config from '../../config'
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
// we have to import map.css here to hide the directions panel 
// import './map.css'

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickups: [],
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

    else if (this.props.authData.signInUserSession.idToken.payload['custom:LatLng'] == null) {
      this.showToast('You need to use a valid address for pickups.  You can change your address in the Account tab in the Admin dashboard.')
      return;
    }
    else if (this.props.authData.signInUserSession.idToken.payload['custom:LatLng'] !== '@') {
      let latlng = this.props.authData.signInUserSession.idToken.payload['custom:LatLng'].split('@')
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          lat: parseFloat(latlng[0]),
          lng: parseFloat(latlng[1])
        }
      }))
      await this.getPickupsByMonth(this.state.selectedMonth)
      return;
    }
    else {
      try {
        const platform = new H.service.Platform({
          'app_id': config.HERE_APP_ID,
          'app_code': config.HERE_APP_CODE,
          useHTTPS: true
        });
        let user = await Auth.currentAuthenticatedUser();
        const geocoder = platform.getGeocodingService();

        let lat = ''
        let lng = ''
        let address = this.props.authData.signInUserSession.idToken.payload.address.formatted.split('@')

        //get the lat and lng from a geocoder call
        geocoder.geocode({ searchText: `${address[0] + address[3]}` },
          (result) => {
            if (result.Response.View[0]) {
              lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
              lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
              Auth.updateUserAttributes(user, {
                'custom:LatLng': `${lat}@${lng}`
              }).then(
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    lat: lat,
                    lng: lng
                  }
                }))
              )
            }
          },
          (error) => {
            this.showToast(`${error.response.status}`)
          }
        )
        await this.getPickupsByMonth(this.state.selectedMonth)
      } catch (error) {
        this.showToast(`${error}`)
      }

    }
  }

  createRoute = () => {
    this.setState({ newRoute: !this.state.newRoute });
  }

  getPickupsByMonth = (currentMonth) => {
    let currentYear = getYear(new Date())
    let endDate = lastDayOfMonth(new Date(currentYear, currentMonth + 1)).toISOString().substr(0, 10)
    let startDate = new Date(currentYear, currentMonth - 1, 1).toISOString().substr(0, 10)
    return API.get("sapo", "/pickups", {
      'queryStringParameters': {
        'startDate': startDate,
        'endDate': endDate
      }
    }).then(result => {
      // make sure we add an inRoute attribute for the directions API
      // also an index for changing this inRoute attribute in the Overview Cards
      this.setState({ pickups: result.map((pickup, index) => { return { ...pickup, inRoute: false, index: index } }) })
    });
  }

  updatePickups = (pickup, pickups, index) => {
    let newPickups = [...pickups]
    newPickups[index] = pickup
    this.setState({ pickups: newPickups })
  }

  render() {
    return (
      <Grid columns={12}>
        <Cell width={12}><EmbedMap pickups={this.state.pickups}
          selectedDate={this.state.selectedDate}
          selectedPickup={this.state.selectedPickup}
          onClick={this.selectPickup}
          user={this.state.user}
          routeKey={this.state.newRoute}
        />
        </Cell>
        <Cell width={4}><OverviewDatePicker selectedDate={this.state.selectedDate}
          handleClick={this.selectDate}
          handleMonthChange={this.handleMonthChange}
          selectedMonth={this.state.selectedMonth}
          pickups={this.state.pickups}
        /></Cell>
        <Cell width={7}><OverviewPickups pickups={this.state.pickups}
          handleRefresh={() => { this.getPickupsByMonth(this.state.selectedMonth) }}
          user={this.state.user}
          routes={this.state.routes}
          handleClick={this.selectPickup}
          selectedDate={this.state.selectedDate}
          onDragEnd={this.onDragEnd}
          handleRouteChange={this.handleRouteChange}
          createRoute={this.createRoute}
          userConfig={this.props.userConfig}
          updatePickups={this.updatePickups}
          payload={this.props.authData.signInUserSession.idToken.payload}
        />
        </Cell>
      </Grid>
    );
  }

  //  at the end of a drag, we need to change the pickup indices to reflect
  //  the reordering
  onDragEnd = (pickups) => {
    this.setState({
      pickups: pickups.map((pickup, index) => { return { ...pickup, index: index } })
    });
  };

  selectPickup = (pickup) => {
    this.setState({
      selectedPickup: pickup,
    })
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  handleRouteChange = (index) => {
    this.setState(
      produce(this.state, draft => {
        draft.pickups[index].inRoute = !draft.pickups[index].inRoute;
      }));
  }

  // we also need to get the pickups for the selected month
  handleMonthChange = (month) => {
    this.setState({ selectedMonth: getMonth(month) },
      () => {
        this.getPickupsByMonth(getMonth(month))
      })
  }

  // for the datepicker ondayclick handler
  // unconfirmed pickups should be shown based
  // on the month of the selected day
  selectDate = (date) => {
    this.setState({ selectedDate: date })
  }
}

export default Overview;