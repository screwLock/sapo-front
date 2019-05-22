import * as React from 'react'
import styled from 'styled-components'

class LeafletMap extends React.PureComponent {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <MapContainer>map goes here</MapContainer>
        )
    }
}

const MapContainer = styled.div`
    height: 100vh; 
    width: 100%;
`

export default LeafletMap