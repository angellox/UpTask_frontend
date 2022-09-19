import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const CardProject = ({ project }) => {

    const { auth } = useAuth();
    const { title, _id, client, creator } = project;

    return (
        <div className='border-b p-5 flex flex-col md:flex-row gap-2 md:gap-0 justify-between'>

            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {title}
                    <span className='text-sm text-embers-gray uppercase'>{' '}{client}</span>
                </p>

                {auth._id !== creator && (
                    <p className='text-xs bg-embers-aqua p-1 text-embers-dark font-bold rounded-md'>Collaborator</p>
                )}
            </div>


            <Link
                className='text-embers-gray hover:text-embers-dark uppercase text-sm font-bold'
                to={`${_id}`}
            >
                Open project
            </Link>
        </div>
    )
}

export default CardProject;