import * as React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';

class LeafletMap extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        };
    }

    render() {
        const position = [37.335556, -122.009167];
        // height MUST be set on Map component as well for proper rendering!
        // we set zIndex=1 so that dialogs/popovers will appear over map
        return (
            <MapContainer>
                <Map center={position} 
                    zoom={this.state.zoom} 
                    style={{
                        height: "500px",
                        zIndex: '1'
                        }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
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