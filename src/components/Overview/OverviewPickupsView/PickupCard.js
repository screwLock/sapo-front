import * as React from 'react'

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
            Fuck
            </div>
        )
    }
}

export default PickupCard