import FormProject from '../components/FormProject';

const NewProject = () => {
  return (
    <>
      <h1 className='text-4xl font-black text-embers-dark'>Create project</h1>

      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </>
  )
}

export default NewProject;