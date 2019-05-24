import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

class Routing extends MapLayer {

    createLeafletElement() {
        const { map, pickups, user } = this.props
        let waypoints = []
        if (pickups.length > 0) {
            waypoints = pickups.map(pickup => {
                return L.latLng(pickup.lat, pickup.lng)
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
            waypoints: [L.latLng(user.lat, user.lng), ...waypoints],
            show: false,
            createMarker: (i, wp) => {
                return L.marker(wp.latLng, {
                    draggable: true,
                    icon
                })
            }
        }).addTo(map.leafletElement);
        leafletElement.hide();
        return leafletElement.getPlan()
    }
}
export default withLeaflet(Routing);