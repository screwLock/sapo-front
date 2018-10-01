import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class OverviewMap extends Component {

    static defaultProps = {
      center: { lat: 40.7446790, lng: -73.9485420 },
      zoom: 11
    };
    

    render(){
      return(
        <div className = 'google-map' style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys = {{ key: 'AIzaSyDOs_VPiyP8PWQ70b7uNtPhKftBgwsFhw8' }}
            defaultCenter = { this.props.center }
            defaultZoom = { this.props.zoom }>

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

