import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const baseUrl = import.meta.env.VITE_BASE_URL

export const useLogin = () => {
    
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()
    
    const login = async (credentials, password) => {
        setLoading(true)
        setError(null)

        const res = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                credentials,
                password
            })
        })

        const json = await res.json()

        if (!res.ok) {
            setLoading(false)
            setError(json.error)
            return false
        }
        else {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setLoading(false)
            return true
        }
    }
    return { login, isLoading, error }
} 