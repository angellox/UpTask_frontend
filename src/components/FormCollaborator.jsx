import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const FormCollaborator = () => {

    const [email, setEmail] = useState('');
    const [aux, setAux] = useState(false);
    const { showAlert, alert, submitCollab } = useProjects();

    const handleSubmit = e => {
        e.preventDefault();

        if(email === '') {
            showAlert({
                msg: 'Email is required',
                error: true
            });
            setAux(!aux);
            return;
        }

        submitCollab(email);

    }

    const { msg } = alert;

    return (
        <form
            className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}
        >
            {msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label
                    className='text-embers-gray uppercase font-bold text-sm'
                    htmlFor='collab'
                >
                    Email collaborator
                </label>
                <input
                    id='collab'
                    type='email'
                    placeholder='Email of the collaborator'
                    className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${aux ? 'border-b-embers-red' : ''}`}
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                        setAux(false);
                    }}
                />
            </div>

            <input
                type='submit'
                className='bg-embers-aqua text-embers-dark hover:bg-embers-dark hover:text-embers-aqua w-full p-3 uppercase font-bold hover:cursor-pointer transition-colors rounded text-center text-sm'
                value={'Add collab'}
            />
        </form>
    )
}

export default FormCollaborator