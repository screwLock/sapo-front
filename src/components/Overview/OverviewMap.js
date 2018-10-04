import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import PickupMarker from './PickupMarker';

class OverviewMap extends React.Component {
  constructor(props) {
    super(props);
  }


  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 3
  };

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
    return (
      <div className='google-map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDOs_VPiyP8PWQ70b7uNtPhKftBgwsFhw8' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={center}
        >
          {this.props.pickups.map((pickup) => {
            return <PickupMarker
              key={pickup.name}
              lat={pickup.lat}
              lng={pickup.lng}
              name={pickup.name}
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

