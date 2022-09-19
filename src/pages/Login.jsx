import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
// Icons
import { LoginIcon } from '@heroicons/react/solid';
// Components
import Alert from '../components/Alert';
// Hooks
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});

    const { auth, setAuth, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }

        try {
            const { data } = await clientAxios.post('/users/login', { email, password }); 
            
            setAlert({});
            localStorage.setItem('UpTaskToken', data.token);
            setAuth(data);
            navigate('/projects');

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    };  

    const { msg } = alert;

    return (
        <>
            <h1 className='text-embers-dark font-black text-6xl capitalize'>Log in & manage your{' '}<span className='text-embers-gray'>projects</span></h1>

            {msg && <Alert alert={alert} />}

            <form
                onSubmit={handleSubmit} 
                className='my-10 bg-white shadow rounded-lg p-10'
            >
                <div className='my-5'>
                    <label
                        className='uppercase text-embers-dark block text-xl font-bold'
                        htmlFor='email'
                    >Email</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Type your email here'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label
                        className='uppercase text-embers-dark block text-xl font-bold'
                        htmlFor='password'
                    >Password</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='Type your password here'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='bg-embers-gray mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-embers-dark transition-colors flex justify-center items-center'
                ><LoginIcon className='h-4 w-4 mr-2' />Log in</button>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-2 text-embers-gray uppercase text-sm'
                    to='register'
                >Don't you have an account? <span className='font-bold'>Sign up!</span></Link>
                <Link
                    className='block text-center my-2 text-embers-gray uppercase text-sm'
                    to='forgotten-password'
                >Forgotten password</Link>
            </nav>
        </>
    )
}

export default Login;