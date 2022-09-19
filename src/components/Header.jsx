import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import useProjects from '../hooks/useProjects';
import SeachEngine from './SeachEngine';
import { SearchIcon } from '@heroicons/react/solid';


const Header = () => {

    const { logOutSession } = useAuth();
    const { handleSearchEngine, logOutProjects } = useProjects();

    return (
        <header className='px-4 py-5 bg-white border-b'>
            <div className='md:flex md:justify-between'>
                <h2 className="text-4xl text-embers-dark font-bold mb-5 text-center md:mb-0">
                    UpTask
                </h2>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <button
                        type='button'
                        className='font-bold uppercase flex text-embers-gray hover:text-embers-dark transition-colors'
                        onClick={handleSearchEngine}
                    >
                        <SearchIcon className='h-6 w-6 mr-2'/>Search
                    </button>
                    <Link
                        to='/projects'
                        className='font-bold uppercase text-embers-gray'
                    >
                        Projects
                    </Link>

                    <button
                        type='button'
                        className='text-white text-sm bg-embers-gray rounded-md uppercase font-bold p-3 hover:bg-embers-dark transition-colors'
                        onClick={() => {
                            logOutProjects();
                            logOutSession();
                            localStorage.removeItem('UpTaskToken');
                        }}
                    >
                        Log out
                    </button>
                </div>

                <SeachEngine />
                
            </div>
        </header>
    )
}

export default Header