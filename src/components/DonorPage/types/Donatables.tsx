import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { dynamicSort, highlightText } from "../utils";
import * as React from "react";

export interface IDonatable {
    name: string;
}

const NAMES: string[] = [
    'Lawnmowers', 'Power Landscaping Equipment (blowers, weedeaters, etc)', 'Garden Tools',
    'Grills - Charcoal', 'Grills - Propane', 'Grills-Indoor', 'Kitchen Appliances',
    'Patio Furniture', 'Clothing (bags or boxes)', 'Clothing - Mens', 'Clothing - Women',
    'Clothing - Children', 'Beds', 'Desks', 'Bookshelves', 'Kitchen Cabinets', 
    'Flat Screen TVs', 'CRT TVs', 'CRT Monitors', 'PC Monitors (Non-CRT)', 'Dishwashers',
    'Washers', 'Dryers', 'Jewelry', 'Rugs', 'Refrigerators', 'Microwaves', 'Large Pictures',
    'Pictures', 'Sports Equipment', 'Power Tools', 'Hand Tools', 'Tools', 'VHS/DVD/BluRay/CDs',
    'Books', 'PCs', 'Computers', 'Stoves', 'Freezers', 'Recliners', 'Sofas', 'Loveseats', 
    'End Tables', 'Coffee Tables', 'Tables', 'Couches', 'Nighstands', 'Head and Footboards',
    'Leather Couches', 'Leather Sofas', 'Chairs', 'Exercise Equipment', 'Elliptical Machines',
    'Treadmills', 'Exercise Equipment (Treadmills, Stationary Bikes, etc)', 'Bicycles', 'Luggage',
    'Area Rugs', 'Toys', 'Household Items', 'Printers and Scanners', 'Laptops and Desktops', 'Stereos',
    'Large Speakers', 'Miscellaneous Electronic Devices', 'Game Consoles', 'Books (boxes)',
    'Cribs', 'Pool Tables', 'Weights', 'Pianos', 'Musical Instruments', 'Musical Instruments (with Case)',
    'Vehicles', 'Boats', 'Entertainment Centers', 'Lamps', 'Telephone Systems', 'Cell Phones',
    'Consumer Electronics', 'Bed Frames', 'Swing Sets', 'Kitchen Cabinets', 'Bathroom Cabinets',
    'Doors', 'Windows', 'Lumber', 'Brick Pallets', 'Window ACs', 'Shutters', 'Stoves - wood', 'Shutters',
    'Stone Pavers', 'Architectural Columns', 'Mantels', 'Stained Glass Windows',
    'Recliners', 'Ottomans', 'Complete Faucets', "Bathroom Sinks - Pedestal", "Bathroom Sinks - Drop-In",
    'Kitchen Sinks', 'Kitchen Sinks - Stainless Steel', 'Kitchen Sinks - Porcelain', 'Marine Vessels',
    'Kayaks/Canoes', 'Small Furniture', 'Large Furniture'
];

export const PREPACKAGED_DONATABLES: IDonatable[] = NAMES.map((name) => ({
    name
})).sort(dynamicSort('name'));


export const renderDonatable: ItemRenderer<IDonatable> = (donatable, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            onClick={handleClick}
            text={highlightText(donatable.name, query)}
        />
    );
};

export const filterDonatable: ItemPredicate<IDonatable> = (query, donatable) => {
    return `${donatable.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

export const donatableSelectProps = {
    itemPredicate: filterDonatable,
    itemRenderer: renderDonatable,
    items: PREPACKAGED_DONATABLES,
};

