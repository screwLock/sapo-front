import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { dynamicSort, highlightText } from "../utils";
import * as React from "react";

export interface IDonatableRestriction {
    name: string;
    comments?: string;
}

export const PREPACKAGED_RESTRICTIONS_NAMES: string[] = [
    "Dirty Clothing", "Large Desks", "Ripped Furniture", "Broken Furniture", "Hospital Beds", "Propane Tanks", 
    "Chemicals and Hazardous Waste", "Paint","CRT TVs (Non Flat Screen)", "Sleeper Sofas", "Dishwashers"
];

export const PREPACKAGED_RESTRICTIONS: IDonatableRestriction[] = PREPACKAGED_RESTRICTIONS_NAMES.map((name) => ({
    name,
    comments: ''
})).sort(dynamicSort('name'));

export const renderRestriction: ItemRenderer<IDonatableRestriction> = (restriction, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            onClick={handleClick}
            text={highlightText(restriction.name, query)}
        />
    );
};

export const filterRestriction: ItemPredicate<IDonatableRestriction> = (query, restriction) => {
    return `${restriction.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

export const restrictionSelectProps = {
    itemPredicate: filterRestriction,
    itemRenderer: renderRestriction,
    items: PREPACKAGED_RESTRICTIONS,
};