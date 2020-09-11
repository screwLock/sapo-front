/* eslint-disable */
import * as React from 'react'
import OverviewMapView from './OverviewMapView'
import OverviewPickupsView from './OverviewPickupsView/OverviewPickupsView'
import { Grid, Cell } from "styled-css-grid";
import produce from 'immer';
import EmbedMap from './Maps/EmbedMap'
import OverviewPickups from './OverviewPickups.js';
import OverviewDatePicker from './OverviewDatePicker.js';
import { getMonth, getYear, lastDayOfMonth, isSameDay } from 'date-fns'
import { API, Auth } from "aws-amplify"
import { AppToaster } from '../Toaster'
import config from '../../config'
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'

class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pickups: [],
            selectedPickup: null,
            selectedDate: new Date(),
            selectedMonth: getMonth(new Date()),
            unconfirmedDates: [],
            user: {},
            src: '',
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
                    lng: parseFloat(latlng[1]),
                },
                src: `https://www.google.com/maps/embed/v1/place?key=${config.GOOGLE_MAP_KEY}&q=${parseFloat(latlng[0])},${parseFloat(latlng[1])}`
            }
            ))
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

    updateNewRoute = (isNewRoute) => {
        const datePickups = this.state.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.state.selectedDate));
        const routePickups = datePickups.filter(pickup => pickup.inRoute === true);
        let src = '';
        const origin = [this.state.user.lat, this.state.user.lng];
        let destination = '&destination='
        // pickups is empty, show the client's location on the place url
        if (routePickups.length === 0 && isNewRoute === true) {
            src = `https://www.google.com/maps/embed/v1/place?key=${config.GOOGLE_MAP_KEY}&q=${origin}`
        }
        // only one pickup, use no waypoints in the direction url
        else if (routePickups.length === 1 && isNewRoute === true) {
            destination = `${destination}${routePickups[0].lat},${routePickups[0].lng}`
            src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${destination}`
        }
        // pickups === 2, one waypoint and no pipes
        else if (routePickups.length === 2 && isNewRoute === true) {
            destination = `${destination}${routePickups[routePickups.length - 1].lat},${routePickups[routePickups.length - 1].lng}`
            let waypoints = '&waypoints=';
            waypoints = `${waypoints}${routePickups[0].lat},${routePickups[0].lng}`
            src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${waypoints}${destination}`
        }
        // pickups > 2, all but last waypoint have pipes
        else if (routePickups.length > 2 && isNewRoute === true) {
            destination = `${destination}${routePickups[routePickups.length - 1].lat},${routePickups[routePickups.length - 1].lng}`
            // waypointPickups is the actual waypoints we will use
            let waypointPickups = [...routePickups];
            waypointPickups.splice(waypointPickups.length - 1);
            waypointPickups.splice(waypointPickups.length - 2);
            let waypoints = '&waypoints=' + waypointPickups.map(pickup => `${pickup.lat},${pickup.lng}|`);
            //no pipe on the last waypoint
            waypoints = `${waypoints}${routePickups[routePickups.length - 2].lat},${routePickups[routePickups.length - 2].lng}`
            src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${waypoints}${destination}`
        }

        this.setState({ src: src })
    }

    //  at the end of a drag, we need to change the pickup indices to reflect
    //  the reordering
    onDragEnd = (pickups) => {
        this.setState({
            pickups: pickups.map((pickup, index) => { return { ...pickup, index: index } })
        });
    };

    selectPickup = (pickup) => () => {
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


    render() {
        return (
            <OverviewPickupsView 
                {...this.state} 
                handleClick={this.selectDate}
                onDragEnd={this.onDragEnd}
                handleMonthChange={this.handleMonthChange}
                selectPickup={this.selectPickup}
                selectedPickup={this.state.selectedPickup}
                />
        )
    }
}

export default Overview;