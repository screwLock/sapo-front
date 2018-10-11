import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import PickupMarker from './PickupMarker'
import './styles/pickupMarker.css';
import { isSameDay } from 'date-fns';

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
    const datePickups = this.props.pickups.filter((pickup) => isSameDay(pickup.date, this.props.selectedDate));
    const user = this.props.user;
    const zoom = this.props.zoom;
    return (
      <div className='google-map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDOs_VPiyP8PWQ70b7uNtPhKftBgwsFhw8' }}
          defaultCenter={{'lat': user.lat, 'lng': user.lng}}
          defaultZoom={zoom}
          center={center}
        >
          {datePickups.map((pickup) => {
            return <PickupMarker
              key={pickup.name}
              lat={pickup.lat}
              lng={pickup.lng}
              name={pickup.name}
              selectedPickup={this.props.selectedPickup}
              pickup={pickup}
              onClick={this.props.onClick}
            ></PickupMarker>
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default OverviewMap;

  //onGoogleApiLoaded is where the markers are rendered

  //1.  Get coordinates from db
  //2.  create markers from coordinates
  //3.  render markers

