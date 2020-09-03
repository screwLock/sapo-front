export interface IPickup {
    streetAddress: string;
    lat: number;
    lng: number;
    date: Date;
    inRoute?: boolean;
}