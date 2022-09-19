import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
// Hooks
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';
// Components
import Spinner from '../components/Spinner';
import ModalFormTask from '../components/ModalFormTask';
import ModalDeleteTask from '../components/ModalDeleteTask';
import ModalDeleteCollab from '../components/ModalDeleteCollab';
import Task from '../components/Task';
import Collaborator from '../components/Collaborator';
// Icons
import { PencilIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';

let socket;

const Project = () => {

  const { getProject, project, isLoading, handleModalTask, syncTaskState, syncTaskStateDelete, syncTaskStateEdit } = useProjects();

  const params = useParams();
  const isAdmin = useAdmin();

  const { id } = params;

  useEffect(() => {
    getProject(id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('open project', params.id);
  }, []);

  useEffect(() => {
    // Create task - Syncronize with Server & State
    socket.on('task added', (taskNew) => {
      if(taskNew.project === project._id) {
        syncTaskState(taskNew);
      }
    });
    // Delete task - Syncronize with Server & State
    socket.on('task deleted', (task) => {
      if(task.project === project._id) {
        syncTaskStateDelete(task);
      }
    });

    socket.on('task updated', (task) => {
      if(task.project._id === project._id) {
        syncTaskStateEdit(task);
      }
    })

    socket.on('new status', (task) => {
      if(task.project._id === project._id) {
        syncTaskStateEdit(task);
      }
    })
  });

  // TODO: Check for description/deadline if they are necessary to include
  const { title } = project;

  if (isLoading) return (<Spinner />);

  return (
      <>
        <div className='flex justify-between'>
          <h1 className='font-black text-embers-dark text-4xl'>{title}</h1>

          {isAdmin && (
            <div className='flex items-center gap-2 text-embers-gray hover:text-embers-dark'>
              <Link
                to={`/projects/edit/${id}`}
                className='uppercase font-bold flex gap-2'
              >
                <PencilIcon className='h-6 w-6' />Edit
              </Link>
            </div>
          )}

        </div>

        {isAdmin && (
          <button
            onClick={handleModalTask}
            type='button'
            className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-embers-aqua text-center text-embers-dark hover:bg-embers-dark hover:text-embers-aqua transition-colors mt-5 flex items-center gap-2 justify-center'
          >
            <PlusCircleIcon className='h-6 w-6' />New task
          </button>
        )}

        <p className='text-embers-dark font-bold text-xl mt-10'>Project Tasks</p>


        <div className='bg-white shadow mt-10 rounded-lg'>
          {project.tasks?.length ?

            project.tasks.map(task => (
              <Task
                key={task._id}
                task={task}
              />
            ))

            : <p className='text-center my-5 p-8 text-embers-gray font-normal'>There are <span className='font-bold'>not</span> tasks in this project</p>}
        </div>

        {isAdmin && (
          <>
            <div className='flex items-center justify-between mt-10'>
              <p className='text-embers-dark font-bold text-xl'>Collaborators</p>
              <Link
                to={`/projects/new-collab/${project._id}`}
                className='text-embers-gray hover:text-embers-dark uppercase font-bold flex justify-center items-center'
              ><PlusIcon className='h-4 w-4 mr-2' />Add</Link>
            </div>

            <div className='bg-white shadow mt-10 rounded-lg'>
              {project.collaborators?.length ?

                project.collaborators.map(collab => (
                  <Collaborator
                    key={collab._id}
                    collab={collab}
                  />
                ))

                : <p className='text-center my-5 p-8 text-embers-gray font-normal'>There are <span className='font-bold'>not</span> collaborators in this project</p>}
            </div>
          </>
        )}
        <ModalFormTask />
        <ModalDeleteTask />
        <ModalDeleteCollab />
      </>
  )
}

export default Project;