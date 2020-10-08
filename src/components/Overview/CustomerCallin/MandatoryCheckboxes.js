import * as React from 'react'
import { H4, Checkbox } from '@blueprintjs/core'
import styled from 'styled-components'

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
                                    checked={this.props.mandatoryDetails[mdIndex].checked}
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