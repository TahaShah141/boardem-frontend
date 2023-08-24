import { useState } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { useChangeCredentials } from '../Hooks/useChangeCredentials'

export default function ChangeCredentials({ closeMessage }) {

    const { login, isLoading: isLoginLoading, error: loginError } = useLogin()
    const { changeCredentials, isLoading: changeLoading, error: changeError } = useChangeCredentials()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loggedIn, setLoggedIn] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPassword("")

        let changed = false

        if (!loggedIn) setLoggedIn(await login(username, password))
        else {
            changed = await changeCredentials(username, password)
        }

        if (changed) closeMessage()
    }

    return (
        <div onClick={closeMessage} className="flex justify-center bg-opacity-90 items-center fixed bg-black top-0 left-0 w-full max-h-screen h-full">

            {!loggedIn &&
            <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5 animate-popup'>
                <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>Confirm Login</h2>
                <form className='auth-form' method="POST" onSubmit={handleSubmit} autoComplete='off'>
                    <input className='text-input w-64' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                    <input className='text-input w-64' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                    <button className="auth-button" type="submit" disabled={isLoginLoading} >Confirm Login</button>
                    {loginError && <div className="error">{loginError}</div>}
                </form>
            </div>}

            {loggedIn && 
            <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5 animate-popup'>
                <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>Make Change</h2>
                <form className='auth-form' method="POST" onSubmit={handleSubmit} autoComplete='off'>
                    <input className='text-input w-64' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                    <input className='text-input w-64' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                    <button className="auth-button" type="submit" disabled={isChangeLoading} >Confirm</button>
                    {changeError && <div className="error">{changeError}</div>}
                </form>
            </div>}

        </div>
  )
}
