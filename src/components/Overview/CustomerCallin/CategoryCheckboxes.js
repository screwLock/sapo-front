import * as React from 'react'
import { Button, Callout, Checkbox, Collapse, FormGroup, H4, H6, Icon, Intent, NumericInput } from '@blueprintjs/core'
import styled from 'styled-components'
import CategorySelect from './CategorySelect'
import { Spring, config, animated, Transition } from 'react-spring/renderprops';

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

    handleQuantityChange = (cIndex, dIndex, name, value) => {
        console.log(value)
        if (value === 'x') {
            const filteredDonatables = this.state.selectedDonatables.filter(sd => (sd.value.name !== name))
            this.setState({ selectedDonatables: filteredDonatables })
        }
        this.props.handleQuantityChange(cIndex, dIndex, name, value)
    }

    handleRestrictionsClick = () => {
        this.setState({ isRestrictionsOpen: !this.state.isRestrictionsOpen })
    }

    render() {
        const { selectedDonatable, selectedDonatables } = this.state;
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
                <SelectBlock>
                    <CategorySelect onChange={this.handleDonatableSelect} categories={this.props.categories} selectedDonatable={this.state.selectedDonatable} />
                </SelectBlock>
                <SubBlockContainer>
                    <Transition
                        items={selectedDonatables} keys={selectedDonatable => `NI${selectedDonatable.value.name}`}
                        from={{ opacity: 0, transform: 'translate3d(0,-20%,0)' }}
                        enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                        leave={{ opacity: 0, transform: 'translate3d(0,-20%,0)' }}>
                        {sd => props =>
                            <CategoryContainer key={`Category${sd.value.name}`} style={props}>
                                {`${sd.value.name}`}
                                    {this.props.donations[sd.value.name] === 1?
                                    <Icon onClick={() => this.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name, 'x')}
                                        icon='delete'
                                    />
                                    :
                                    <Icon onClick={() => this.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name, '-')}
                                        icon='minus'
                                    />
                                    }
                                    <span>  {this.props.donations[sd.value.name]}  </span>
                                    <Icon onClick={() => this.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name,'+')}
                                        icon='add'
                                    />
                            </CategoryContainer>
                        }
                    </Transition>
                </SubBlockContainer>
            </BlockContainer>
        )
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
    align-items: flex-start;
`;

const SelectBlock = styled.div`
    width: 60%;
`

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