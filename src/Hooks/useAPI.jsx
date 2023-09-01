import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useAPIContext } from "./useAPIContext"

const baseUrl = import.meta.env.VITE_BASE_URL

export const useAPI = () => {
    
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user, dispatch: authDispatch } = useAuthContext()
    const { board, dispatch: apiDispatch } = useAPIContext()

    const makeRequest = async (endpoint, {method, body, token}={}) => {
        setLoading(true)
        setError(null)
    
        if (!method) method = 'GET'
        const options = {
            method,
            headers: {'Content-Type': 'application/json'}
        }
    
        if (token) options.headers = {...options.headers, 'Authorization': `Bearer ${token}`} 
        if (body) options.body = JSON.stringify(body)
    
        const res = await fetch(`${baseUrl}/${endpoint}`, options)
        // const res = await fetch(`/${endpoint}`, options)
    
        return res
    }

    const handleResponse = (res, json, success=()=>{}, logout=true) => {
        if (!res.ok) {
            if (logout && res.status === 401) {
                authDispatch({type: 'LOGOUT'})
                return false
            }
            setError(json.error)
            setLoading(false)
        }
        else {
            success()
            setLoading(false)
            return true
        }
    }
    
    //USER RELATED
    const userAuth = async (endpoint, username, password) => {
        const method = endpoint === 'change' ? 'PATCH' : 'POST'
        const route = endpoint === 'change' ? 'user' : 'auth'

        const options = {
            method,
            body: {username, password},
        }

        if (endpoint === 'change') options.token = user.token

        const res = await makeRequest(`api/${route}/${endpoint}`, options)

        const json = await res.json() //username and token

        return handleResponse(res, json, () => {
            authDispatch({type: 'LOGIN', payload: json})
            localStorage.setItem('user', JSON.stringify(json))
        }, false)
    }

    //MESSAGE RELATED
    const newMessage = async (title, content, boardID) => {
        if (!user) return

        const endpoint = boardID ? `api/messages/${boardID}`: 'api/public/messages'
        
        const res = await makeRequest(endpoint, {
            method: 'POST',
            body: {title, content},
            token: user.token
        })

        const json = await res.json() //message schema

        return handleResponse(res, json, () => {
            apiDispatch({type: 'NEW_MESSAGE', payload: json})
        })
    }
    
    const getMessages = async (boardID) => {     
        const endpoint = boardID ? `api/messages/${boardID}`: 'api/public/messages'

        const options = {
            method: 'GET'
        }

        if (boardID && user) options.token = user.token

        const res = await makeRequest(endpoint, options)

        const json = await res.json() //messages array

        return handleResponse(res, json, () => {
            apiDispatch({type: 'SET_MESSAGES', payload: json})
        })
    }


    const editMessage = async (id, message) => {
        if (!user) return
        
        const res = await makeRequest(`api/messages/message/${id}`, {
            method: "PATCH",
            body: {...message},
            token: user.token
        })

        const json = await res.json() //updated message

        return handleResponse(res, json, () => {
            apiDispatch({type: 'EDIT_MESSAGE', payload: json})
        })
    }

    const deleteMessage = async (id) => {
        if (!user) return

        const res = await makeRequest(`api/messages/message/${id}`, {
            method: "DELETE",
            token: user.token
        })

        const json = await res.json() //deleted message

        return handleResponse(res, json, () => {
            apiDispatch({type: 'DELETE_MESSAGE', payload: json})
        })
    }

    const reloadMessages = async ({board, lastRequest}) => {
        const query = `lastRequest=${lastRequest}`

        const endpoint = board ? `api/messages/${board}/new?${query}` : `api/public/new?${query}`
        const options = {
            method: 'GET'
        }

        if (board) options.token = user.token

        const res = await makeRequest(endpoint, options)

        const json = await res.json() //message list

        return handleResponse(res, json, () => {
            apiDispatch({type: 'NEW_MESSAGES', payload: json})
        })
    }

    const getBoard = async (id) => {
        if (!id && !user) return

        const res = await makeRequest(`api/boards/${id}`, {
            token: user.token
        })

        const json = await res.json() //board schema

        return handleResponse(res, json, () => {
            apiDispatch({type: 'BOARD', payload: json})
        })
    }

    const getPublicBoard = async () => {
        const res = await makeRequest(`api/public/board`)

        const json = await res.json() //board

        return handleResponse(res, json, () => {
            apiDispatch({type: 'BOARD', payload: json})
        })
    }

    const initBoard = async (id) => {
        if (id) {
            await getBoard(id)
            await getMessages(id)
        } else {
            await getPublicBoard()
            await getMessages()
        }
    }

    const getOwnedBoards = async () => {
        const res = await makeRequest('api/user/boards/owned', {
            method: 'GET',
            token: user.token
        })

        const json = await res.json() //list of boards owned by user

        return handleResponse(res, json, () => {
            apiDispatch({type: 'SET_OWNED_BOARDS', payload: json})
        })
    }

    const editBoard = async (board) => {
        const res = await makeRequest(`api/boards/${board._id}`, {
            method: 'PATCH',
            token: user.token,
            body: {...board}
        })

        const json = await res.json() //edited board

        return handleResponse(res, json, () => {
            apiDispatch({type: 'EDIT_OWNED_BOARD', payload: json})
        })
    }

    const deleteBoard = async (board) => {
        const res = await makeRequest(`api/boards/${board._id}`, {
            method: 'DELETE',
            token: user.token,
            body: {...board}
        })

        const json = await res.json() //deleted board

        return handleResponse(res, json, () => {
            apiDispatch({type: 'DELETE_OWNED_BOARD', payload: json})
        })
    }

    const createNewBoard = async (board) => {
        const res = await makeRequest(`api/boards/new`, {
            method: 'POST',
            token: user.token,
            body: {...board}
        })

        const json = await res.json() //created board

        return handleResponse(res, json, () => {
            const newBoard = {_id: json._id, name: json.name, password: json.password, public: json.public, users: []}
            apiDispatch({type: 'NEW_BOARD', payload: newBoard})
        })
    }

    const updateBoardUser = async (boardID, userID, isAuthor) => {
        const res = await makeRequest(`api/boards/${boardID}/${userID}`, {
            method: 'PATCH',
            token: user.token,
            body: {isAuthor}
        })

        const json = await res.json() //board user

        return handleResponse(res, json, () => {
            apiDispatch({type: 'EDIT_BOARDS_USER', payload: {boardID, userID, isAuthor}})
        })
    }

    const kickBoardUser = async (boardID, userID) => {
        const res = await makeRequest(`api/boards/${boardID}/${userID}`, {
            method: 'DELETE',
            token: user.token,
        })

        const json = await res.json() 

        return handleResponse(res, json, () => {
            apiDispatch({type: 'KICK_BOARDS_USER', payload: {boardID, userID}})
        })
    }

    const getJoinedBoards = async () => {
        const res = await makeRequest('api/boards/joined', {
            method: 'GET',
            token: user.token
        })

        const json = await res.json()

        return handleResponse(res, json, () => {
            apiDispatch({type: 'SET_JOINED_BOARDS', payload: json})
        })
    }

    const searchBoards = async (query) => {
        const res = await makeRequest(`api/boards/search?query=${query}`, {
            method: 'GET',
            token: user.token,
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
            setLoading(false)
            return json
        }
    }

    const loginBoard = async (boardID, password) => {
        const res = await makeRequest(`api/boards/${boardID}/login`, {
            method: 'POST',
            token: user.token,
            body: {password}
        })

        const json = await res.json()

        return handleResponse(res, json, () => {
            apiDispatch({type: 'JOIN_BOARD', payload: json})
        })
    }
    
    const getMessagesSent = async () => {
        const res = await makeRequest('api/user/messages', {
            method: 'GET',
            token: user.token
        })

        const json = await res.json()
        
        return handleResponse(res, json, () => {
            apiDispatch({type: 'SET_MESSAGES_SENT', payload: json})
        })
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
        createNewBoard,
        initBoard,
        editBoard,
        deleteBoard,
        getOwnedBoards,
        getJoinedBoards,
        getMessagesSent,
        loginBoard,
        searchBoards,
        updateBoardUser,
        kickBoardUser,

        isLoading, error
    }
} 