import * as React from 'react';
import { Card, Elevation, Overlay } from '@blueprintjs/core'
import './styles/customerCallIn.css'

export class CustomerCallIn extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Overlay elevation={Elevation.TWO} 
                     isOpen={this.props.isOverlayOpen} 
                     onClose={this.props.onClose} 
                     transitionDuration={100}
            >
                <div className='container'>
                    <Card className='customerCallIn'>
                        <h2>Customer Call-In</h2>
                    </Card>
                </div>
            </Overlay>
        )
    }
}

