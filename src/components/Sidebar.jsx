import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { UserIcon } from '@heroicons/react/solid'

const Sidebar = () => {

  const { auth } = useAuth();

  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
        <p className='text-lg font-bold text-embers-dark flex flex-col items-center justify-center gap-2'>Welcome! <span className='text-embers-gray text-2xl flex justify-center items-center gap-2'>{auth.fullName}<UserIcon className='h-6 w-6 text-embers-dark' /></span></p>
        <Link 
            to='create-project'
            className='bg-embers-gray w-full text-white uppercase font-bold p-3 block mt-5 text-center rounded-lg'
        >
            Create new project
        </Link>
    </aside>
  )
}

export default Sidebar