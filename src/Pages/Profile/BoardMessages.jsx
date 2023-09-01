import { useState } from "react"
import { MessageList } from "../../Components/MessageList"

export default function BoardMessages({board}) {

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="flex flex-col gap-2 w-full items-center justify-center">
            <button onClick={() => setCollapsed(!collapsed)} className="flex flex-col w-full">
                    <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>{board.name}</p>
                    {board.owner && <p className="self-center text-center bg-neutral-950 border-black border font-mono tracking-widest w-48 rounded-b-lg text-white">{board.owner}</p>}
            </button>

            {!collapsed && <MessageList messages={board.messages} editable={true} userSpecific={true} />}
        </div>
    )
}
