import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

export const useEditMessage = () => {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAPIContext()
    const { user, dispatch: userDispatch } = useAuthContext()

    const editMessage = async (id, message) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await fetch(`${baseUrl}api/messages/message/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            },
            body: JSON.stringify({
                ...message
            })
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
            dispatch({type: 'EDIT_MESSAGE', payload: json})
        }
        setLoading(false)
    }
    return { editMessage, isLoading, error }
} 