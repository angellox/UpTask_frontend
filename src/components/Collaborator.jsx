import useProjects from '../hooks/useProjects';

const Collaborator = ({ collab }) => {

    const { handleModalDeleteCollab } = useProjects();
    const { fullName, email } = collab;

    return (
        <div className='border-b p-5 flex justify-between'>
            <div className=''>
                <p>{fullName}</p>
                <p className='text-sm text-embers-gray'>{email}</p>
            </div>

            <div className=''>
                <button
                    className='bg-embers-red px-4 py-3 text-white uppercase font-bold text-center rounded-lg text-sm'
                    onClick={() => handleModalDeleteCollab(collab)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Collaborator;