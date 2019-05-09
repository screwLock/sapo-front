import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import PickupMarker from './PickupMarker'
import './styles/pickupMarker.css';
import { isSameDay } from 'date-fns';
import config from '../../config'

class OverviewMap extends React.Component {
  constructor(props) {
    super(props);
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
    const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, this.props.selectedDate));
    console.log(datePickups)
    const routePickups = datePickups.filter(pickup => pickup.inRoute === true);
    const user = this.props.user;
    const zoom = this.props.zoom;
    return (
      <div className='google-map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
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

