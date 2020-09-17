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
            selectedDonatables: [],
        }
    }

    handleDonatableSelect = (donatable, action) => {
        switch (action.action) {
            case 'select-option':
                if (this.state.selectedDonatables.some(sd => (sd.label === donatable.label))) {
                    break;
                }
                this.setState({
                    selectedDonatable: this.props.categories[donatable.cIndex].donatables[donatable.dIndex],
                    selectedDonatables: [...this.state.selectedDonatables, donatable]
                });
                this.props.onChange(donatable.cIndex, donatable.dIndex)
                break;
            case 'clear':
                this.setState({
                    selectedDonatable: null,
                });
                break;
        }
    }

    handleBlur = (cIndex, dIndex, name) => (e) => {
        if (e.target.value === '0' || e.target.value === '') {
            const filteredDonatables = this.state.selectedDonatables.filter(sd => (sd.value.name !== name))
            this.setState({ selectedDonatables: filteredDonatables })
        }
        this.props.handleQuantityChange(cIndex, dIndex)(e)
    }

    handleRestrictionsClick = () => {
        this.setState({ isRestrictionsOpen: !this.state.isRestrictionsOpen })
    }

    render() {
        const { selectedDonatable, selectedDonatables } = this.state;
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
                    <CategorySelect onChange={this.handleDonatableSelect} categories={this.props.categories} selectedDonatable={this.state.selectedDonatable} />
                    {selectedDonatables.length !== 0 ? (
                        <SubBlockContainer>
                            {selectedDonatables.map(sd => {
                                return (
                                    <CategoryContainer key={`Category${sd.value.name}`}>
                                        <FormGroup label={`${sd.value.name}`} inline={true}>
                                            <NumericInput
                                                autoFocus
                                                key={`NI${sd.value.name}`}
                                                name={sd.value.name}
                                                value={this.props.donations[sd.value.name]}
                                                onBlur={this.handleBlur(sd.cIndex, sd.dIndex, sd.value.name)}
                                                // disabled={!this.props.categories[cIndex].donatables[dIndex].checked}
                                                buttonPosition='none'
                                                style={{
                                                    width: '3em',
                                                    height: '2em',
                                                    padding: '1em',
                                                }}
                                            />
                                        </FormGroup>
                                    </CategoryContainer>
                                )
                            })}
                        </SubBlockContainer>
                    ) : (<div></div>)
                    }
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

const SubBlockContainer = styled.div`
    width: 100%;
    margin: 1em;
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Restrictions = styled.div`
    width: 100%;
    margin-bottom: 1em;
`

const RText = styled.sup`
    font-size: 12px;
    font-style: italic;
    :hover {
        color: blue;
    }
`

export default CategoryCheckboxes