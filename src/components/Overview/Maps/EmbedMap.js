import * as React from 'react'
import { isSameDay } from 'date-fns';
import config from '../../../config'

 const EmbedMap = (props) => {
    let src = '';
    const datePickups = props.pickups.filter((pickup) => isSameDay(pickup.pickupDate, props.selectedDate));
    const routePickups = datePickups.filter(pickup => pickup.inRoute === true);
    const origin = [props.user.lat, props.user.lng];
    let destination = '&destination='
    // pickups is empty, show the client's location on the place url
    if(routePickups.length === 0) {
        src = `https://www.google.com/maps/embed/v1/place?key=${config.GOOGLE_MAP_KEY}&q=${origin}`
    }
    // only one pickup, use no waypoints in the direction url
    else if(routePickups.length === 1) {
        destination = `${destination}${routePickups[0].lat},${routePickups[0].lng}`
        src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${destination}`
    }
    // pickups === 2, one waypoint and no pipes
    else if(routePickups.length === 2) {
        destination = `${destination}${routePickups[routePickups.length-1].lat},${routePickups[routePickups.length-1].lng}`
        let waypoints = '&waypoints=';
        waypoints = `${waypoints}${routePickups[0].lat},${routePickups[0].lng}`
        src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${waypoints}${destination}`
    }
    // pickups > 2, all but last waypoint have pipes
    else if(routePickups.length > 2) {
        destination = `${destination}${routePickups[routePickups.length-1].lat},${routePickups[routePickups.length-1].lng}`
        // waypointPickups is the actual waypoints we will use
        let waypointPickups = [ ...routePickups];
        waypointPickups.splice(waypointPickups.length-1);
        waypointPickups.splice(waypointPickups.length-2);
        let waypoints = '&waypoints=' + waypointPickups.map( pickup => `${pickup.lat},${pickup.lng}|` );
        //no pipe on the last waypoint
        waypoints = `${waypoints}${routePickups[routePickups.length-2].lat},${routePickups[routePickups.length-2].lng}`
        src = `https://www.google.com/maps/embed/v1/directions?key=${config.GOOGLE_MAP_KEY}&origin=${origin}${waypoints}${destination}`
    }

    return (
        <div>
          <iframe src={src} width="100%" height="600" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
    );
 }
 export default EmbedMap