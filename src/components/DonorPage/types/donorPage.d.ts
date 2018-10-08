export interface IDonatable {
    name: string;
    comments?: string;
    minAmount?: number;
    maxAmount?: number;
}

export interface ICategory {
    name: string;
    donatables: IDonatable[];
}

export interface IDonatableRestriction {
    name: string;
    comments: string;
}

export interface IServiceDetail {
    name: string;
    comments: string;
    uiElement: string;  
}