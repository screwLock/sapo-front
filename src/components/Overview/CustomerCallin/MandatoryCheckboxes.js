import * as React from './node_modules/react'
import { H4, Checkbox } from './node_modules/@blueprintjs/core'
import styled from './node_modules/styled-components'

class MandatoryCheckboxes extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isVisible) {
            return (
                <BlockContainer>
                    <H4>The Customer Certifies That: </H4>
                    <SubBlockContainer>
                        {this.props.mandatoryDetails.map((detail, mdIndex) => {
                            return (
                                <Checkbox label={detail.name}
                                    value={this.props.mandatoryDetails[mdIndex].checked}
                                    onChange={this.props.onChange(mdIndex)}
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
    margin-top: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const SubBlockContainer = styled.div`
    width: 250px;
    margin: 10px;
    margin-left: 20px;
`;

export default MandatoryCheckboxes