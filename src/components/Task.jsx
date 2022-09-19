import formatDate from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';

const Task = ({ task }) => {

    const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProjects();
    const isAdmin = useAdmin();

    const { title, description, deadline, priority, status, _id } = task;

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p className='mb-2 text-xl text-embers-dark font-bold'>{title}</p>
                <p className='mb-2 text-sm text-embers-gray'>{description}</p>
                <p className='mb-2 text-xl'>{formatDate(deadline)}</p>
                <p className='mb-2 text-base text-embers-gray font-bold'>{priority}</p>
                { status && <p className='text-xs bg-gray-300 text-embers-dark p-1 uppercase rounded-lg font-bold inline-block'>Completed by: {task.completedBy?.fullName}</p> }
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                {isAdmin && (
                    <button
                        className={`${status ? 'cursor-not-allowed' : ''} bg-embers-gray px-4 py-3 text-white uppercase font-bold text-center rounded-lg text-sm`}
                        onClick={() => handleModalEditTask(task)}
                        disabled={status}
                    >
                        Edit
                    </button>
                )}

                <button
                    className={`${!status ? 'bg-embers-aqua text-embers-dark' : 'bg-gray-500 text-white'} px-4 py-3 uppercase font-bold text-center rounded-lg text-sm w-24`}
                    onClick={() => completeTask(_id)}
                >
                    { !status ? 'Done' : 'Undone' }
                </button>

                {isAdmin && (
                    <button
                        className='bg-embers-red px-4 py-3 text-white uppercase font-bold text-center rounded-lg text-sm'
                        onClick={() => handleModalDeleteTask(task)}
                    >
                        Delete
                    </button>
                )}

            </div>
        </div>
    )
}

export default Task

