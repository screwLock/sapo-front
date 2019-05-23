import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props
        const icon = L.icon({
            iconUrl:
                "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
            iconSize: [40, 40]
        })
        let leafletElement = L.Routing.control({
            waypoints: [L.latLng(27.67, 85.316), L.latLng(27.68, 85.321)],
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