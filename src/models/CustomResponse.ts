import { CountryDetailsModel, NeighbourCountry, WorldRank } from "./WorldRank";

export interface CustomResponse {
   data:WorldRank[];
   success:boolean;
   fail:boolean;
   error:string;
}
export interface CustomResponseDetails {
   data:{
      countryDetailsData: CountryDetailsModel|null;
      neighbourDetailsData: NeighbourCountry[];
   };
   success:boolean;
   fail:boolean;
   error:string|null;
}