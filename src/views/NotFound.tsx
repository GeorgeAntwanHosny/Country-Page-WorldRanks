 
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bg-color_1 w-[96vw] rounded-md  py-8 px-8 h-[500px] text-lg font-sans'>

           <h1 className='text-2xl text-color_5 font-bold p-4'>404 - Page Not Found</h1>
            <p className='text-xl text-color_5 p-2'>The page you are looking for does not exist.</p>
            {/* Provide a link to go back to the home page */}
            <Link to="/" className='underline text-color_3 '>Go back to Home</Link>
        </div>
    );
}

export default NotFound;
