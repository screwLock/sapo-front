import * as React from 'react'
import GoogleMapReact from 'google-map-react'
import PickupMarker from './PickupMarker'
import './styles/pickupMarker.css'
import { isSameDay } from 'date-fns'
import config from '../../config'

class OverviewMap extends React.Component {
  constructor(props) {
    super(props);
  }

  apiIsLoaded = (map, maps, pickups) => {
    if (map && (pickups && pickups.length)) {
      // added 'new' to DirectionsService() and DirectionsRenderer
      const directionsService = new maps.DirectionsService();
      const directionsDisplay = new maps.DirectionsRenderer({ suppressMarkers: true });
      directionsDisplay.setDirections({ routes: [] });
      directionsService.route({
        origin: { lat: this.props.user.lat, lng: this.props.user.lng },
        destination: { lat: this.props.user.lat, lng: this.props.user.lng },
        travelMode: 'DRIVING',
        waypoints: pickups.map(pickup => ({
          location: { lat: pickup.lat, lng: pickup.lng },
          stopover: true
        })),
        //optimizeWaypoints: true,
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setMap(map);
          directionsDisplay.setDirections(response);
          console.log(response.routes[0])
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    }
  }

  getCenter = (selectedPickup, defaultCenter) => {
    let selectedCenter = null;
    if (selectedPickup) {
      selectedCenter = {
        lat: selectedPickup.lat,
        lng: selectedPickup.lng
      };
      return selectedCenter;
    }
    else {
      return defaultCenter;
    }
  }

  render() {
    const center = this.getCenter(this.props.selectedPickup, this.props.center);
    const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.props.selectedDate));
    const routePickups = datePickups.filter(pickup => pickup.inRoute === true);
    console.log(routePickups)
    const user = this.props.user;
    const zoom = this.props.zoom;
    return (
      <div className='google-map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
          defaultZoom={zoom}
          center={center}
          key={this.props.routeKey}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, routePickups)}
        >
          {datePickups.map((pickup, index) => {
            return <PickupMarker
              key={pickup.pickupID}
              lat={pickup.lat}
              lng={pickup.lng}
              selectedPickup={this.props.selectedPickup}
              pickup={pickup}
              onClick={this.props.onClick}
            ></PickupMarker>
          })
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default OverviewMap;



