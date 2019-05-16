import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { dynamicSort, highlightText } from "../utils";
import * as React from "react";

export interface IServiceDetail {
    name: string;
    comments?: string;
    uiElement?: string;
    mandatory?: string;  
}

const NAMES: string[] = [
    'Pickup is not at a storage unit', 'All items are on the ground floor', 'A service elevator is present',
    'At least one piece of furniture is being donated', 'Someone will be present at the pickup',
];

export const PREPACKAGED_SERVICE_DETAILS: IServiceDetail[] = NAMES.map((name) => ({
    name
})).sort(dynamicSort('name'));


export const renderServiceDetail: ItemRenderer<IServiceDetail> = (serviceDetail, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            onClick={handleClick}
            text={highlightText(serviceDetail.name, query)}
        />
    );
};

export const filterServiceDetail: ItemPredicate<IServiceDetail> = (query, serviceDetail) => {
    return `${serviceDetail.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

export const serviceDetailSelectProps = {
    itemPredicate: filterServiceDetail,
    itemRenderer: renderServiceDetail,
    items: PREPACKAGED_SERVICE_DETAILS,
};

