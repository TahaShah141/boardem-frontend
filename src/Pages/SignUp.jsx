import { Link } from 'react-router-dom'
import AuthForm from '../Components/AuthForm'

export default function SignUp() {

  return (
    <div className='flex flex-col items-center p-5 gap-5'>
      <AuthForm type={'signup'} header={'Create User'} buttonText='Sign Up' onSuccess={() => navigate('/')} />
      <div className='text-neutral-600'>
        <p className='text-xs'>Already have an Account? <Link className='text-sm underline hover:text-neutral-200 text-neutral-400 font-mono' to='/login'>Login</Link></p>
      </div>
    </div>
  )
}
