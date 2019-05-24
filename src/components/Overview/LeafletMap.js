import * as React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet-routing-machine"
import Routing from "./RoutingMachine"
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';


class LeafletMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMapInit: false,
        };
    }

    getCenter = (selectedPickup, defaultCenter) => {
        let selectedCenter = null;
        if (selectedPickup) {
            selectedCenter = [selectedPickup.lat, selectedPickup.lng]
            return selectedCenter;
        }
        else {
            return defaultCenter;
        }
    }

    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true,
        })
    }

    render() {
        const center = this.getCenter(this.props.selectedPickup, [this.props.user.lat, this.props.user.lng])
        // height MUST be set on Map component as well for proper rendering!
        // we set zIndex=1 so that dialogs/popovers will appear over map
        return (
            <MapContainer>
                {/* Make sure this.props.user has been set */}
                {Object.keys(this.props.user).length === 0 ? '' : (
                    <Map center={[this.props.user.lat, this.props.user.lng]}
                        zoom={13}
                        key={this.props.routeKey}
                        scrollWheelZoom={false}
                        animate={true}
                        ref={this.saveMap}
                        style={{
                            height: "100vh",
                            zIndex: '1',
                        }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                        />
                        {this.state.isMapInit && <Routing map={this.map} pickups={this.props.pickups} user={this.props.user} />}
                        <FullscreenControl position="topleft" />
                    </Map>
                )}
            </MapContainer>
        )
    }
}

const MapContainer = styled.div`
    height: 100vh; 
    width: 100%;
`

export default LeafletMap