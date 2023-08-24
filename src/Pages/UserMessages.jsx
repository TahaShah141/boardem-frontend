import { useEffect, useState } from "react"
import { useAPIContext } from "../Hooks/useAPIContext"
import { MessageList } from "../Components/MessageList"
import { useGetUserMessages } from "../Hooks/useGetUserMessages"
import { useParams } from "react-router-dom"
import { useReload } from "../Hooks/useReload"

export default function UserMessages() {

    const { id } = useParams()
    const { getUserMessages, error, isLoading } = useGetUserMessages()

    const { messages, dispatch } = useAPIContext()
    
    const { reloadMessages, isLoading: isReloading, error: reloadError } = useReload()
    
        useEffect(() => {
            dispatch({type: 'CLEAR_MESSAGES'})
            getUserMessages(id)
        }, [id])

    const delay = 20000 //20 seconds
    useEffect(() => {
        if (messages.length === 0 || !id) return

        const reload = setTimeout(() => {
            const lastRequest = messages[0].createdAt
            reloadMessages({lastRequest})
        }, delay)

        return () => {
            clearTimeout(reload)
        }
    }, [messages, id])
    
    return (
    <div className="flex flex-col">
        <div className="self-end p-3">
            {isReloading && <p className="text-neutral-600 hover:text-neutral-400 animate-pulse">...Refreshing</p>}
            {reloadError && <p className="error">{reloadError}</p>}
        </div>
        <div className="bg-neutral-800 rounded-xl border border-black">
            {error && <p className="error">{error.message}</p>}
            {isLoading && <p className=" text-center p-4 text-3xl text-white font-mono font-bold animate-pulse">Loading...</p>}
            {!isLoading && <MessageList messages={messages} editable={id ? false : true} userSpecific={true}/>}
        </div>
    </div>)
}
