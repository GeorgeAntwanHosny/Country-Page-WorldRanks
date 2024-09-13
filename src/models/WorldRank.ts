export interface WorldRank {
    flags:Flag;
    name:string;
    code:string;
    region:string;
    population:number;
    area:number;
    independent:boolean;
    unMember:boolean;
    subregion:string;
    borders:string[];
}
export interface CountryDetailsModel {
    name:{
        common:string,
        official:string,
    };
    code:string;
    flags:Flag;
    population:number;
    area:number;
    capital:string;
    subregion:string;
    languages:string;
    continents:string;
    currencies:string;
}
export interface NeighbourCountry{
    name:{
        common:string,
        official:string,
    };
    code:string;
    flags:Flag;
}
export interface Flag{
    png:string;
    svg: string;
    alt: string;
}

export interface FilterBy{
    sort_by:'population'| 'areakm2'| 'alphabetical';
    region:string[];
    status:{
        independent:boolean;
        unMember:boolean;
    };
    search:string;
}