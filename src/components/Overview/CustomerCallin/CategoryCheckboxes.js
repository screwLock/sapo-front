import * as React from './node_modules/react'
import { Button, Callout, Checkbox, Collapse, FormGroup, H4, H6, Intent, NumericInput} from './node_modules/@blueprintjs/core'
import styled from './node_modules/styled-components'

class CategoryCheckboxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRestrictionsOpen: false
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
                    {this.props.categories.map((category, cIndex) => {
                        return (
                            <React.Fragment key={category.name}>
                                <H6>{category.name}</H6>
                                <SubBlockContainer>
                                    {category.donatables.map((donatable, dIndex) => {
                                        return (
                                            <CategoryContainer key={`Category${category.name+donatable.name}`}>
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
                                                                width: '40px',
                                                                height: '25px',
                                                                padding: '10px',
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

const CategoryContainer = styled.span`
    display: flex;
    justify-content: space-between;
    height: 30px;
`

const SubBlockContainer = styled.div`
    width: 300px;
    margin: 10px;
    margin-left: 20px;
`;

const Restrictions = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 25px;
`

const RText = styled.sup`
    font-size: 12px;
    font-style: italic;
    :hover {
        color: blue;
    }
`

export default CategoryCheckboxes