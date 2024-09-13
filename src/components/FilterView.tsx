import { useState } from "react";
import { useWorldRankContext } from "../context/WorldRankProvider";


const FilterView = () => {
    const {WorldRankContextState, FilterDataWorldRank} = useWorldRankContext();
    const [resionList, setRegionList] = useState<string[]>(WorldRankContextState.filterDataBy.region);

    const handelFilterChange = (event: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>)=>{
        event.preventDefault();
        const { name, value } = event.target;
        
        const filterBy = {...WorldRankContextState.filterDataBy, [name]:value};
        FilterDataWorldRank(filterBy);
      }
    const handelFilterChangeStatus = (event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();
    const { name,  checked } = event.target;
    // console.log("WorldRankContextState.filterDataBy: ",WorldRankContextState.filterDataBy)
    // console.log(' name, value:', name, checked)
    const filterBy = {...WorldRankContextState.filterDataBy, status: {
         ...WorldRankContextState.filterDataBy.status
        ,[name]:checked
        }
   };
   
    FilterDataWorldRank(filterBy);
    }
    const checkSelectedRegion = (regionName:string):boolean=>{
        // console.log("regionName: ",regionName);
        return resionList.indexOf(regionName)===-1? false:true;
    }
    const handelSelectRegion =(regionName:string) =>{
    //    console.log("regionName: ",regionName);
    //    console.log("regionNames old: ",WorldRankContextState.filterDataBy.region);
       const regionNameFoundIndex = WorldRankContextState.filterDataBy.region.indexOf(regionName);
       let regionNames:string[] = [];
       if(regionNameFoundIndex!==-1){
          
          WorldRankContextState.filterDataBy.region.splice(regionNameFoundIndex, 1);
          regionNames = [... WorldRankContextState.filterDataBy.region]
       }else{
        regionNames = [...WorldRankContextState.filterDataBy.region, regionName];
       }
       setRegionList([...regionNames]);
    //    console.log("regionNames news: ",regionNames);
       const filterBy = {...WorldRankContextState.filterDataBy, region:[...regionNames]};
       FilterDataWorldRank(filterBy);
    }
    return (
        <div className="row-span-2 col-start-1 col-end-2 font-sans w-[100%]  justify-start  max-sm:col-span-3  max-md:col-span-3  max-lg:col-span-3">
            <div className="grid grid-flow-row justify-start align-baseline  gap-2 place-items-start">
                <label className="text-color_4 text-sm  ">Sort by</label>
                <div className="border-color_4 border-2 w-[350px] rounded-lg lg:w-[235px]">
                    <select className=" outline-none  bg-color_1 text-color_5 h-10" onChange={handelFilterChange} name="sort_by">
                        <option value={'population'}>Population</option> 
                        <option value={'alphabetical'}>Name Alphabetical</option>
                        <option value={'areakm2'}><p>Area (km<sup>2</sup>)</p></option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-flow-row align-baseline  gap-2 place-items-start font-sans py-5">
                <label className="text-color_4 text-sm">Region</label>
                <div className=" flex flex-wrap gap-4">
                    {/* */}
                   <button className={`${checkSelectedRegion('Americas')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Americas')}>Americas</button>
                   <button className={`${checkSelectedRegion('Antarctic')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Antarctic')}>Antarctic</button>
                   <button className={`${checkSelectedRegion('Africa')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Africa')}>Africa</button>
                   <button className={`${checkSelectedRegion('Asia')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Asia')}>Asia</button>
                   <button className={`${checkSelectedRegion('Europe')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Europe')}>Europe</button>
                   <button className={`${checkSelectedRegion('Oceania')?'text-color_5 bg-color_2':'text-color_4 bg-color_1'} rounded-xl p-2 w-28`} onClick={()=>handelSelectRegion('Oceania')}>Oceania</button>

                </div>
            </div>
            <div className="grid grid-flow-row align-baseline  gap-4 place-items-start font-sans py-5">
               <label className="text-color_4 text-sm">Status</label>
                <div className="flex gap-4">
                   <input type="checkbox"   name="unMember" onChange={handelFilterChangeStatus} value={'true'}
                   className=" custom-checkbox appearance-none bg-color_1 border-color_4 rounded-md  border-2 w-6 aspect-square checked:bg-color_3"
                   />
                    <label className="text-color_4 text-sm" >Member of the United Nations</label>
                  
                </div>
                <div className="flex gap-4">
                   <input type="checkbox"  name="independent" onChange={handelFilterChangeStatus} value={'true'}
                   className=" custom-checkbox appearance-none bg-color_1 border-color_4 rounded-md  border-2 w-6 aspect-square checked:bg-color_3"
                   />
                    <label className="text-color_4 text-sm" >Independent</label>
                  
                </div>
            </div>
        </div>
    );
}

export default FilterView;
