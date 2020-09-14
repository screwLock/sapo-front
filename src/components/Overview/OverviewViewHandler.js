import * as React from 'react'
import Header from './OverviewPickupsView/Header'
import Pickups from './OverviewPickupsView/Pickups'
import DatePickerFullScreen from './OverviewPickupsView/DatePickerFullScreen'
import styled from 'styled-components'
import { CustomerCallIn } from './CustomerCallIn/CustomerCallIn'

class OverviewViewHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 'dailyPickups'
        }
    }

    changeView = (view) => {
        this.setState({ view: view})
    }

    getView = (view) => {
        if (view === 'dailyPickups') {
            return (
                <Column>
                    <Row>
                        <DatePickerFullScreen {...this.props} />
                        <PickupsContainer>
                            <Pickups {...this.props} />
                        </PickupsContainer>
                    </Row>
                </Column>
            )
        }
        if (view === 'customerCallIn') {
            return (
                <Column>
                    <CustomerCallIn {...this.props} />
                </Column>
            )
        }
    }


    render() {
        return (
            this.getView(this.state.view)
        )
    }
}

const PickupsContainer = styled.div`
    width: 50%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

export default OverviewViewHandler;