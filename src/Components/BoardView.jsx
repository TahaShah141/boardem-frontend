import { useEffect, useState } from "react"
import { useAPI } from "../Hooks/useAPI"
import { useAPIContext } from "../Hooks/useAPIContext"
import { MessageList } from "./MessageList"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../Hooks/useAuthContext"
import { Popup } from '../Components/Popup'
import NewMessage from "../Components/NewMessage"

export default function BoardView({delay=0}) {

    const {boardID} = useParams()
    const { user } = useAuthContext()
    const [sending, setSending] = useState(false)
    const [allowed, setAllowed] = useState(false)
    const { board, messages, dispatch: APIdispatch } = useAPIContext()
    const {initBoard, reloadMessages, isLoading, error } = useAPI()

    useEffect(() => {
        initBoard(boardID)
        
        return () => APIdispatch({type: 'CLEAR_VIEW'})
    }, [boardID])

    useEffect(() => {
        if (board) setAllowed(board.allowed)
    }, [board])

    useEffect(() => {
        if (!delay || !board) return
        const reload = setTimeout(() => { 
            const lastRequest = (messages.length === 0) ? Date.now() : messages[0].createdAt
            reloadMessages({lastRequest})
        }, delay)

        return () => {
            clearTimeout(reload)
        }
    }, [delay, board, messages])

return (
        <>
        <div className="flex flex-col gap-3">
            {user && allowed &&
            <div className="group fixed bottom-0 right-0 flex items-center text-white opacity-75 hover:opacity-100">
                <button onClick={() => setSending(true)} className="peer m-3 w-12 h-12 bg-violet-500 border-4 border-black rounded-full order-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/></svg></button>
                <p className="bg-violet-500 py-2 px-4 font-mono rounded-lg border-4 border-black animate-popup hidden group-hover:inline-block peer-focus:inline-block">Add a New Message</p>
            </div>}
            <div className={`text-white text-xl x-sm:text-2xl sm:text-4xl text-center p-2 bg-primary rounded-xl font-mono border-4 border-black tracking-widest ${isLoading ? "animate-pulse": "animate-none"}`}>
                {!error && 
                (board && board.name) ||
                (!board && <p>loading</p>)}
                {error && <div className="error">{error}</div>}
            </div>
            <MessageList messages={messages} />
            {sending && 
            <Popup closeMessage={() => setSending(false)}>
                <NewMessage onSuccess={() => setSending(false)} board={board}/>
            </Popup>}
        </div>
        </>
    )
}
