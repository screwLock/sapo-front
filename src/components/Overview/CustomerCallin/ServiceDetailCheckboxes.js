import * as React from 'react'
import { H4, Checkbox } from '@blueprintjs/core'
import styled from 'styled-components'

class ServiceDetailCheckboxes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isVisible) {
            return (
                <BlockContainer>
                    <H4>Pickup Details</H4>
                    <SubBlockContainer>
                        {this.props.serviceDetails.map((detail, sdIndex) => {
                            return (
                                <Checkbox label={detail.name}
                                    value={this.props.serviceDetails[sdIndex].checked}
                                    onChange={this.props.onChange(sdIndex)}
                                    key={detail.name}
                                    checked={this.props.serviceDetails[sdIndex].checked}
                                />
                            )
                        })}
                    </SubBlockContainer>
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }
}

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SubBlockContainer = styled.div`
    width: 250px;
    margin: 10px;
    margin-left: 20px;
`;

export default ServiceDetailCheckboxes