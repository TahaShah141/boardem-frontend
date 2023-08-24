import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

const baseUrl = import.meta.env.VITE_BASE_URL

export const useReload = () => {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAPIContext()
    const { user, dispatch: userDispatch } = useAuthContext()

    const reloadMessages = async ({id, lastRequest}) => {

        setLoading(true)
        setError(null)

        if (!user) return true

        if (!lastRequest) lastRequest = new Date(Date.now()-60000).toISOString()

        const res = await fetch(`${baseUrl}/api/messages/${id ? `${id}/new` : 'new'}?lastRequest=${lastRequest}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                userDispatch({type: 'LOGOUT'})
                return true
            }
            
            setError(json.error)
            return true
        }
        else {
            dispatch({type: 'NEW_MESSAGES', payload: json})
        }
        setLoading(false)
        return true
    }
    return { reloadMessages, isLoading, error }
} 