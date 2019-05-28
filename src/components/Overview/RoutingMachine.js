import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
delete L.Icon.Default.prototype._getIconUrl;

class Routing extends MapLayer {

    createLeafletElement() {
        const { map, pickups, user } = this.props
        let waypoints = []
        if (pickups.length > 0) {
            waypoints = pickups.map(pickup => {
                // cramming popup info into the name argument
                return L.Routing.waypoint(L.latLng(pickup.lat, pickup.lng), `<div>${pickup.streetAddress}, ${pickup.zipcode}<div><div>${pickup.lastName}, ${pickup.firstName}</div>`)
            })
        }
        console.log(pickups)
        console.log(waypoints)
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
          });
        const pickupIcon = L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
        const homeIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
        let leafletElement = L.Routing.control({
            waypoints: [L.Routing.waypoint(L.latLng(user.lat, user.lng), 'Home'), ...waypoints],
            show: false,
            // addWaypoints and routeWhileDragging are false for read-only map
            addWaypoints: false,
            routeWhileDragging: false,
            createMarker: (i, wp, nWps) => {
                // start and end marker
                if (i === 0 || i === nWps - 1) {
                    return L.marker(wp.latLng, {
                        draggable: false,
                        homeIcon
                    // can use html in bindPopup
                    }).bindPopup(`<b>${wp.name}</b>`)
                }
                // the other markers
                else {
                    return L.marker(wp.latLng, {
                        draggable: false,
                        pickupIcon
                    }).bindPopup(`<b>${wp.name}</b>`)
                }
            }
        }).addTo(map.leafletElement);
        leafletElement.hide();
        return leafletElement.getPlan()
    }
}
export default withLeaflet(Routing);