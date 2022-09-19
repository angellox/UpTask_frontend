import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProject from '../hooks/useProjects';
import Alert from './Alert';

const FormProject = () => {

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [client, setClient] = useState('');

    const params = useParams();
    const { showAlert, alert, submitProject, project } = useProject();

    useEffect(() => {
        if(params.id) {
            setId(project._id);
            setTitle(project.title);
            setDescription(project.description);
            setDeadline(project.deadline?.split('T')[0]);
            setClient(project.client);
        }
    }, [params]);

    const handleSubmit = async e => {
        e.preventDefault();

        if([title, description, deadline, client].includes('')) {
            showAlert({
                msg: 'All fields are required',
                error: true
            });
        }

        await submitProject({ id, title, description, deadline, client });

        setId(null);
        setTitle('');
        setDescription('');
        setDeadline('');
        setClient('');
    }

    const { msg } = alert;

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        >

            {msg && <Alert alert={alert} />}

            <div className='mb-5'>
                <label htmlFor="title" className="text-embers-dark uppercase font-bold text-sm">
                    Title
                </label>
                <input
                    id='title'
                    type='text'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Title of your project'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="description" className="text-embers-dark uppercase font-bold text-sm">
                    Description
                </label>
                <textarea
                    id='description'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Description of your project'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="deadline" className="text-embers-dark uppercase font-bold text-sm">
                    Deadline
                </label>
                <input
                    id='deadline'
                    type='date'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="client" className="text-embers-dark uppercase font-bold text-sm">
                    Client
                </label>
                <input
                    id='client'
                    type='text'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder="Client's name of your project"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>

            <input 
                type='submit'
                value={id ? 'Update project' : 'Create project'}
                className='w-full p-3 uppercase bg-embers-gray text-white font-bold hover:cursor-pointer hover:bg-embers-dark transition-colors'
            />
        </form>
    )
}

export default FormProject