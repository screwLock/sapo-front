import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { dynamicSort, highlightText } from "../utils";
import * as React from "react";
import { IDonatable } from './Donatables';

export interface ICategory {
    name: string;
    donatables: IDonatable[];
    comments?: string;
}

const CATEGORY_NAMES: string[] = [
    "Electronics", "Furniture", "Clothing", "Clothing, Shoes, And Jewelry", "Kitchen Appliances",
    "Construction Materials", "Sports Equipment", "Rugs", "Tools", "Miscellaneous Items", 
    "Media", "Musical Instruments", "Large Items", "Knick Knacks", "Outdoor Equipment",
    "Lawn Equipment", "Appliances", "Office", "Tv and Home Theatre", "Computers and Tablets",
    "Commercial Office", "Fitness Equipment", "Commercial Appliances", "Restaurant Appliances and Equipment"
]
export const PREPACKAGED_CATEGORIES: ICategory[] = CATEGORY_NAMES.map( name => ({
    name,
    donatables: []
})).sort(dynamicSort('name'));

export const renderCategory: ItemRenderer<ICategory> = (category, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            onClick={handleClick}
            text={highlightText(category.name, query)}
        />
    );
};

export const filterCategory: ItemPredicate<ICategory> = (query, category) => {
    return `${category.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

export const categorySelectProps = {
    itemPredicate: filterCategory,
    itemRenderer: renderCategory,
    items: PREPACKAGED_CATEGORIES,
};

