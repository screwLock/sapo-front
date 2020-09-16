import * as React from 'react'
import { Button, Callout, Checkbox, Collapse, FormGroup, H4, H6, Intent, NumericInput } from '@blueprintjs/core'
import styled from 'styled-components'
import CategorySelect from './CategorySelect'

class CategoryCheckboxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRestrictionsOpen: false,
            selectedDonatable: null,
            cIndex: '',
        }
    }

    handleCategorySelect = (donatable, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    selectedDonatable: donatable.value,
                    cIndex: donatable.index
                });
                break;
            case 'clear':
                this.setState({
                    selectedDonatable: null,
                    cIndex: ''
                });
                break;
        }
    }

    handleRestrictionsClick = () => {
        this.setState({ isRestrictionsOpen: !this.state.isRestrictionsOpen })
    }

    render() {
        const cIndex = this.state.cIndex
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
                    <CategorySelect onChange={this.handleDonatableChange} categories={this.props.categories} selectedDonatable={this.state.selectedDonatable} />
                    <CategoryScroll>
                        {/*this.state.selectedCategory ? (
                            <React.Fragment>
                                <H6>{this.state.selectedCategory.name}</H6>
                                <SubBlockContainer>
                                    {this.props.categories[cIndex].donatables.map((donatable, dIndex) => {
                                        return (
                                            <CategoryContainer key={`Category${this.state.selectedCategory.name + donatable.name}`}>
                                                <Checkbox name={donatable.name}
                                                    key={this.state.selectedCategory.name + donatable.name}
                                                    value={this.state.selectedCategory.donatables[dIndex].checked}
                                                    label={donatable.name}
                                                    onChange={this.props.onChange(cIndex, dIndex)}
                                                />
                                                {this.props.categories[cIndex].donatables[dIndex].checked ? (
                                                    <FormGroup label="Qty" inline={true}>
                                                        <NumericInput
                                                            autoFocus
                                                            key={`NI${this.state.selectedCategory.name + donatable.name}`}
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
                        ) : (
                                <React.Fragment>''</React.Fragment>
                            )
                        */}
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