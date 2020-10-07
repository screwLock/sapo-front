import * as React from 'react'
import Header from './OverviewPickupsView/Header'
import Pickups from './OverviewPickupsView/Pickups'
import DatePickerFullScreen from './OverviewPickupsView/DatePickerFullScreen'
import styled from 'styled-components'
import { CustomerCallIn } from './CustomerCallIn/CustomerCallIn'
import EmbedMap from './Maps/EmbedMap'
import { animated, Transition } from 'react-spring/renderprops'
import { Mobile, Desktop } from '../devices'


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

    showMap = (boolean) => {
        this.setState({ showMap: boolean })
    }

    getView = (view) => {
        return (
            <Transition
                items={this.state.view}
                from={{ opacity: 0, }}
                enter={{ opacity: 1, }}
                leave={{ opacity: 0, }}
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
                                <Row>
                                    <div style={{ width: '50%', }}>
                                        <Transition
                                            items={this.state.showMap}
                                            from={{ opacity: 0, transform: 'translate3d(100%,0,0)', }}
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
                            </animated.div>
                        )
                    }
                    else if (view === 'customerCallIn') {
                        return (
                            props => <animated.div
                                key={view}
                                style={{ ...props, position: 'absolute', width: '100%' }}
                            >
                                <Column
                                    style={{ width: '40%' }}
                                >
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

    getMobileView = (view) => {
        return (
            <Transition
                items={this.state.view}
                from={{ opacity: 0, }}
                enter={{ opacity: 1, }}
                leave={{ opacity: 0, }}
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
                                    <div style={{ width: '100%', }}>
                                                {this.state.showMap
                                                    ? <EmbedMap {...this.props} />
                                                    : <DatePickerFullScreen {...this.props} />
                                                }
                                    </div>
                                    <MobilePickupsContainer>
                                        <Pickups {...this.props} changeView={this.changeView} showMap={this.showMap} />
                                    </MobilePickupsContainer>
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
                                <Column
                                    style={{ width: '40%' }}
                                >
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
                <Desktop>
                    {this.getView(this.state.view)}
                </Desktop>
                <Mobile>
                    {this.getMobileView(this.state.view)}
                </Mobile>
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

const MobilePickupsContainer = styled.div`
    width: 100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export default OverviewViewHandler;