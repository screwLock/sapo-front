import * as React from './node_modules/react'
import { H4, Checkbox } from './node_modules/@blueprintjs/core'
import styled from './node_modules/styled-components'

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