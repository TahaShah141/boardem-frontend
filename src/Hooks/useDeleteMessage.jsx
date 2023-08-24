import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

const baseUrl = import.meta.env.VITE_API_URL

export const useDeleteMessage = () => {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAPIContext()
    const { user, dispatch: userDispatch } = useAuthContext()

    const deleteMessage = async (id) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await fetch(`${baseUrl}api/messages/message/${id}`, {
            method: "DELETE",
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
            dispatch({type: 'DELETE_MESSAGE', payload: json})
        }
        setLoading(false)
    }
    return { deleteMessage, isLoading, error }
} 