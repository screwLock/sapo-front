import * as React from 'react'
import { Button, Callout, Checkbox, Collapse, FormGroup, H4, H6, Intent, NumericInput } from '@blueprintjs/core'
import styled from 'styled-components'
import CategorySelect from './CategorySelect'

class CategoryCheckboxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRestrictionsOpen: false,
            selectedCategory: null,
        }
    }

    handleCategorySelect = (category, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    selectedCategory: category.value,
                });
                break;
            case 'clear':
                this.setState({
                    selectedCategory: null,
                });
                break;
        }
    }

    handleRestrictionsClick = () => {
        this.setState({ isRestrictionsOpen: !this.state.isRestrictionsOpen })
    }

    render() {
        if (this.props.isVisible) {
            return (
                <BlockContainer>
                    <H4>Select Donations
                        <Button onClick={this.handleRestrictionsClick}
                            minimal={true}
                        ><RText>*See Prohibited Items</RText></Button>
                    </H4>
                    <Restrictions>
                        <Collapse isOpen={this.state.isRestrictionsOpen}>
                            <Callout intent={Intent.WARNING} title='Prohibited Items'>
                                {this.props.restrictions.map(restriction => {
                                    return (<li key={restriction.name}>{restriction.name}</li>)
                                })}
                            </Callout>
                        </Collapse>
                    </Restrictions>
                    <CategorySelect onChange={this.handleCategorySelect} categories={this.props.categories} selectedCategory={this.state.selectedCategory}/>
                    <CategoryScroll>
                    {this.props.categories.map((category, cIndex) => {
                        return (
                            <React.Fragment key={category.name}>
                                <H6>{category.name}</H6>
                                <SubBlockContainer>
                                    {category.donatables.map((donatable, dIndex) => {
                                        return (
                                            <CategoryContainer key={`Category${category.name + donatable.name}`}>
                                                    <Checkbox name={donatable.name}
                                                        key={category.name + donatable.name}
                                                        value={this.props.categories[cIndex].donatables[dIndex].checked}
                                                        label={donatable.name}
                                                        onChange={this.props.onChange(cIndex, dIndex)}
                                                    />
                                                {this.props.categories[cIndex].donatables[dIndex].checked ? (
                                                    <FormGroup label="Qty" inline={true}>
                                                        <NumericInput
                                                            autoFocus
                                                            key={`NI${category.name + donatable.name}`}
                                                            name={donatable.name}
                                                            value={this.props.donations[donatable.name]}
                                                            onBlur={this.props.handleQuantityChange}
                                                            disabled={!this.props.categories[cIndex].donatables[dIndex].checked}
                                                            buttonPosition='none'
                                                            style={{
                                                                width: '3em',
                                                                height: '2em',
                                                                padding: '1em',
                                                            }}
                                                        />
                                                    </FormGroup>
                                                ) : ''
                                                }
                                            </CategoryContainer>
                                        )
                                    })}
                                </SubBlockContainer>
                            </React.Fragment>
                        )
                    })}
                    </CategoryScroll>
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }
}


const BlockContainer = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
    width: 100%;
`;

const CategoryContainer = styled.span`
    display: flex;
    justify-content: space-between;
    height: 3em;
`

const CategoryScroll = styled.div`
    height: 90vh;
    overflow: auto;
    width: 100%;
`

const SubBlockContainer = styled.div`
    width: 100%;
    margin: 1em;
    margin-left: 1em;
`;

const Restrictions = styled.div`
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 1em;
`

const RText = styled.sup`
    font-size: 12px;
    font-style: italic;
    :hover {
        color: blue;
    }
`

export default CategoryCheckboxes