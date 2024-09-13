import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetailsWithNieghbour } from "../services/Countries";
import { CountryDetailsModel, NeighbourCountry } from "../models/WorldRank";
import { Link } from "react-router-dom";

const CountryDetails: React.FC = () => {
  const { code } = useParams<Record<string, string | undefined>>();
  const [countryDetailsData, setCountryDetailsData] = React.useState<{
    data: {
        countryDetailsData: CountryDetailsModel|null;
        neighbourDetailsData: NeighbourCountry[];
    };
    error: string|null;
    fail: boolean;
    success: boolean;
    loading: boolean;
}>({
  data:{
    countryDetailsData:null,
    neighbourDetailsData:[],
  },
  error: null,
  fail: false,
  success: false,
  loading:true,
});
  useEffect(()=>{
    const getCountryDetails = async(code:string)=>{
      setCountryDetailsData({...countryDetailsData,loading:true});
      const data = await getCountryDetailsWithNieghbour(code);
      console.log("data: ",data);
      setCountryDetailsData({...data,loading:false});
    }
    if(code){
      getCountryDetails(code);

    }
    
  },[code]);
    if(countryDetailsData.loading){
      return <p> loading...</p>
    }
    return (
        <div className='bg-color_1  rounded-md grid grid-cols-1 gap-10 px-4 h-auto align-middle border-2  border-color_2 font-sans text-color_5 '>
            <img
             src={countryDetailsData.data.countryDetailsData?.flags.png}
             alt={countryDetailsData.data.countryDetailsData?.flags.alt}
             className="relative bottom-12 w-72 justify-self-center rounded-lg max-sm:w-52"
            />
            <div className="justify-self-center">
                <p className="text-3xl font-bold">{countryDetailsData.data.countryDetailsData?.name.common}</p>
                <p>{countryDetailsData.data.countryDetailsData?.name.official}</p>
            </div>
             <div className="grid grid-flow-col gap-5 grid-cols-2 h-10 max-sm:grid-cols-1 max-sm:grid-rows-2 max-sm:gap-10 max-sm:h-32">
                <div className="bg-color_2 text-color_5 grid grid-flow-col gap-4 rounded-lg p-3">
                    <p className="">Population</p>
                    <p className="text-color_1">|</p>
                    <p>{countryDetailsData.data.countryDetailsData?.population}</p>
                </div>
                <div className="bg-color_2 text-color_5 grid grid-flow-col gap-4 rounded-lg p-3">
                    <p className="">Area(km<sup>2</sup>)</p>
                    <p className="text-color_1">|</p>
                    <p>{countryDetailsData.data.countryDetailsData?.area}</p>
                </div>
             </div>
             <div className="flex flex-col w-full">
                <div className="w-full border-t-2 border-b-2 border-color_2 grid grid-flow-col justify-between h-14 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold">Capital</p>
                  <p>{countryDetailsData.data.countryDetailsData?.capital}</p>
                </div>
                <div className="w-full border-b-2 border-color_2 grid grid-flow-col justify-between h-14 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold">Subregion</p>
                  <p>{countryDetailsData.data.countryDetailsData?.subregion}</p>
                </div>
                <div className="w-full border-b-2 border-color_2 grid grid-flow-col justify-between h-14 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold">Language</p>
                  <p>{countryDetailsData.data.countryDetailsData?.languages}</p>
                </div>
                <div className="w-full border-b-2 border-color_2 grid grid-flow-col justify-between h-14 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold">Currencies</p>
                  <p>{countryDetailsData.data.countryDetailsData?.currencies}</p>
                </div>
                <div className="w-full border-b-2 border-color_2 grid grid-flow-col justify-between h-14 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold">Continents</p>
                  <p>{countryDetailsData.data.countryDetailsData?.continents}</p>
                </div>
                <div className="w-full  border-color_2 grid grid-flow-row justify-between gap-6 p-2 content-center text-sm">
                  <p className="text-color_4 font-bold justify-self-start">Neighbouring Countries</p>
                  <div className="grid grid-cols-4 max-sm:grid-cols-2  gap-5 overflow-x-auto w-100 justify-center">
                  {countryDetailsData.data.neighbourDetailsData.map((neighbour)=>(
                      <Link to={`/country/${neighbour.code}`} className="grid grid-flow-row gap-4 justify-center" key={neighbour.code} >
                      <img 
                        src={neighbour.flags.png} alt={neighbour.flags.alt} 
                        className="w-32  rounded-lg aspect-video"
                        />
                        <p>{neighbour.name.common}</p>
                      </Link>
                  ))}
                    
                  </div>
                </div>
             </div>
            
        </div>
    );
}

export default CountryDetails;
