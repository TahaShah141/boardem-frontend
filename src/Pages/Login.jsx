import { useNavigate } from 'react-router-dom'
import { useLogin } from '../Hooks/useLogin'
import { useState } from 'react'

export default function Login() {

  const navigate = useNavigate()
  const { login, isLoading, error } = useLogin()

  const [credentials, setCredentials] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    setCredentials("")
    setPassword("")

    const loggedIn = await login(credentials, password)

    if (loggedIn) navigate('/')
  }

  return (
    <div className='flex flex-col items-center p-5 gap-5'>
      <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>Login Form</h2>
      <form className='auth-form' method="POST" onSubmit={handleSubmit} autoComplete='off'>
          <input className='text-input w-64' type="text" name="credentials" value={credentials} onChange={(e) => setCredentials(e.target.value)} placeholder='Usrename/Email'/>
          <input className='text-input w-64' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button className="auth-button" type="submit" disabled={isLoading} >Login</button>
          {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
