import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

const baseUrl = import.meta.env.VITE_BASE_URL

export const useGetUserMessages = () => {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAPIContext()
    const { user, dispatch: userDispatch } = useAuthContext()

    const getUserMessages = async (userID) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await fetch(`${baseUrl}/api/user${userID ? `/${userID}` : ""}/messages`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                userDispatch({type: 'LOGOUT'})
                return
            }

            setError(json.error)
        }
        else {
            dispatch({type: 'SET_MESSAGES', payload: json})
        }
        setLoading(false)
    }
    return { getUserMessages, isLoading, error }
} 