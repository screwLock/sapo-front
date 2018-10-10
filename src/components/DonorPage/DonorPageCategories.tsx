import * as React from 'react';
import { Button, ControlGroup, InputGroup, H3, MenuItem } from "@blueprintjs/core";
import { Select } from '@blueprintjs/select';
import * as Categories from "./types/Categories";
import * as Donatables from "./types/Donatables";
import { produce } from 'immer';

class DonorPageCategories extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedCategory: Categories.PREPACKAGED_CATEGORIES[0] as Categories.ICategory,
            selectedDonatable: Donatables.PREPACKAGED_DONATABLES[0] as Donatables.IDonatable
        };
    }

    public render() {
        const CategorySelect = Select.ofType<Categories.ICategory>();
        const DonatableSelect = Select.ofType<Donatables.IDonatable>();

        return (
            <div>
                <H3>Create a New Donation Category</H3>
                <ControlGroup>
                    <InputGroup placeholder="Category Name" />
                    <Button icon="plus" text="Create New Category" />
                </ControlGroup>
                <CategorySelect
                    items={Categories.categorySelectProps.items}
                    itemPredicate={Categories.categorySelectProps.itemPredicate}
                    itemRenderer={Categories.categorySelectProps.itemRenderer}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleValueChange}
                    filterable={true}
                >
                    <Button
                        icon="small-plus"
                        rightIcon="caret-down"
                        text={this.state.selectedCategory ? `${this.state.selectedCategory.name}` : "(No selection)"}
                    />
                </CategorySelect>
                <DonatableSelect
                    items={Donatables.donatableSelectProps.items}
                    itemPredicate={Donatables.donatableSelectProps.itemPredicate}
                    itemRenderer={Donatables.donatableSelectProps.itemRenderer}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleDonatableValueChange}
                    filterable={true}
                >
                    <Button
                        icon="small-plus"
                        rightIcon="caret-down"
                        text={this.state.selectedDonatable ? `${this.state.selectedDonatable.name}` : "(No selection)"}
                    />
                </DonatableSelect>
            </div >
        );
    }

    protected handleValueChange = (category: Categories.ICategory) => {
        this.setState(produce(draft => { draft.selectedCategory = category })
        )
    }

    protected handleDonatableValueChange = (donatable: Donatables.IDonatable) => {
        this.setState(produce(draft => { draft.selectedDonatable = donatable })
        )
    }

}

export default DonorPageCategories;