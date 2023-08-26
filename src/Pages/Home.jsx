import { useEffect, useState } from "react"
import BoardView from "../Components/BoardView"
import { useAuthContext } from "../Hooks/useAuthContext"
import Popup from '../Components/Popup'
import NewMessage from "../Components/NewMessage"

export default function Home() {

    const [sending, setSending] = useState(false)
    const { user } = useAuthContext()
    
    return (
    <>
    <div className="flex flex-col">
        <div>
            {user && 
            <div className="group fixed bottom-0 right-0 flex items-center text-white opacity-75 hover:opacity-100">
                <button onClick={() => setSending(true)} className="peer m-3 w-12 h-12 bg-red-500 border-4 border-black rounded-full order-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/></svg></button>
                <p className="bg-red-500 py-2 px-4 font-mono rounded-lg border-4 border-black animate-popup hidden group-hover:inline-block peer-focus:inline-block">Add a New Message</p>
            </div>}
            <BoardView delay={0}/>
            {sending && 
            <Popup closeMessage={() => setSending(false)}>
                <NewMessage onSuccess={() => setSending(false)}/>
            </Popup>}
        </div>
    </div>
    </>)
}
