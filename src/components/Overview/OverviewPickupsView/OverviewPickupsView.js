import * as React from 'react'
import Header from './Header'
import Pickups from './Pickups'
import DatePickerFullScreen from './DatePickerFullScreen'
import styled from 'styled-components'

class OverviewPickupsView extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        /*
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Pickups {...this.props}/>
            </React.Fragment>
        )
        */
        return (
            <Column>
                <Row>
                    <DatePickerFullScreen {...this.props} />
                    <Pickups {...this.props} />
                </Row>
            </Column>
        )
    }
}

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    display: flex-direction: row;
`

export default OverviewPickupsView;