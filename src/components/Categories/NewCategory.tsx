/* eslint-disable */
import * as React from 'react'
import { Button, ControlGroup, InputGroup, H3, H5, MenuItem, RadioGroup, Radio } from "@blueprintjs/core"
import { Select } from '@blueprintjs/select'
import * as Categories from "./types/Categories"
import * as Donatables from "./types/Donatables"
import { produce } from 'immer'
import styled from 'styled-components'
import { AppToaster } from '../Toaster'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class NewCategory extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedCategory: { name: 'Select A Category', donatables: [] } as Categories.ICategory,
            selectedDonatable: { name: 'Select A Donatable' } as Donatables.IDonatable,
            categoryName: '',
            categoryDonatables: [],
            categories: [],
            radioCategory: 'one',
            radioDonatable: 'one',
            showDonatables: false,
            donatableName: '',
            canSave: false
        };
    }

    public componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        if (this.props.userConfig.categories != null) {
            this.setState({
                categories: this.props.userConfig.categories
            }, () => { console.log(this.state.categories) })
        }
    }

    public render() {
        return (
            <div>
                <H3>Create a New Donation Category</H3>
                <Container>
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
                    <ButtonRow>
                        <Button text='Save Categories' disabled={!this.state.canSave} onClick={this.saveCategories} />
                    </ButtonRow>
                </Container>
            </div >
        );
    }

    protected renderRadioCategoryChoice = () => {
        const CategorySelect = Select.ofType<Categories.ICategory>();
        const selectStyle = { width: '200px' }
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
                        style={selectStyle}
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
        const liStyle = { width: '200px' }
        const ulStyle = { listStyleType: 'none', padding: '0px' }
        if (this.state.showDonatables && (this.state.categoryName !== '')) {
            return (
                <React.Fragment>
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
                        {this.renderCategories()}
                    </BlockContainer>
                </React.Fragment>
            )
        }
        else {
            return ''
        }
    }

    protected renderRadioDonatableChoice = () => {
        const selectStyle = { width: '200px' }
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
                            fill={true}
                            text={this.state.selectedDonatable ? `${this.state.selectedDonatable.name}` : "(No selection)"}
                            style={selectStyle}
                        />
                    </DonatableSelect>
                    <Button
                        rightIcon="add"
                        onClick={this.addDonatable}
                        minimal={true}
                    />
                </div>
            )
        }
        else if (this.state.radioDonatable === 'two') {
            return (
                <div>
                    <ControlGroup>
                        <InputGroup placeholder="Donatable Name" name='donatable' onBlur={this.handleDonatableBlur} />
                        <Button rightIcon="add" onClick={this.addDonatable} />
                    </ControlGroup>
                </div>
            )
        }
        else {
            return '';
        }
    }

    protected renderCategories = () => {
        const liStyle = { width: '500px' }
        const ulStyle = { listStyleType: 'none', padding: '0px' }
        const donatableStyle = { marginLeft: '20px' }
        return (
            <div>
                <H5>Categories</H5>
                <ul style={ulStyle}>
                    {this.state.categories.map((category: any, index: number) => {
                        return (<li style={liStyle} key={category.name}>
                            <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index)} />
                            {category.name}
                            <ul style={{ listStyleType: 'disc' }}>
                                {category.donatables.map((donatable: any, index: number) => {
                                    return (<li style={donatableStyle} key={donatable.name}>{donatable.name}</li>)
                                })}
                            </ul>
                        </li>)
                    })}
                </ul>
            </div>
        )
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
        this.setState(produce(draft => { draft.selectedDonatable = donatable, draft.donatableName = donatable.name })
        )
    }


    // removes an object from an array with the associated key:value pair
    // and returns the altered array
    protected remove = (array: any[], key: string, value: string) => {
        const index = array.findIndex(obj => obj[key] === value);
        return index >= 0 ? [
            ...array.slice(0, index),
            ...array.slice(index + 1)
        ] : array;
    }

    protected addDonatable = () => {
        let donatable = {
            name: ''
        };
        // we need to make sure we are using the donatable that applies to the radio choice
        // if it's from the select element (radio choice === 'one')...
        if (this.state.selectedDonatable.name !== 'Select A Donatable' && this.state.radioDonatable === 'one') {
            donatable = {
                name: this.state.selectedDonatable.name,
            }
        }
        // or if it's from the input element (radio choice === 'two')
        else if (this.state.donatableName.length > 0 && this.state.radioDonatable === 'two') {
            donatable = {
                name: this.state.donatableName,
            }
        }
        else {
            return false;
        }

        let categoryNames = this.state.categories.map((category: any) => category.name);
        // if the category name is present...
        if (categoryNames.includes(this.state.categoryName)) {
            // ... get the old category object ...
            let oldCategory = this.state.categories.find((category: any) => { return category.name === this.state.categoryName })
            // ...make sure the donatable is not a duplicate
            if (oldCategory.donatables.filter((d: any) => { return d.name === donatable.name }).length > 0) {
                return false
            }
            // ... create the newCategory from the old category
            let newDonatables = [...oldCategory.donatables, donatable]
            let newCategory = { name: oldCategory.name, donatables: newDonatables }
            let newCategories = [...this.state.categories]
            // ... remove the old category
            newCategories = this.remove(newCategories, 'name', this.state.categoryName)
            newCategories.push(newCategory)
            // ...and save the new categories
            this.setState(produce(draft => {
                draft.categories = [...newCategories]
            })
            )
            return true
        }
        // else create the category with the donatable
        // if it does not exist
        else {
            let newCategory = this.state.categoryName
            this.setState(produce(draft => {
                draft.categories.push(
                    { name: newCategory, donatables: [donatable] }
                )
            })
            )
        }
    }

    protected handleDeleteDonatable = (index: number) => () => {
        const donatables = [...this.state.categoryDonatables];
        donatables.splice(index, 1)
        if (this.state.categoryDonatables.length > 1) {
            this.setState({ categoryDonatables: donatables })
        }
        else {
            this.setState({
                categoryDonatables: donatables,
                canSave: false,
            });
        }
    }

    protected handleDelete = (index: number) => () => {
        const categories = [...this.state.categories];
        categories.splice(index, 1)
        this.setState({ categories: categories })
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

    protected showToast = (message: string) => {
        AppToaster.show({ message: message });
    }

    protected saveCategories = async () => {
        if (this.state.categories.length === 0) {
            this.showToast('Add at least one donations category')
        }
        else {
            try {
                await this.props.updateUserConfig('categories', {
                    categories: this.state.categories,
                },
                    {
                        categories: this.state.categories,
                    }
                )
            }
            catch (e) {
                alert(e)
            }
        }
    }

}

const Container = styled.div`
    width: 400px;
    margin: 20px;
`

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export default NewCategory;