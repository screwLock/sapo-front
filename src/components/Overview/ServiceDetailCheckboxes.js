import * as React from 'react'
import { H4, H6, Checkbox } from '@blueprintjs/core'
import { produce } from 'immer'
import styled from 'styled-components'

class ServiceDetailCheckboxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceDetails: []
        }
    }

    componentDidMount = () => {
        this.setState({
            serviceDetails: this.props.serviceDetails
        })
    }

    handleCheckedChange = (sdIndex) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.serviceDetails[sdIndex].checked = !draft.serviceDetails[sdIndex].checked
            }))
    }

    renderServiceDetails = (sd) => {
        return (
            <BlockContainer>
                <H4>Pickup Details</H4>
                <SubBlockContainer>
                    {sd.map((detail, sdIndex) => {
                        return (
                            <Checkbox label={detail.name}
                                checked={this.state.serviceDetails[sdIndex].checked}
                                onChange={this.handleCheckedChange(sdIndex)}
                            />
                        )
                    })}
                </SubBlockContainer>
            </BlockContainer>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isVisible ? this.renderServiceDetails(this.state.serviceDetails) : ''}
            </React.Fragment>
        )
    }
}

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const SubBlockContainer = styled.div`
    width: 250px;
    margin: 10px;
    margin-left: 20px;
`;

export default ServiceDetailCheckboxes