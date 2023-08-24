import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useChangeCredentials = () => {

    const { user, dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const changeCredentials = async (username, password) => {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/user/change`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            },
            body: JSON.stringify({
                username,
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
    return { changeCredentials, isLoading, error }
} 