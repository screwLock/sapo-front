import * as React from 'react'
import { H4, H6, Checkbox } from '@blueprintjs/core'
import { produce } from 'immer'
import styled from 'styled-components'

class CategoryCheckboxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            categories: this.props.categories
        })
    }

    handleCheckedChange = (cIndex, dIndex) => (e) => {
        this.setState(
            produce(this.state, draft => {
                draft.categories[cIndex].donatables[dIndex].checked = !draft.categories[cIndex].donatables[dIndex].checked
            }))
    }

    renderCategories = (categories) => {
        return (
            <BlockContainer>
                <H4>Select Donations</H4>
                {categories.map((category, cIndex) => {
                    return (
                        <React.Fragment>
                            <H6>{category.name}</H6>
                            <SubBlockContainer>
                                {category.donatables.map((donatable, dIndex) => {
                                    return (
                                        <Checkbox name={donatable.name}
                                            // key={category.name + donatable.name}
                                            checked={this.state.categories[cIndex].donatables[dIndex].checked}
                                            label={donatable.name}
                                            onChange={this.handleCheckedChange(cIndex, dIndex)}
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

    render() {
        return (
            <React.Fragment>
                {this.props.isVisible ? this.renderCategories(this.state.categories) : ''}
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

export default CategoryCheckboxes