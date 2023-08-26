import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

const baseUrl = import.meta.env.VITE_BASE_URL

const makeRequest = async (endpoint, {method, body, token}={}) => {
    
    if (!method) method = 'GET'
    const options = {
        method,
        headers: {'Content-Type': 'application/json'}
    }
    console.log(options)
    
    if (token) options.headers = {...options.headers, 'Authorization': `Bearer ${token}`} 
    if (body) options.body = JSON.stringify(body)

    // const res = await fetch(`${baseUrl}/${endpoint}`, options)
    const res = await fetch(`/${endpoint}`, options)

    return res
}

export const useAPI = () => {
    
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user, dispatch: authDispatch } = useAuthContext()
    const { board, dispatch: apiDispatch } = useAPIContext()

    //USER RELATED
    const userAuth = async (endpoint, username, password) => {
        const method = endpoint === 'change' ? 'PATCH' : 'POST'
        const route = endpoint === 'change' ? 'user' : 'auth'

        const options = {
            method,
            body: {username, password},
        }

        if (endpoint === 'change') options.token = user.token
        
        setLoading(true)
        setError(null)

        const res = await makeRequest(`api/${route}/${endpoint}`, options)

        const json = await res.json()

        if (!res.ok) {
            setLoading(false)
            setError(json.error)
            return false
        }
        else {
            localStorage.setItem('user', JSON.stringify(json))
            authDispatch({type: 'LOGIN', payload: json})
            setLoading(false)
            return true
        }
    }

    //MESSAGE RELATED
    const newMessage = async (title, content, boardID) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const endpoint = boardID ? `api/messages/${boardID}/new`: 'api/public/messages'
        
        const res = await makeRequest(endpoint, {
            method: 'POST',
            body: {title, content},
            token: user.token
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return false
            }
            setError(json.error)
            setLoading(false)
        }
        else {
            apiDispatch({type: 'NEW_MESSAGE', payload: json})
            setLoading(false)
            return true
        }
    }
    
    const getMessages = async (boardID) => {
        setLoading(true)
        setError(null)

        console.log("Getting messages")
        if (boardID && !user) return
        console.log("Getting messages")
        
        const endpoint = boardID ? `api/messages/${boardID}/messages`: 'api/public/messages'

        const res = await makeRequest(endpoint)

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return
            }

            setError(json.error)
        }
        else {
            apiDispatch({type: 'SET_MESSAGES', payload: json})
        }
        setLoading(false)
    }


    const editMessage = async (id, message) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await makeRequest(`api/messages/message/${id}`, {
            method: "PATCH",
            body: {...message},
            token: user.token
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return
            }

            setError(json.error)
        }
        else {
            apiDispatch({type: 'EDIT_MESSAGE', payload: json})
        }
        setLoading(false)
    }

    const deleteMessage = async (id) => {

        setLoading(true)
        setError(null)

        if (!user) return

        const res = await makeRequest(`api/messages/message/${id}`, {
            method: "DELETE"
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return
            }

            setError(json.error)
        }
        else {
            apiDispatch({type: 'DELETE_MESSAGE', payload: json})
        }
        setLoading(false)
    }

    const reloadMessages = async ({board, lastRequest}) => {
        setLoading(true)
        setError(null)

        const query = `lastRequest=${lastRequest}`

        const endpoint = board ? `api/messages/${board}/new?${query}` : `api/public/new?${query}`
        const options = {
            method: 'GET'
        }

        if (board) options.token = user.token

        const res = await makeRequest(endpoint, options)

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return true
            }
            
            setError(json.error)
            return true
        }
        else {
            apiDispatch({type: 'NEW_MESSAGES', payload: json})
        }
        setLoading(false)
        return true
    }

    const getBoard = async (id) => {
        setLoading(true)
        setError(null)

        if (!id && !user) return

        const res = await makeRequest(`api/boards/${id}`, {
            token: user.token
        })

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return
            }
            
            setError(json.error)
            return false
        }
        else {
            apiDispatch({type: 'BOARD', payload: json})
            console.log(json)
            setLoading(false)
            return true
        }
    }

    const getPublicBoard = async () => {
        setLoading(true)
        setError(null)

        const res = await makeRequest(`api/public/board`)

        const json = await res.json()

        if (!res.ok) {
            if (res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return
            }

            setError(json.error)
            return false
        }
        else {
            apiDispatch({type: 'BOARD', payload: json})
            setLoading(false)
            return true
        }
    }

    const initBoard = async (id) => {
        if (id) {
            await getBoard(id)
            await getMessages(board._id)
        } else {
            await getPublicBoard()
            await getMessages()
        }
    }

    return { 
        userAuth,
        
        newMessage,
        getMessages,
        editMessage,
        deleteMessage,
        reloadMessages,

        getBoard,
        getPublicBoard,
        initBoard,

        isLoading, error
    }
} 