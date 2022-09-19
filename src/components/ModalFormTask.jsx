import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import useProjects from '../hooks/useProjects';

import Alert from './Alert';

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

const ModalFormularioTarea = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');

    const params = useParams();
    const { modalFormTask, handleModalTask, showAlert, alert, submitTask, task } = useProjects();

    useEffect(() => {
        
        if(task?._id) {
            setTitle(task.title);
            setDescription(task.description);
            setDeadline(task.deadline?.split('T')[0]);
            setPriority(task.priority);
            return;
        }

        setTitle('');
        setDescription('');
        setDeadline('');
        setPriority('');

    }, [task]);

    const handleSubmit = async e => {
        e.preventDefault();
        if([title, description, priority, deadline].includes('')) {
            showAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }

        await submitTask({ id: task?._id, title, description, deadline, priority, project: params.id });

        setTitle('');
        setDescription('');
        setDeadline('');
        setPriority('');
    };

    const { msg } = alert;

    return (
        
        <Transition.Root show={ modalFormTask } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalTask }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalTask }
                                >
                                <span className="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-embers-dark">
                                        {task?._id ? 'Update task' : 'Create task'}
                                        <p className='text-sm text-gray-500 font-light'>Fill the fields below that describe your task of the project</p>
                                    </Dialog.Title>

                                    { msg && <Alert alert={alert} /> }

                                    <form
                                        className='my-10'
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="mb-5">
                                            <label
                                                className='text-embers-gray uppercase font-bold text-sm'
                                                htmlFor='title'
                                            >
                                                Title
                                            </label>
                                            <input
                                                id='title'
                                                type='text'
                                                placeholder='Title of the task'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                className='text-embers-gray uppercase font-bold text-sm'
                                                htmlFor='description'
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id='description'
                                                placeholder='Description of the task'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                className='text-embers-gray uppercase font-bold text-sm'
                                                htmlFor='deadline'
                                            >
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

                                        <div className="mb-5">
                                            <label
                                                className='text-embers-gray uppercase font-bold text-sm'
                                                htmlFor='priority'
                                            >
                                                Priority
                                            </label>
                                            <select
                                                id='priority'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={priority}
                                                onChange={e => setPriority(e.target.value)}
                                            >
                                                <option value=''>-- Select --</option>
                                                {PRIORITY_OPTIONS.map(priority => (
                                                    <option 
                                                        key={priority}
                                                        value={priority}
                                                    >{priority}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <input 
                                            type='submit'
                                            className='bg-embers-aqua text-embers-dark hover:bg-embers-dark hover:text-embers-aqua w-full p-3 uppercase font-bold hover:cursor-pointer transition-colors rounded text-center text-sm'
                                            value={task?._id ? 'Update task' : 'Create task'}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea;