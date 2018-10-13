import * as React from 'react';
import { Card, Elevation, Overlay } from '@blueprintjs/core'

export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Overlay elevation={Elevation.TWO} 
                     isOpen={this.props.isOverlayOpen} 
                     onClose={this.props.onClose} 
                     transitionDuration={1}
            >
                <Card>
                    <h2>Customer Call-In</h2>
                </Card>
            </Overlay>
        )
    }
}

