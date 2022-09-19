import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

import Spinner from '../components/Spinner';
import FormProject from '../components/FormProject';

import { XCircleIcon } from '@heroicons/react/solid';

const EditProject = () => {

    const params = useParams();
    const { id } = params;

    const { getProject, project, isLoading, deleteProject } = useProjects();

    useEffect(() => {
        getProject(id);
    }, []);

    const handleClick = () => {
        if(confirm('Do you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const { title, description, deadline } = project;

    if (isLoading) return (<Spinner />);

    return (
        <>
            <div className='flex justify-between'>
            <h1 className='text-4xl font-black text-embers-dark'>Delete project</h1>

                <div className='text-embers-red hover:text-red-600 hover:cursor-pointer'>
                    <button
                        type='button'
                        className='flex items-center gap-2 uppercase font-bold'
                        onClick={handleClick}
                    ><XCircleIcon className='h-6 w-6' />{' '}Delete</button>
                </div>
            </div>

            <div className='mt-10 flex justify-center'>
                <FormProject />
            </div>
        </>
    )
}

export default EditProject