import * as React from 'react'
import { Card, Checkbox, Collapse, Elevation, H5, Icon } from "@blueprintjs/core"

class PickupCard extends React.Component{
    constructor(props){
        super(props)
    }

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    render(){
        const { provided, innerRef, pickup } = this.props;

        return(
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={this.setRef}
            >
            <Card interactive={true} elevation={Elevation.TWO} className={'card'}>
                <H5>${pickup.pickupID}</H5>
            </Card>
            </div>
        )
    }
}

export default PickupCard