import { useNavigate, Link } from 'react-router-dom'
import { useSignup } from '../Hooks/useSignup'
import { useState } from 'react'

export default function SignUp() {

  const { signup, isLoading, error } = useSignup()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsername("")
    setPassword("")

    const signedup = await signup(username, password)

    if (signedup) navigate('/')
  }

  return (
    <div className='flex flex-col items-center p-5 gap-5'>
      <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>Create New User</h2>
      
      <form method="POST" onSubmit={handleSubmit} className="auth-form">
          <input className='text-input w-64' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
          <input className='text-input w-64' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button className='auth-button' type="submit" disabled={isLoading} >Sign Up</button>
          {error && <div className="error">{error}</div>}
      </form>

      <div className='text-neutral-600'>
        <p className='text-xs'>Already have an Account? <Link className='text-sm underline hover:text-neutral-200 text-neutral-400 font-mono' to='/login'>Login</Link></p>
      </div>
    </div>
  )
}
