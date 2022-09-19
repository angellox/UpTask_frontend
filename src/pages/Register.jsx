import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOpenIcon } from '@heroicons/react/solid';
import clientAxios from '../config/clientAxios';
// Components
import Alert from '../components/Alert';
// Helpers
import regexpass from '../helpers/regexpass';

const Register = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([fullName, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    if(!regexpass(password)) {
      setAlert({
        msg: 'Passwords must\'ve at least one uppercase letter and one number',
        error: true
      });
      return;
    }

    if(password !== repeatPassword) {
      setAlert({
        msg: 'Passwords do not match',
        error: true
      });
      return;
    }

    if(password !== repeatPassword) {
      setAlert({
        msg: 'Passwords do not match',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users`, { fullName, email, password });
      
      setAlert({
        msg: data.msg,
        error: false
      });

      setFullName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');

      setTimeout(() => {
        setAlert({});
      }, 5000);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
    
  };

  const { msg } = alert;

  return (
    <>
      <h1 className='text-embers-dark font-black text-6xl capitalize'>Create your account & manage your{' '}<span className='text-embers-gray'>projects</span></h1>

      {msg && <Alert alert={alert} />}

      <form 
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
        <div className='my-5'>
          <label
            className='uppercase text-embers-dark block text-xl font-bold'
            htmlFor='fullname'
          >Full Name</label>
          <input
            id='fullname'
            type='text'
            placeholder='Type your full name'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={fullName}
            onChange={ e => setFullName(e.target.value)}
          />
        </div>

        <div className='my-6'>
          <label
            className='uppercase text-embers-dark block text-xl font-bold'
            htmlFor='email'
          >Email</label>
          <input
            id='email'
            type='email'
            placeholder='Type your email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>

        <div className='my-6'>
          <label
            className='uppercase text-embers-dark block text-xl font-bold'
            htmlFor='password'
          >Password</label>
          <input
            id='password'
            type='password'
            placeholder='Type your password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={ e => setPassword(e.target.value)}
          />
        </div>

        <div className='my-6'>
          <label
            className='uppercase text-embers-dark block text-xl font-bold'
            htmlFor='password2'
          >Repeat password</label>
          <input
            id='password2'
            type='password'
            placeholder='Confirm your password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={repeatPassword}
            onChange={ e => setRepeatPassword(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='bg-embers-gray mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-embers-dark transition-colors flex justify-center items-center'
        ><LockOpenIcon className='h-4 w-4 mr-2' /> Create account</button>
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-2 text-embers-gray uppercase text-sm'
          to='/'
        >Do you have an account? <span className='font-bold'>Log in!</span></Link>
        <Link
          className='block text-center my-2 text-embers-gray uppercase text-sm'
          to='/forgotten-password'
        >Forgotten password</Link>
      </nav>
    </>
  )
}

export default Register