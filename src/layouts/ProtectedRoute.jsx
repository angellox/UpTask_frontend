import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// Components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';

const ProtectedRoute = () => {

    const { auth, loading } = useAuth();

    if(loading) return (<Spinner />);

    return (
        <>
            {auth._id ?(
                <div className='bg-gray-100'>
                    <Header />
                    <div className='md:flex md:min-h-screen'>
                        <Sidebar />
                        <main className='p-10 flex-1'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to='/' />}
        </>
    )
}

export default ProtectedRoute