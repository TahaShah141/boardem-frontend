import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAPI } from "../../Hooks/useAPI";
import { Popup } from "../../Components/Popup";

export default function BoardLink({board, allowed=true}) {

    const {loginBoard, isLoading, error} = useAPI()

    const navigate = useNavigate()

    const [password, setPassword] = useState("")

    const login = async () => {
        if (isLoading) return
        const loggedIn = await loginBoard(board._id, password)
        if (loggedIn) navigate(`/boards/${board._id}`)
    } 

    return (
    <div className="w-full">
        {allowed && 
        <Link to={`/boards/${board._id}`} className="flex flex-col">
                <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest`}>{board.name}</p>
                {board.owner && <p className="self-center text-center bg-neutral-950 border-black border font-mono tracking-widest w-48 rounded-b-lg">{board.owner}</p>}
        </Link>}

        {!allowed && 
        <div  className="inline-flex flex-col w-full">
            {!true && 
            <>
            <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>{board.name}</p>
            <div className="flex self-center justify-center bg-neutral-950 border-black border gap-1 w-48 rounded-b-lg">
                <div className="text-white w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" fill="currentColor"/></svg>
                </div>
                {board.owner && <p className="inline font-mono tracking-widest">{board.owner}</p>}
            </div>
            </>}

            {true && 
            <>
            <input type="text" placeholder="Password" className="text-input w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login} type="button" className="flex self-center justify-center bg-neutral-950 border-black border gap-1 w-48 rounded-b-lg">Join Board</button>
            </>}
        </div>}
    </div>
    )
}
