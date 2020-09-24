import * as React from 'react'
import Header from './OverviewPickupsView/Header'
import Pickups from './OverviewPickupsView/Pickups'
import DatePickerFullScreen from './OverviewPickupsView/DatePickerFullScreen'
import styled from 'styled-components'
import { CustomerCallIn } from './CustomerCallIn/CustomerCallIn'
import EmbedMap from './Maps/EmbedMap'
import { animated, Transition } from 'react-spring/renderprops';

class OverviewViewHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 'dailyPickups',
            showMap: false,
        }
    }

    changeView = (view) => {
        this.setState({ view: view })
    }

    showMap = () => {
        this.setState({ showMap: !this.state.showMap })
    }

    getView = (view) => {
        return (
            <Transition
                items={this.state.view}
                from={{ opacity: 0, transform: 'translate3d(100%,0,0)', }}
                enter={{ opacity: 1, transform: 'translate3d(0%,0,0)',  }}
                leave={{ opacity: 0, transform: 'translate3d(-100%,0,0)'}}
                native
                reset
                unique
            >
                {view => {
                    if (view === 'dailyPickups') {
                        return (
                            props => <animated.div
                                key={view}
                                style={{ ...props, position: 'absolute', width: '100%' }}
                            >
                                <Column>
                                    <Row>
                                        <div style={{ width: '50%',}}>
                                            <Transition
                                                items={this.state.showMap}
                                                from={{  opacity: 0, transform: 'translate3d(100%,0,0)',  }}
                                                enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
                                                leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}
                                                native
                                                reset
                                                unique
                                            >
                                                {showMap =>
                                                    showMap
                                                        ? props => <animated.div
                                                            key={0}
                                                            style={{ ...props, position: 'absolute' }}
                                                        ><EmbedMap {...this.props} /></animated.div>
                                                        : props => <animated.div
                                                            key={1}
                                                            style={{ ...props, position: 'absolute' }}
                                                        ><DatePickerFullScreen {...this.props} /></animated.div>
                                                }
                                            </Transition>
                                        </div>
                                        <PickupsContainer>
                                            <Pickups {...this.props} changeView={this.changeView} showMap={this.showMap} />
                                        </PickupsContainer>
                                    </Row>
                                </Column>
                            </animated.div>
                        )
                    }
                    else if (view === 'customerCallIn') {
                        return (
                            props => <animated.div
                                key={view}
                                style={{ ...props, position: 'absolute', width: '100%' }}
                            >
                                <Column style={{ alignItems: 'center' }}>
                                    <CustomerCallIn {...this.props} changeView={this.changeView} />
                                </Column>
                            </animated.div>
                        )
                    }
                    else if (view === 'incompleteSetup') {
                        return (
                            props => <animated.div
                                key={view}
                                style={{ ...props, position: 'absolute', width: '100%' }}
                            >
                                <Column>
                                    <div>Setup Not Complete</div>
                                </Column>
                            </animated.div>
                        )
                    }
                }
                }
            </Transition>
        )
    }



    render() {
        return (
            <div>
                {this.getView(this.state.view)}
            </div>
        )
    }
}

const DropDownRow = styled.div`
    height: ${props => props.height}%;
    overflow: hidden;
`

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
    justify-content: center;
`

export default OverviewViewHandler;