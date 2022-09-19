import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { PaperAirplaneIcon } from '@heroicons/react/solid';
import Alert from '../components/Alert';


const ForgottenPassword = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    // Recommendation: Change this validation for a REGEX value
    if(email === '' || email.length < 6) {
      setAlert({
        msg: 'Email is not valid',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forgotten-password`, { email });

      setAlert({
        msg: data.msg,
        error: false
      });

    } catch (error) {
      console.log();
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert; 

  return (
    <>
      <h1 className='text-embers-dark font-black text-6xl capitalize'>Recover your access & won't lose your{' '}<span className='text-embers-gray'>projects</span></h1>

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
            placeholder='Type your email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='bg-embers-gray mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-embers-dark transition-colors flex justify-center items-center'
        ><PaperAirplaneIcon className='h-4 w-4 mr-2' /> Send instructions</button>
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-2 text-embers-gray uppercase text-sm'
          to='/'
        >Do you have an account? <span className='font-bold'>Log in!</span></Link>
      </nav>
    </>
  )
}

export default ForgottenPassword