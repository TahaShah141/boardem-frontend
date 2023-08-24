import { useEffect, useState } from "react"
import { useAPIContext } from "../Hooks/useAPIContext"
import { useGetMessages } from "../Hooks/useGetMessages"
import { MessageList } from "../Components/MessageList"
import NewMessage from "../Components/NewMessage"

export default function Home() {

    const { getMessages, error, isLoading } = useGetMessages()
    const [sending, setSending] = useState(false)

    const { messages } = useAPIContext()

    useEffect(() => {
        getMessages()
    }, [])
    
    return (
    <>
    <div className="bg-neutral-800 rounded-xl border border-black">
        <div className="group fixed bottom-0 right-0 flex items-center text-white opacity-75 hover:opacity-100">
            <button onClick={() => setSending(true)} className="peer m-3 w-12 h-12 bg-red-500 border-4 border-black rounded-full order-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/></svg></button>
            <p className="bg-red-500 py-2 px-4 font-mono rounded-lg border-4 border-black animate-popup hidden group-hover:inline-block peer-focus:inline-block">Add a New Message</p>
        </div>
        {error && <p className="error">{error.message}</p>}
        {isLoading && <p className=" text-center p-4 text-3xl text-white font-mono font-bold animate-pulse">Loading...</p>}
        {!isLoading && <MessageList messages={messages} />}
        {sending && <NewMessage closeMessage={() => setSending(false)}/>}
    </div>
    </>)
}
