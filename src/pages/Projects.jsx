import { useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import CardProject from '../components/CardProject';
import Alert from '../components/Alert';

const Projects = () => {

  const { projects, alert } = useProjects();

  const { msg } = alert;

  return (
    <>
      <h1 className='text-4xl font-black text-embers-dark'>Projects</h1>

      { msg && <Alert alert={alert} /> }

      <div className='bg-white shadow mt-10 rounded-lg'>
          {projects.length ? 
            projects.map(project => (
              <CardProject 
                key={project._id}
                project={project}
              />
            ))  
          : <p className='text-center text-embers-gray font-bold uppercase p-5'>There's no <span className='text-embers-dark'>projects</span> yet. Try to create one</p>}
      </div>
    </>
  )
}

export default Projects;