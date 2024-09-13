import SearchHeader from '../components/SearchHeader';
import FilterView from '../components/FilterView';
import TableResult from '../components/TableResult';

const WorldRankList = () => {
    return (
        <div className='bg-color_1 w-[96vw] rounded-md grid grid-cols-3 grid-rows-[150px_auto] px-8 h-auto '>
            <SearchHeader/>
            <FilterView/>
            <TableResult/>
        </div>
    );
}

export default WorldRankList;
