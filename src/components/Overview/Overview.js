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
import { AppToaster } from '../Toaster'
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
      return;
    }
    else {
      try {
        const platform = new H.service.Platform({
          'app_id': 'u3uFI5c0XaweKx6Yh31t',
          'app_code': 'wUPW8ZhbclB20ZTwqRC4fA'
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
        // let pickups = await this.getPickupsByMonth(startDate, endDate)

      } catch (error) {
        this.showToast(`${error}`)
      }

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
          zoom={12}
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