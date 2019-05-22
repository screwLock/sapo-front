import * as React from 'react'
import { H4, H6, Checkbox } from '@blueprintjs/core'
import styled from 'styled-components'

class CategoryCheckboxes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isVisible) {
            return (
                <BlockContainer>
                    <H4>Select Donations</H4>
                    {this.props.categories.map((category, cIndex) => {
                        return (
                            <React.Fragment key={category.name}>
                                <H6>{category.name}</H6>
                                <SubBlockContainer>
                                    {category.donatables.map((donatable, dIndex) => {
                                        return (
                                            <Checkbox name={donatable.name}
                                                key={category.name + donatable.name}
                                                value={this.props.categories[cIndex].donatables[dIndex].checked}
                                                label={donatable.name}
                                                onChange={this.props.onChange(cIndex, dIndex)}
                                            />
                                        )
                                    })}
                                </SubBlockContainer>
                            </React.Fragment>
                        )
                    })}
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
    margin-bottom: 20px;
    margin-top: 20px;
`;

const SubBlockContainer = styled.div`
    width: 250px;
    margin: 10px;
    margin-left: 20px;
`;

export default CategoryCheckboxes