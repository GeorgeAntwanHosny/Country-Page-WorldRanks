import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { FilterBy, WorldRank } from '../models/WorldRank';
import { CustomResponse } from '../models/CustomResponse';
import { getAllWorldRankAPIs } from '../services/Countries';
export interface WorldRankContextState{
    worldRankList: WorldRank[],
    worldRankListFiltered: WorldRank[],
    worldRankListPaginated: WorldRank[],
    countWorldRankListResult:number,
    filterDataBy: FilterBy,
    loading:boolean,
    error:string,
    paginationData:{
        currentPage:number,
        totalPage:number,
        pageSize:number,
    }
}
export interface WorldRankContextProps {
    // worldRankList : WorldRank[];
    // countWorldRankListResult:number;
    // filterDataBy: FilterBy;
    // setFilterDataBy: (filterBy: FilterBy) => void;
    WorldRankContextState:WorldRankContextState;
    FilterDataWorldRank: (filterBy: FilterBy) => void;
    paginateData:(page:number)=>void;
}
const WorldRankContext = createContext<WorldRankContextProps|undefined>(undefined)

export const useWorldRankContext = ()=>{
    const context = useContext(WorldRankContext);
    if (!context) {
        throw new Error('useWorldRankContext must be used within a WorldRankProvider');
    }
    return context;
}
const WorldRankProvider:React.FC<{children:ReactNode}> = ({children}) => {
    // const [worldRankList, setWorldRankList] = React.useState<WorldRank[]>([]);
    // const [countWorldRankListResult, setCountWorldRankListResult ] = React.useState<number>(0);
    // const [filterDataBy, setFilterDataBy] = React.useState<FilterBy>({
    //     region:[],
    //     search:'',
    //      sort_by:'population',
    //       status:{
    //         independent:false,
    //         unMember:false,
    //       }
    // });
    const [WorldRankContextState,setWorldRankContextState] = React.useState<WorldRankContextState>({
        worldRankListFiltered: [],
        worldRankList: [],
        worldRankListPaginated:[],
        countWorldRankListResult:0,
        loading:true,
        error:'',
        filterDataBy:{
                region:['Asia','Americas','Africa','Europe', 'Antarctic', 'Oceania'],
                search:'',
                sort_by:'population',
                status:{
                independent:false,
                unMember:false,
                }
            },
            paginationData:{
                currentPage:1,
                pageSize:25,
                totalPage:1,
            }
         })
         useEffect(() => {
            const fetchData = async () => {
                setWorldRankContextState(prevState=>({...prevState,loading:true }))
                const response: CustomResponse = await getAllWorldRankAPIs();
                if (response.success) {
                    const sortedDataByPopulation = response.data.sort((a,b)=>{
                        return b.population - a.population;
                    })
                    setWorldRankContextState(prevState=>({...prevState,worldRankList:sortedDataByPopulation,worldRankListFiltered:sortedDataByPopulation, countWorldRankListResult: response.data.length??0,
                        paginationData:{
                            currentPage:1,
                            pageSize:25,
                            totalPage:Math.ceil(response.data.length/25), 
                        }  ,
                        worldRankListPaginated: sortedDataByPopulation.slice(0,WorldRankContextState.paginationData.pageSize),

                     }));
                } else {
                    setWorldRankContextState(prevState=>({...prevState,error:response.error,countWorldRankListResult:0 }));
                }
                setWorldRankContextState(prevState=>({...prevState,loading:false }))
            };
            
            fetchData();
        }, []);
        const FilterDataWorldRank = (filterBy: FilterBy) => {
            setWorldRankContextState(prevState=>({...prevState,filterDataBy:filterBy,loading:true }));
            const worldRankList : WorldRank[] = WorldRankContextState.worldRankList.filter((worldRank:WorldRank)=>{
                if(filterBy.search && ((worldRank.name.toLowerCase().indexOf(filterBy.search.toLowerCase()) === -1)&& (worldRank.region.toLowerCase().indexOf(filterBy.search.toLowerCase()) === -1))){//add search by region and sub region
                    return false;
                }
                if(filterBy.region.length > 0 &&!filterBy.region.includes(worldRank.region)){
                    return false;
                }
                if(filterBy.status.independent &&!worldRank.independent){
                    return false;
                }
                if(filterBy.status.unMember &&!worldRank.unMember){
                    return false;
                }
                return true;
            });
            
            const sortedWorldRankList = worldRankList.sort((a,b)=>{
              
                 switch (filterBy.sort_by) {
                    case 'population':
                        return  b.population-  a.population ;
                    case 'areakm2':
                        return  b.area -  a.area;
                    case 'alphabetical':
                        return  a.name.localeCompare(b.name);
                    default:
                        return  b.population-  a.population ;
                 }
                   
            });

            setWorldRankContextState(prevState=>({...prevState,worldRankListFiltered:[...sortedWorldRankList],
                countWorldRankListResult: sortedWorldRankList.length, loading:false,
                paginationData:{
                    currentPage:1,
                    pageSize:25,
                    totalPage:Math.ceil(sortedWorldRankList.length/25), 
                } ,
                worldRankListPaginated: sortedWorldRankList.slice(0,WorldRankContextState.paginationData.pageSize),
            }));
        }
        const paginateData = (page:number) => {
            const indexOfLastItem = page * WorldRankContextState.paginationData.pageSize;
            const indexOfFirstItem = indexOfLastItem - WorldRankContextState.paginationData.pageSize;
            console.log("indexOfLastItem: ",indexOfLastItem, "indexOfFirstItem: ",indexOfFirstItem)
            const paginatedRankListData = WorldRankContextState.worldRankListFiltered.slice(indexOfFirstItem, indexOfLastItem);
            setWorldRankContextState(prevState=>({
                ...prevState,
                worldRankListPaginated:[...paginatedRankListData],
                paginationData:{
                    ...prevState.paginationData,
                    currentPage:page,  
                }
            }));
        }
    return (
        <WorldRankContext.Provider value={{WorldRankContextState,FilterDataWorldRank,paginateData}}>
            {children}
        </WorldRankContext.Provider>
    );
}

export default WorldRankProvider;
