import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';

import { PencilAltIcon } from '@heroicons/react/solid';
// Components
import Alert from '../components/Alert';
// Helpers
import regexpass from '../helpers/regexpass';

const NewPassword = () => {

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgotten-password/${token}`);
        setIsTokenValid(true);

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if ([password, repeatPassword].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    if (!regexpass(password)) {
      setAlert({
        msg: 'Passwords must\'ve at least one uppercase letter and one number',
        error: true
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: 'Password do not match',
        error: true
      });
      return;
    }

    try {
      const url = `/users/forgotten-password/${token}`;
      const { data } = await clientAxios.post(url, { password });

      setIsPasswordSet(!isPasswordSet);

      setAlert({
        msg: data.msg,
        error: false
      });

      setTimeout(() => {
        navigate('/');
      }, 4000);

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
      <h1 className='text-embers-dark font-black text-6xl capitalize'>Reset your password & won't lose your{' '}<span className='text-embers-gray'>projects</span></h1>

      {msg && <Alert alert={alert} />}

      {isTokenValid && (
        <form
          onSubmit={handleSubmit}
          className='my-10 bg-white shadow rounded-lg p-10'
        >
          <div className='my-6'>
            <label
              className='uppercase text-embers-dark block text-xl font-bold'
              htmlFor='password'
            >New Password</label>
            <input
              id='password'
              type='password'
              placeholder='Type your new password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className='my-6'>
            <label
              className='uppercase text-embers-dark block text-xl font-bold'
              htmlFor='password2'
            >Repeat new password</label>
            <input
              id='password2'
              type='password'
              placeholder='Retype your new password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-embers-gray mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-embers-dark transition-colors flex justify-center items-center'
          ><PencilAltIcon className='h-4 w-4 mr-2' /> Reset password</button>
        </form>
      )}

      {isPasswordSet && (
        <Link
          className='block text-center my-2 text-embers-gray uppercase font-bold underline underline-offset-4'
          to='/'
        >Log in!</Link>
      )}
    </>

  )
}

export default NewPassword;