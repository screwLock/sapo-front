import * as React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet-routing-machine"
import Routing from "./RoutingMachine"
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';


class LeafletMap extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            isMapInit: false,
        };
    }

    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        })
    }

    render() {
        const position = [37.335556, -122.009167];
        // height MUST be set on Map component as well for proper rendering!
        // we set zIndex=1 so that dialogs/popovers will appear over map

        return (
            <MapContainer>
                <Map center={position}
                    zoom={this.state.zoom}
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
                    {this.state.isMapInit && <Routing map={this.map}/>}
                    <FullscreenControl position="topleft" />
                </Map>
            </MapContainer>
        )
    }
}

const MapContainer = styled.div`
    height: 100vh; 
    width: 100%;
`

export default LeafletMap