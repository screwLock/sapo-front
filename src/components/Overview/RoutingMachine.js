import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

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
        const icon = L.icon({
            iconUrl:
                "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
            iconSize: [40, 40]
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
                        icon
                    // can use html in bindPopup
                    }).bindPopup(`<b>${wp.name}</b>`)
                }
                // the other markers
                else {
                    return L.marker(wp.latLng, {
                        draggable: false,
                        icon
                    }).bindPopup(`<b>${wp.name}</b>`)
                }
            }
        }).addTo(map.leafletElement);
        leafletElement.hide();
        return leafletElement.getPlan()
    }
}
export default withLeaflet(Routing);