import * as React from 'react'
import { Button, ControlGroup, InputGroup, H3, MenuItem, RadioGroup, Radio } from "@blueprintjs/core"
import { produce } from 'immer'
import styled from 'styled-components'
import { Select } from '@blueprintjs/select'
import * as Restrictions from './types/DonatableRestrictions'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class NewRestriction extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            selectedRestriction: Restrictions.PREPACKAGED_RESTRICTIONS[0] as Restrictions.IDonatableRestriction,
            radioRestriction: 'one',
            restrictions: [],
            restriction: '',
        }
    }

    public render() {
        const liStyle = {width: '200px'}
        const ulStyle={ listStyleType: 'none', padding: '0px'}
        return (
            <div>
                <H3>Create a New Donation Restriction</H3>
                <DialogContainer>
                    <RadioGroup
                        inline={true}
                        onChange={this.handleRadioRestrictionChange}
                        selectedValue={this.state.radioRestriction}
                    >
                        <Radio inline={true} label="Select A Restriction" value='one' />
                        <Radio inline={true} label="Create A Custom Restriction" value='two' />
                    </RadioGroup>
                    <BlockContainer>
                        {this.renderRadioRestrictionChoice()}
                        <ul style={ulStyle}>
                            {this.state.restrictions.map(
                                (restriction: any, index: number) =>
                                    (<li style={liStyle} key={restriction.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDeleteRestriction(index)} />{restriction.name}</li>)
                            )}
                        </ul>
                    </BlockContainer>
                </DialogContainer>
            </div>
        )
    }

    protected addRestriction = () => {
        if (!(this.state.restrictions.filter((d) => (d.name === this.state.selectedRestriction.name)).length > 0)) {
            this.setState(produce(draft => { draft.restrictions.push(draft.selectedRestriction) }), () => {
                this.props.createSubmittable(this.state.restrictions);
            })
            this.props.canSubmit(true);
            return true
        }
        else {
            return false;
        }
    }

    protected addCustomRestriction = () => {
        if (!(this.state.restrictions.filter((d: any) => (d.name === this.state.restriction)).length > 0)
            && !(this.state.restriction === '')) {
            const customRestriction = {
                name: this.state.restriction,
            }
            this.setState(produce(draft => { draft.restrictions.push(customRestriction) }), () => {
                this.props.createSubmittable(this.state.restrictions)
            })
            this.props.canSubmit(true);
            return true;
        }
        else {
            return false;
        }
    }

    protected handleDeleteRestriction = (index:number) => () => {
        const newRestrictions = [...this.state.restrictions];
        newRestrictions.splice(index, 1)
        // need to ensure delete is reflected in restriction listings 
        this.props.createSubmittable(newRestrictions)
        if(this.state.restrictions.length > 1) {
            this.setState({restrictions: newRestrictions})
        }
        else {
            this.props.canSubmit(false)
            this.setState({restrictions: newRestrictions})
        }
    }

    protected handleRestrictionBlur = (e) => {
        this.setState({ restriction: e.target.value });
    }

    protected handleRestrictionValueChange = (restriction) => {
        this.setState(produce(draft => { draft.selectedRestriction = restriction }))
    }

    protected handleRadioRestrictionChange = (e) => {
        this.setState({ radioRestriction: e.currentTarget.value })
    }

    protected renderRadioRestrictionChoice = () => {
        const RestrictionSelect = Select.ofType<Restrictions.IDonatableRestriction>();
        const selectStyle = { width: '200px' }
        if (this.state.radioRestriction === 'one') {
            return (
                <div>
                    <RestrictionSelect
                        items={Restrictions.restrictionSelectProps.items}
                        itemPredicate={Restrictions.restrictionSelectProps.itemPredicate}
                        itemRenderer={Restrictions.restrictionSelectProps.itemRenderer}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        onItemSelect={this.handleRestrictionValueChange}
                    >
                        <Button
                            rightIcon="caret-down"
                            style={selectStyle}
                            text={this.state.selectedRestriction ? `${this.state.selectedRestriction.name}` : "(No selection)"}
                        />
                    </RestrictionSelect>
                    <Button
                        rightIcon="add"
                        onClick={this.addRestriction}
                        minimal={true}
                    />
                </div>
            )
        }
        else if (this.state.radioRestriction === 'two') {
            return (
                <ControlGroup>
                    <InputGroup placeholder="Restriction Name" name='restriction' onBlur={this.handleRestrictionBlur} />
                    <Button
                        rightIcon="add"
                        onClick={this.addCustomRestriction}
                        minimal={true}
                    />
                </ControlGroup>
            )
        }
        else {
            return '';
        }
    }
}

const DialogContainer = styled.div`
    width: 400px;
    margin: 20px;
`

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

export default NewRestriction;