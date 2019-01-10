import * as React from 'react'
import { Button, ControlGroup, InputGroup, H3, H5, MenuItem, RadioGroup, Radio } from "@blueprintjs/core"
import { Select } from '@blueprintjs/select'
import * as Categories from "./types/Categories"
import * as Donatables from "./types/Donatables"
import { produce } from 'immer'
import styled from 'styled-components'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class DonorPageCategories extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedCategory: Categories.PREPACKAGED_CATEGORIES[0] as Categories.ICategory,
            selectedDonatable: Donatables.PREPACKAGED_DONATABLES[0] as Donatables.IDonatable,
            categoryName: '',
            categoryDonatables: [],
            radioCategory: 'one',
            radioDonatable: 'one',
            showDonatables: false,
            donatableName: '',
        };
    }

    public render() {
        return (
            <div>
                <H3>Create a New Donation Category</H3>
                <DialogContainer>
                    <RadioGroup
                        inline={true}
                        onChange={this.handleRadioCategoryChange}
                        selectedValue={this.state.radioCategory}
                    >
                        <Radio inline={true} label="Select A Category" value='one' />
                        <Radio inline={true} label="Create A Custom Category" value='two' />
                    </RadioGroup>
                    <BlockContainer>
                        {this.renderRadioCategoryChoice()}
                    </BlockContainer>
                    {this.renderDonatables()}
                </DialogContainer>
            </div >
        );
    }

    protected renderRadioCategoryChoice = () => {
        const CategorySelect = Select.ofType<Categories.ICategory>();
        if (this.state.radioCategory === 'one') {
            return (
                <CategorySelect
                    items={Categories.categorySelectProps.items}
                    itemPredicate={Categories.categorySelectProps.itemPredicate}
                    itemRenderer={Categories.categorySelectProps.itemRenderer}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleCategoryValueChange}
                >
                    <Button
                        rightIcon="caret-down"
                        text={this.state.selectedCategory ? `${this.state.selectedCategory.name}` : "(No selection)"}
                    />
                </CategorySelect>
            )
        }
        else if (this.state.radioCategory === 'two') {
            return (
                <ControlGroup>
                    <InputGroup placeholder="Category Name" name='category' onBlur={this.handleCategoryBlur} />
                </ControlGroup>
            )
        }
        else {
            return '';
        }
    }

    protected renderDonatables = () => {
        if (this.state.showDonatables) {
            return (
                <BlockContainer>
                    <H5>Now Add Donatables to {this.state.categoryName}</H5>
                    <RadioGroup
                        inline={true}
                        onChange={this.handleRadioDonatableChange}
                        selectedValue={this.state.radioDonatable}
                    >
                        <Radio inline={true} label="Select A Donatable" value='one' />
                        <Radio inline={true} label="Create A Custom Donatable" value='two' />
                    </RadioGroup>
                    {this.renderRadioDonatableChoice()}
                    {this.state.categoryDonatables.map((donatable: any) => <li key={donatable.name}>{donatable.name}</li>)}
                </BlockContainer>
            )
        }
        else {
            return ''
        }
    }

    protected renderRadioDonatableChoice = () => {
        const DonatableSelect = Select.ofType<Donatables.IDonatable>();
        if (this.state.radioDonatable === 'one') {
            return (
                <div>
                    <DonatableSelect
                        items={Donatables.donatableSelectProps.items}
                        itemPredicate={Donatables.donatableSelectProps.itemPredicate}
                        itemRenderer={Donatables.donatableSelectProps.itemRenderer}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        onItemSelect={this.handleDonatableValueChange}
                    >
                        <Button
                            rightIcon="caret-down"
                            text={this.state.selectedDonatable ? `${this.state.selectedDonatable.name}` : "(No selection)"}
                        />
                    </DonatableSelect>
                    <Button
                        rightIcon="add"
                        onClick={this.addDonatable}
                    />
                </div>
            )
        }
        else if (this.state.radioDonatable === 'two') {
            return (
                <div>
                    <ControlGroup>
                        <InputGroup placeholder="Donatable Name" name='donatable' onBlur={this.handleDonatableBlur} />
                        <Button rightIcon="add" onClick={this.addCustomDonatable} />
                    </ControlGroup>
                </div>
            )
        }
        else {
            return '';
        }
    }


    protected handleCategoryValueChange = (category: Categories.ICategory) => {
        this.setState(produce(draft => {
            draft.selectedCategory = category,
                draft.showDonatables = true,
                draft.categoryName = category.name
        })
        )
    }

    protected handleDonatableValueChange = (donatable: Donatables.IDonatable) => {
        this.setState(produce(draft => { draft.selectedDonatable = donatable })
        )
    }

    protected addDonatable = () => {
        if (!(this.state.categoryDonatables.filter((d: any) => (d.name === this.state.selectedDonatable.name)).length > 0)) {
            this.setState(produce(draft => { draft.categoryDonatables.push(draft.selectedDonatable) }))
            return true
        }
        else {
            return false;
        }
    }

    protected addCustomDonatable = () => {
        if (!(this.state.categoryDonatables.filter((d: any) => (d.name === this.state.donatableName)).length > 0)
            && !(this.state.donatableName === '')) {
            const customDonatable = {
                name: this.state.donatableName,
            }
            this.setState(produce(draft => { draft.categoryDonatables.push(customDonatable) }))
            return true;
        }
        else {
            return false;
        }
    }

    protected handleCategoryBlur = (e: any) => {
        this.setState({ categoryName: e.target.value, showDonatables: true });
    }

    protected handleDonatableBlur = (e: any) => {
        this.setState({ donatableName: e.target.value });
    }

    protected handleRadioCategoryChange = (e: any) => {
        this.setState({ radioCategory: e.currentTarget.value })
    }

    protected handleRadioDonatableChange = (e: any) => {
        this.setState({ radioDonatable: e.currentTarget.value })
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

export default DonorPageCategories;