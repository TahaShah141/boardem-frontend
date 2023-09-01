import { useEffect } from "react"
import { useAPI } from "../../Hooks/useAPI"
import { useAPIContext } from "../../Hooks/useAPIContext"
import BoardMessages from "./BoardMessages"

export default function MessagesSent() {

    const { getMessagesSent, isLoading, error} = useAPI()
    const { messagesSent } = useAPIContext()

    useEffect(() => {
        getMessagesSent()
    }, [])

    return (
        <div className="flex flex-col w-full gap-4">
            {error && <div className="error" >{error}</div>}
            {isLoading && <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full animate-pulse`}>Loading Messages</p>}
            {!isLoading && messagesSent.map(board => <BoardMessages key={board._id} board={board} />)}
        </div>
    )
}
