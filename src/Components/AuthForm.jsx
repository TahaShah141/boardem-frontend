import { useAPI } from '../Hooks/useAPI'
import { useState } from 'react'
import Password from './Password'

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
        <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5'>
            <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>{header}</h2>
            <form className='auth-form' method="POST" onSubmit={handleSubmit} autoComplete='off'>
                <input className='text-input w-64' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                <Password value={password} setValue={setPassword} placeholder={"Password"} styling={'text-input w-64'} name="password"/>
                <button className="auth-button" type="submit" disabled={isLoading} >{buttonText}</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
