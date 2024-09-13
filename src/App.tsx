import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import logoImge from './assets/images/Logo.svg';

import WorldRankProvider from './context/WorldRankProvider';
import WorldRankList from './views/WorldRankList';
import CountryDetails from './views/CountryDetails';
import NotFound from './views/NotFound';
function App() {
  
  return (
    <BrowserRouter>
    <WorldRankProvider>
        <div className='grid grid-flow-row justify-center grid-rows-[250px_auto] max-sm:w-[98%] max-sm:justify-center'>
            <div className='w-100 grid justify-center p-28'>
                <img src={logoImge} alt='logo image' />
            </div>
            <Routes>
                {/* Route for displaying all of world rank list */}
                <Route path="/" element={<WorldRankList />} />
                {/* Route for displaying item details */}
                <Route path="/country/:code" element={<CountryDetails />} />
                {/* Catch all other undefined routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </WorldRankProvider>
</BrowserRouter>
  )
}

export default App
