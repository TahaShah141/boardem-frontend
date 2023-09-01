import { useState } from "react"
import BoardUser from "./BoardUser"
import Password from "../../Components/Password"
import { useAPI } from "../../Hooks/useAPI"
import { Popup } from "../../Components/Popup"

export default function BoardDetail({board}) {

    const { editBoard, deleteBoard, isLoading, error } = useAPI()

    const [collapsed, setCollapsed] = useState(true)
    const [editing, setEditing] = useState(false)

    const [name, setName] = useState(board.name)
    const [password, setPassword] = useState(board.password)
    const [isPublic, setPublic] = useState(board.public)
    const cancelEdit = () => {
        setName(board.name)
        setPassword(board.password)
        setPublic(board.public)
        setEditing(false)
    }

    const confirmEdit = async () => {
        const edited = await editBoard({_id: board._id, name, password, public: isPublic})
        if (edited) setEditing(false)
    }

    const confirmDelete = async () => {
        const deleted = await deleteBoard({_id: board._id, name, password, public: isPublic})
        if (deleted) setEditing(false)
    }

    return (
    <div className="flex flex-col items-center">
        <button onClick={() => setCollapsed(!collapsed)} className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>
            <p>{board.name}</p>
        </button>

        {!collapsed && <div className="bg-neutral-900 p-5 w-[95%] border-t-0 border-4 border-black rounded-b-xl flex flex-col gap-3">
            {!editing && <button onClick={() => setEditing(true)} className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 x-sm:hover:scale-100 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500">Edit Board</button>}
            {editing &&
            <Popup closeMessage={cancelEdit}>
                <form className="relative gap-4 p-3 bg-neutral-800 rounded-lg border-2 border-black flex flex-col items-center text-black w-72" onClick={(e) => e.stopPropagation()} onSubmit={(e) => {e.preventDefault(); confirmEdit();}}>
                    {!error && <h3 className={`text-2xl font-semibold text-white border-b-2 ${isLoading ? 'animate-pulse -z-10': "animate-none"}`}>Edit Board</h3>}
                    {error && <div className="error">{error}</div>}
                    <input type="text" className="text-input w-full" placeholder="Board Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button type="button" onClick={() => setPublic(!isPublic)} className="flex bg-neutral-950 border-black border-4 w-full rounded-lg gap-1 items-center">
                        <div className={`flex-1 ${!isPublic ? "text-white text-lg bg-neutral-900": "text-neutral-700"}`}>Private</div>
                        <div className={`flex-1 ${isPublic ? "text-white text-lg bg-neutral-900": "text-neutral-700"}`}>Public</div>
                    </button>

                    {!isPublic && <Password placeholder={"Board Password"} value={password} setValue={setPassword} styling={"text-input w-full"} name="password" containerStyling="w-full"/> }
                    <div className="flex gap-4 w-full text-white">
                        <button className="flex-1 bg-red-500 p-2 rounded-lg text-xl font-bold font-mono border-4 border-black" onClick={cancelEdit}>Cancel</button>
                        <button className="flex-1 bg-green-600 p-2 rounded-lg text-xl font-bold font-mono border-4 border-black" type="submit">Confirm</button>
                    </div>
                    <button onClick={confirmDelete} className='absolute top-0 right-0 m-4 w-7 h-7 p-1 x-sm:w-9 x-sm:h-9 sm:h-11 sm:w-11 sm:p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-25 hover:scale-110 focus:bg-opacity-25 focus:scale-110 text-white' type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" fill='currentColor'/></svg>
                    </button>
                </form>
            </Popup>
            }
            {board.users.map(user => <BoardUser key={user._id} user={user} boardID={board._id}/>)}
            {board.users.map(user => <BoardUser key={user._id} user={user} boardID={board._id}/>)}
            {board.users.map(user => <BoardUser key={user._id} user={user} boardID={board._id}/>)}
            {board.users.map(user => <BoardUser key={user._id} user={user} boardID={board._id}/>)}
        </div>}
    </div>
    )   
}
