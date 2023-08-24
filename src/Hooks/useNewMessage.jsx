import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

 

export const useNewMessage = () => {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAPIContext()
    const { user, dispatch: userDispatch } = useAuthContext()

    const newMessage = async (title, content) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await fetch(`/api/messages/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            },
            body: JSON.stringify({
                title,
                content
            })
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                userDispatch({type: 'LOGOUT'})
                return false
            }
            setError(json.error)
            setLoading(false)
        }
        else {
            dispatch({type: 'NEW_MESSAGE', payload: json})
            setLoading(false)
            return true
        }
    }
    return { newMessage, isLoading, error }
} 