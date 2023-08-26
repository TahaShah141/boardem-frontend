import { useEffect } from "react"
import { useAPI } from "../Hooks/useAPI"
import { useAPIContext } from "../Hooks/useAPIContext"
import { MessageList } from "./MessageList"
import { useReload } from "../Hooks/useReload"

export default function BoardView({id, delay=0, editable=false, userSpecific=false}) {

    const { board, messages } = useAPIContext()
    const {initBoard, reloadMessages, isLoading, error } = useAPI()

    useEffect(() => {
        initBoard(id)
    }, [id])

    useEffect(() => {
        if (!delay) return
        const reload = setTimeout(() => { 
            const lastRequest = (messages.length === 0) ? new Date.now() : messages[0].createdAt
            reloadMessages({lastRequest})
        }, delay)

        return () => {
            clearTimeout(reload)
        }
    }, [delay, board, messages])

return (
        <>
        <div className="flex flex-col gap-3">
            <div className={`text-white text-4xl text-center p-2 bg-primary rounded-xl font-mono border-4 border-black tracking-widest uppercase ${isLoading ? "animate-pulse": ""}`}>
                {!error && 
                (board && board.name) ||
                (!board && <p>loading</p>)}
                {error && <div className="error">{error}</div>}
            </div>
            <MessageList messages={messages} />
        </div>
        </>
    )
}
