import { CustomResponse, CustomResponseDetails } from "../models/CustomResponse";
import { CountryDetailsModel, NeighbourCountry } from "../models/WorldRank";

export const getAllWorldRankAPIs = async():Promise<CustomResponse> =>{
    try{
        const responseData = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,unMember,independent,cca2');
        if(responseData.ok){
            const data = await responseData.json();
            // console.log(data);
            // Transform the incoming data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const transformedData = data.map((country: any) => ({
                name: country.name.common, // Selecting the 'common' name field
                flags: {
                    png:country.flags.png,
                    svg: country.flags.svg,
                    alt: country.flags.alt,
                }, // Selecting the first flag URL
                population: country.population, // Selecting the population
                area: country.area, // Selecting the area
                region: country.region, // Selecting the region
                independent: country.independent,
                unMember: country.unMember,
                subregion: country.subregion,
                code: country.cca2,
            }));
            // console.log("data: ",data)
            return {data: transformedData,error:'',fail:false,success:true};
        }
        return {data:[],error:"Couldn't get data",fail:true,success:false};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        return {data:[],error:error.message,fail:true,success:false};
    }
}
export const getCountryDetailsWithNieghbour =async (code:string):Promise<CustomResponseDetails>=>{
    // try{
        const countryDetailsResponse =  await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if(countryDetailsResponse.ok){
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const countryResponse:any = await countryDetailsResponse.json();
             
            const country = countryResponse[0];
            const neighboursCodes =country.borders?.join(',');// to convert from array['d','f'] to 'd,f'
            const countryDetailsDataFormated : CountryDetailsModel = {
                name: {
                    common:country.name.common,
                    official:country.name.official
                }, 
                code: country.cca2,
                flags: {
                    png:country.flags.png,
                    svg: country.flags.svg,
                    alt: country.flags.alt,
                }, // Selecting the first flag URL
                population: country.population, // Selecting the population
                area: country.area, // Selecting the area
                capital:country.capital.join(','),
                subregion:country.subregion,
                languages:languageFormate(country.languages),
                continents:country.continents.join(','),
                currencies:currenciesFormate(country.currencies),
            };
            const neighbourDetailsResponse =  await fetch(`https://restcountries.com/v3.1/alpha?codes=${neighboursCodes}`);
            if(neighbourDetailsResponse.ok){
                const neighbourDetailsData= await neighbourDetailsResponse.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const neighbourDetailsDataFormated : NeighbourCountry[]= neighbourDetailsData.map((neighbourDetail:any)=>(
                    {
                        name: {
                            common:neighbourDetail.name.common,
                            official:neighbourDetail.name.official
                        }, 
                        flags: {
                            png:neighbourDetail.flags.png,
                            svg: neighbourDetail.flags.svg,
                            alt: neighbourDetail.flags.alt,
                        },
                        code: neighbourDetail.cca2,
                    }
                ));
                // console.log({countryDetailsData: countryDetailsDataFormated,
                //     neighbourDetailsData:neighbourDetailsDataFormated,
                // })
                return {
                    data:{countryDetailsData: countryDetailsDataFormated,
                        neighbourDetailsData:neighbourDetailsDataFormated,
                    },
                    error:null,fail:false,success:true
                }
            }
            return {
                data:{
                    countryDetailsData: countryDetailsDataFormated,
                    neighbourDetailsData:[],
                },
                error:null,fail:false,success:true
            }
        }
        return {
            data:{
                countryDetailsData: null,
                neighbourDetailsData:[] 
            },
            error:"couldn't get data try again later",fail:true,success:false
        }

       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // }catch(error:any){
    //     return {data:[],error:error.message,fail:true,success:false};
    // }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languageFormate = (lan:any) =>{
    const result =[];
    for(const l in lan){
        result.push(lan[l]) 
    }
    return result.join(',');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currenciesFormate = (currencies:any) =>{
    const result =[];
    for(const currencie in currencies){
         
        result.push(currencies[currencie].name) 
    }
    return result.join(',');
}
