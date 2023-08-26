import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../Components/AuthForm'

export default function Login() {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center p-5 gap-5'>
      <AuthForm type={'login'} header={'Login Form'} buttonText='Login' onSuccess={() => navigate('/')} />
      <div className='text-neutral-600'>
        <p className='text-xs'>Don't have an Account? <Link className='text-sm underline hover:text-neutral-200 text-neutral-400 font-mono' to='/signup'>Make new Account</Link></p>
      </div>
    </div>
  )
}
