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
        }
    }

    handleDonatableSelect = (donatable, action) => {
        switch (action.action) {
            case 'select-option':
                if (this.props.selectedDonatables.some(sd => (sd.label === donatable.label))) {
                    break;
                }
                this.props.onChange(donatable.cIndex, donatable.dIndex, donatable)
                break;
            case 'clear':
                this.props.handleSelectedDonatableChange(null)
                break;
        }
    }

    handleRestrictionsClick = () => {
        this.setState({ isRestrictionsOpen: !this.state.isRestrictionsOpen })
    }

    render() {
        const { selectedDonatable, selectedDonatables } = this.props;
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
                    <CategorySelect onChange={this.handleDonatableSelect} categories={this.props.categories} selectedDonatable={selectedDonatable} />
                </SelectBlock>
                <SubBlockContainer>
                    <Transition
                        items={selectedDonatables} keys={selectedD => `NI${selectedD.value.name}`}
                        from={{ opacity: 0, transform: 'translate3d(0,-20%,0)' }}
                        enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                        leave={{ opacity: 0, transform: 'translate3d(0,-20%,0)' }}>
                        {sd => props =>
                            <CategoryContainer key={`Category${sd.value.name}`} style={props}>
                                <CategoryName>
                                    {`${sd.value.name}`}
                                </CategoryName>
                                <CategoryControls>
                                    {this.props.donations[sd.value.name] < 2 ?
                                        <Icon onClick={() => this.props.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name, 'x')}
                                            icon='delete'
                                        />
                                        :
                                        <Icon onClick={() => this.props.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name, '-')}
                                            icon='minus'
                                        />
                                    }
                                    <span>  {this.props.donations[sd.value.name]}  </span>
                                    <Icon onClick={() => this.props.handleQuantityChange(sd.cIndex, sd.dIndex, sd.value.name, '+')}
                                        icon='add'
                                    />
                                </CategoryControls>
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
    width: 100%;
`

const CategoryName = styled.span`
    width: 50%;
`
const CategoryControls = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;

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
    width: 100%;
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