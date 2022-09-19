import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

import FormCollaborator from '../components/FormCollaborator';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

import { PlusIcon } from '@heroicons/react/solid';

const NewCollab = () => {

    const { getProject, project, isLoading, collaborator, addCollaborator, alert } = useProjects();
    const params = useParams();

    useEffect(() => {
        getProject(params.id);
    }, []);

    if(!project?._id) return (<Alert alert={alert} />);

    return (
        <>
            <h1 className="text-4xl font-black text-embers-dark">Add collaborator</h1>
            <h2 className='text-embers-dark font-normal mt-2 text-lg'>Project: {project.title}</h2>

            <div className='mt-10 flex justify-center'>
                <FormCollaborator />
            </div>

            {isLoading ? <Spinner /> : collaborator?._id && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-embers-dark py-10 px-5 w-full md:w-1/2 rounded-lg shadow'>
                        <h2 className='text-center mb-10 text-2xl font-bold text-white'>Collaborator</h2>
                        <div className='flex flex-col gap-2 lg:flex-row lg:gap-0 justify-between items-center'>
                            <p className='text-xl text-white'>{collaborator.fullName}</p>

                            <button
                                type='submit'
                                className='bg-embers-aqua text-embers-dark py-2 px-4 font-bold uppercase text-sm flex justify-center items-center hover:bg-embers-gray hover:text-white transition-colors'
                                onClick={() => addCollaborator({ email: collaborator.email })}
                            ><PlusIcon className='h-4 w-4 mr-2'/>Add to project</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewCollab;