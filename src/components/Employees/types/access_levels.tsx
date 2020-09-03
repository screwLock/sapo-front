import { MenuItem } from "@blueprintjs/core";
import { ItemRenderer } from "@blueprintjs/select";
import * as React from "react";

export interface IAccessLevel {
    /** Access level. */
    accessLevel: string
}

export const ACCESS_LEVELS: IAccessLevel[] = [
    { accessLevel: "Volunteer" },
    { accessLevel: "Contractor" },
    { accessLevel: "Driver" },
    { accessLevel: "Employee" },
    { accessLevel: "Manager"}
];

export const renderAccessLevel: ItemRenderer<IAccessLevel> = (level, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            // label={level.accessLevel}
            key={level.accessLevel}
            onClick={handleClick}
            text={`${level.accessLevel}`}
            
        />
    );
};

export const accessLevelSelectProps = {
    // itemPredicate: filterFilm,
    itemRenderer: renderAccessLevel,
    items: ACCESS_LEVELS,
    filterable: false
};