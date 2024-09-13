import search_icon from '../assets/images/Search.svg';
import { useWorldRankContext } from '../context/WorldRankProvider';
const SearchHeader = () => {
    const {WorldRankContextState,FilterDataWorldRank} = useWorldRankContext();
    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const filterBy = {...WorldRankContextState.filterDataBy, search:event.target.value};
      FilterDataWorldRank(filterBy);
    }
    return (
        <div className='col-span-3 text-color_4 font-sans grid grid-flow-col max-sm:flex max-sm:flex-col max-sm:items-start  w-[100%] items-center   max-md:gap-5 max-sm:py-5'>
            <div className='font-semibold  justify-self-start'>
                Found {WorldRankContextState.countWorldRankListResult} countries
            </div>
            <div className='flex  w-[50%] max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%] lg:w-[70%] justify-self-end  rounded-lg h-14 bg-color_2 m-2 gap-2  max-sm:justify-self-start max-md:justify-self-start max-lg:col-start-2'>
                <img src={search_icon} alt="search-icon" className='max-w-12 pl-5'/>
                <input type="text" onChange={handleInputSearch} name="search" placeholder="Search By Name, Region, Subregion" className='placeholder:text-color_4 bg-color_2  text-color_4 w-[98%] outline-none placeholder:text-sm text-[16px] rounded-lg  '/>
            </div>
        </div>
    );
}

export default SearchHeader;
