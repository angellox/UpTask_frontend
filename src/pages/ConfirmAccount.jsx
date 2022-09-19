import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmViaAPI = async () => {
      try {
        const { data } = await clientAxios(`/users/confirm/${id}`);

        setAlert({
          msg: data.msg,
          error: false
        });

        setAccountConfirmed(!accountConfirmed);

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    };

    confirmViaAPI();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className='text-embers-dark font-black text-6xl capitalize'>Confirm your account & create your{' '}<span className='text-embers-gray'>projects</span></h1>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && (<Alert alert={alert} />)}

        {accountConfirmed && (
          <Link
            className='block text-center my-2 text-embers-gray uppercase font-bold underline underline-offset-4'
            to='/'
          >Log in!</Link>
        )}

      </div>
    </>
  )
}

export default ConfirmAccount;