import { BadgeCheckIcon, BanIcon } from '@heroicons/react/solid';

const Alert = ({ alert }) => {
  return (
    <div className={` ${alert.error ? 'from-embers-red to-red-600' : 'from-embers-aqua to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 flex justify-center items-center`}>

        {alert.error ? <BanIcon className='h-4 w-4 mr-2' /> : <BadgeCheckIcon className='h-4 w-4 mr-2' />}
        {alert.msg}
        
    </div>
  )
}

export default Alert