import { useEffect, useState } from "react"
import { useAPIContext } from "../Hooks/useAPIContext"
import { MessageList } from "../Components/MessageList"
import { useGetUserMessages } from "../Hooks/useGetUserMessages"
import { useParams } from "react-router-dom"

export default function UserMessages() {

    const { id } = useParams()
    const { getUserMessages, error, isLoading } = useGetUserMessages()

    const { messages } = useAPIContext()

    useEffect(() => {
        getUserMessages(id)
    }, [id])
    
    return (
    <>
    <div className="bg-neutral-800 rounded-xl border border-black">
        {error && <p className="error">{error.message}</p>}
        {isLoading && <p className=" text-center p-4 text-3xl text-white font-mono font-bold animate-pulse">Loading...</p>}
        {!isLoading && <MessageList messages={messages} editable={id ? false : true} userSpecific={true}/>}
    </div>
    </>)
}
