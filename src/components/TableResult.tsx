import {  useNavigate } from "react-router-dom";
import { useWorldRankContext } from "../context/WorldRankProvider";
import Pagination from "./Pagination";

const TableResult = () => {
  
  const {WorldRankContextState} = useWorldRankContext();
  const navigate = useNavigate();
  
  if (WorldRankContextState.loading) return <div>Loading...</div>;
  if (WorldRankContextState.error) return <div>Error: {WorldRankContextState.error}</div>;
  return (
    
    <div className="row-span-2  col-start-2 col-end-4 w-[100%] font-sans text-color_4  max-sm:col-span-3 max-md:col-span-3 max-lg:col-span-3">
  
        <div className="overflow-x-auto">
          <table className="min-w-full   font-sans  text-left">
            <thead className=" font-sans text-color_4">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  tracking-wider border-b">
                Flag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium     tracking-wider border-b">
                Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium    tracking-wider border-b">
                Population
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium    tracking-wider border-b">
                Area ( km<sup>2</sup> )
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  tracking-wider border-b">
                Region
                </th>
              </tr>
            </thead>
            <tbody  className=" font-sans text-color_5">
            {WorldRankContextState.worldRankListPaginated.map((countryRank, index) => (
                       
                       <tr key={index} onClick={()=> navigate(`/country/${countryRank.code}`)} className="cursor-pointer">
                        <td className="px-6 py-4 text-sm text-color_5"><img src={countryRank.flags.svg} alt={countryRank.flags.alt} className="w-16"/></td>
                        <td className="px-6 py-4 text-sm text-color_5">{countryRank.name}</td>
                        <td className="px-6 py-4 text-sm text-color_5">{countryRank.population}</td>
                        <td className="px-6 py-4 text-sm text-color_5">{countryRank.area}</td>
                        <td className="px-6 py-4 text-sm text-color_5">{countryRank.region}</td>
                        </tr>
            ))}
              
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <Pagination/>
    </div>
  );
};

export default TableResult;
