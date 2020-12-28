/* eslint-disable */
import * as React from 'react'
import OverviewViewHandler from './OverviewViewHandler'
import produce from 'immer';
import { addMonths, subMonths, getMonth, getYear, lastDayOfMonth, startOfMonth,isSameDay } from 'date-fns'
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
            selectedDriver: null,
            selectedMonth: new Date(),
            unconfirmedDates: [],
            user: {},
            src: '',
            search: ''
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }

        else if (this.props.userAttributes['latLng'] == null) {
            this.showToast('You need to use a valid address for pickups.  You can change your address in the Account tab in the Admin dashboard.')
            return;
        }
        else if (this.props.userAttributes['latLng'] !== '@') {
            let latlng = this.props.userAttributes['latLng'].split('@')
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    lat: parseFloat(latlng[0]),
                    lng: parseFloat(latlng[1]),
                },
                src: `https://www.google.com/maps/embed/v1/place?key=${config.GOOGLE_MAP_KEY}&q=${this.props.authData.attributes.address.replaceAll('@', ',').replaceAll(' ', '+')}`
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
                let address = this.props.userAttributes.address.formatted.split('@')

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

    // added sort parameter to account for different sort types
    // sorting by status will be done on the backend by default

    getPickupsByMonth = (currentMonth, sort = null) => {
        let endDate = lastDayOfMonth(addMonths(currentMonth, 1)).toISOString().substr(0, 10)
        let startDate = startOfMonth(subMonths(currentMonth, 1)).toISOString().substr(0, 10)
        return API.get("sapo", "/pickups", {
            'queryStringParameters': {
                'startDate': startDate,
                'endDate': endDate,
                'id': this.props.userAttributes.id,
                'sort': sort,
            }
        }).then(result => {
            // make sure we add an inRoute attribute for the directions API
            // also an index for changing this inRoute attribute in the Overview Cards
            this.setState({
                pickups: result.map((pickup, index) => { return { ...pickup, inRoute: pickup.inRoute || null, index: index } }),
            })
        });
    }

    updatePickups = (pickup, pickups, index) => {
        let newPickups = [...pickups]
        newPickups[index] = pickup
        this.setState({ pickups: newPickups })
    }

    createRoute = () => {
        const origin = this.props.authData.attributes.address.replaceAll('@', ',').replaceAll(' ', '+')
        const datePickups = this.state.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.state.selectedDate));
        const routePickups = this.state.selectedDriver? datePickups.filter(pickup => pickup.inRoute).filter(pickup => pickup.inRoute.lastName === this.state.selectedDriver.lastName): null
        let src = '';
        //const origin = [this.state.user.lat, this.state.user.lng];
        let destination = '&destination='
        // pickups is empty, show the client's location on the place url
        if (routePickups.length === 0) {
            src = `https://www.google.com/maps/embed/v1/place?key=${config.GOOGLE_MAP_KEY}&q=${origin}`
        }
        // only one pickup, use no waypoints in the direction url
        else if (routePickups.length === 1) {
            destination = `${destination}${routePickups[0].streetAddress},${routePickups[0].zipcode}`
            src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${destination}`
        }
        // pickups === 2, one waypoint and no pipes
        else if (routePickups.length === 2) {
            destination = `${destination}${routePickups[routePickups.length - 1].streetAddress},${routePickups[routePickups.length - 1].zipcode}`
            let waypoints = '&waypoints=';
            waypoints = `${waypoints}${routePickups[0].streetAddress},${routePickups[0].zipcode}`
            src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${waypoints}${destination}`
        }
        // pickups > 2, all but last waypoint have pipes
        else if (routePickups.length > 2) {
            destination = `${destination}${routePickups[routePickups.length - 1].streetAddress},${routePickups[routePickups.length - 1].zipcode}`
            // waypointPickups is the actual waypoints we will use (all stops except origin or destination)
            let waypointPickups = [...routePickups];
            // The first element is the destination, so we will remove that.
            waypointPickups.splice(waypointPickups.length - 1);
            // we don't want a pipe on the last waypoint, so we will also remove that
            waypointPickups.splice(waypointPickups.length - 1);
            let waypoints = '&waypoints=' + waypointPickups.map(pickup => `${pickup.streetAddress},${pickup.zipcode}|`);
            //no pipe on the last waypoint
            waypoints = `${waypoints}${routePickups[routePickups.length - 2].streetAddress},${routePickups[routePickups.length - 2].zipcode}`
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

    handleRouteChange = (index, driver) => {
        this.setState(
            produce(this.state, draft => {
                draft.pickups[index].inRoute = driver;
            }));
    }

    // we also need to get the pickups for the selected month
    handleMonthChange = (month) => {
        this.setState({ selectedMonth: month },
            () => {
                this.getPickupsByMonth(month)
            })
    }

    selectDate = (date) => {
        this.setState({ 
            selectedDate: date,
        })
    }

    setSelectedDriver = (driver) => {
        this.setState({ selectedDriver: driver })
    }

    // if pickups === null, show a loading screen symbol
    render() {
        return (
            <OverviewViewHandler 
                {...this.state}
                selectedMonth={getMonth(this.state.selectedMonth)} 
                handleClick={this.selectDate}
                onDragEnd={this.onDragEnd}
                handleMonthChange={this.handleMonthChange}
                selectPickup={this.selectPickup}
                selectedPickup={this.state.selectedPickup}
                selectedDriver={this.state.selectedDriver}
                setSelectedDriver={this.setSelectedDriver}
                userConfig={this.props.userConfig}
                handleRouteChange={this.handleRouteChange}
                createRoute={this.createRoute}
                src={this.state.src}
                updatePickups={this.updatePickups}
                handleLogout={this.props.handleLogout}
                userAttributes={this.props.userAttributes}
                datePickups={this.state.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.state.selectedDate))}
                />
        )
    }
}

export default Overview;