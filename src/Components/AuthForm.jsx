import { useAPI } from '../Hooks/useAPI'
import { useState } from 'react'

export default function AuthForm({header, buttonText='Submit', type, onSuccess}) {

    const { userAuth, isLoading, error } = useAPI()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setPassword("")

        let success = await userAuth(type, username, password)
        if (success) onSuccess()
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5 animate-popup'>
            <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>{header}</h2>
            <form className='auth-form' method="POST" onSubmit={handleSubmit} autoComplete='off'>
                <input className='text-input w-64' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                <input className='text-input w-64' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                <button className="auth-button" type="submit" disabled={isLoading} >Confirm</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
