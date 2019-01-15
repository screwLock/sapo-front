import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import PickupMarker from './PickupMarker'
import './styles/pickupMarker.css';
import { isSameDay } from 'date-fns';

class OverviewMap extends React.Component {
  constructor(props) {
    super(props);
  }

  apiIsLoaded = (map, maps, pickups) => {
    if (map && (pickups && pickups.length)) {
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
        directionsDisplay.setDirections({routes: []});
        directionsService.route({
          origin: {lat: this.props.user.lat, lng: this.props.user.lng},
          destination: {lat: this.props.user.lat, lng: this.props.user.lng},
          travelMode: 'DRIVING',
          waypoints: pickups.map(pickup => ({
            location: {lat: pickup.lat, lng: pickup.lng},
            stopover: true
          })),
          //optimizeWaypoints: true,
        }, (response, status) => {
          if (status === 'OK') {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            console.log(response.routes[0])
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }

  getCenter = (selectedPickup, defaultCenter) => {
    let selectedCenter = null;
    if (selectedPickup){
      selectedCenter={
          lat: selectedPickup.lat,
          lng: selectedPickup.lng
      };
    return selectedCenter;  
    }
    else
    {
      return defaultCenter;
    }
  }

  render() {
    const center = this.getCenter(this.props.selectedPickup, this.props.center);
    const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.date, this.props.selectedDate));
    const routePickups = datePickups.filter(pickup => pickup.inRoute === true);
    const user = this.props.user;
    const zoom = this.props.zoom;
    return (
      <div className='google-map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDOs_VPiyP8PWQ70b7uNtPhKftBgwsFhw8' }}
          defaultCenter={{'lat': user.lat, 'lng': user.lng}}
          defaultZoom={zoom}
          center={center}
          key={this.props.routeKey}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, routePickups)}
        >
          {datePickups.map((pickup, index) => {
            return <PickupMarker
              lat={pickup.lat}
              lng={pickup.lng}
              name={pickup.name}
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



