import { useEffect, useState } from "react"
import { useAPI } from "../../Hooks/useAPI"
import { useAPIContext } from "../../Hooks/useAPIContext"
import BoardLink from "./BoardLink"
import { Popup } from "../../Components/Popup"
import Password from "../../Components/Password"

export default function BoardsCreated() {

    const {getOwnedBoards, isLoading, error} = useAPI()
    const [adding, setAdding] = useState()
    const { boardsOwned } = useAPIContext()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isPublic, setPublic] = useState(false)

    const { createNewBoard, isLoading: isAdding, error: addError } = useAPI()
    const {dispatch} = useAPIContext()


    useEffect(() => {
        getOwnedBoards()

        return () => dispatch({type: 'CLEAR_BOARDS_OWNED'})
    }, [])

    const cancelAddition = () => {
        setName("")
        setPassword("")
        setPublic(false)
        setAdding(false)
    }

    const confirmAddition = async () => {
        const added = await createNewBoard({name, password, public: isPublic})
        if (added) setAdding(false)
    }

    return (
        <div className="flex gap-3 text-white font-mono flex-col justify-between w-full">
            <button onClick={() => setAdding(true)} className="font-mono border-2 border-white py-2 px-4 text-lg rounded-md bg-neutral-700 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500">Add new Board</button>
            {!isLoading && boardsOwned.length === 0 && <p className={`text-red-500 text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>NO BOARDS MADE</p>}
            {adding && 
            <Popup closeMessage={cancelAddition}>
                <form className="gap-4 p-3 bg-neutral-800 rounded-lg border-2 border-black flex flex-col items-center text-black w-72" onSubmit={(e) => {e.preventDefault(); confirmAddition();}}>
                    {!addError && <h3 className={`text-2xl font-semibold text-white border-b-2 ${isLoading ? 'animate-pulse': "animate-none"}`}>Add Board</h3>}
                    {addError && <div className="error">{addError}</div>}
                    <input type="text" className="text-input w-full" placeholder="Board Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button type="button" onClick={() => setPublic(!isPublic)} className="flex bg-neutral-950 border-black border-4 w-full rounded-lg gap-1 items-center">
                        <div className={`flex-1 ${!isPublic ? "text-white text-lg bg-neutral-900": "text-neutral-700"}`}>Private</div>
                        <div className={`flex-1 ${isPublic ? "text-white text-lg bg-neutral-900": "text-neutral-700"}`}>Public</div>
                    </button>

                    {!isPublic && <Password placeholder={"Board Password"} value={password} setValue={setPassword} styling={"text-input w-full"} name="password" containerStyling="w-full"/> }
                    <div className="flex gap-4 w-full text-white">
                        <button className="flex-1 bg-red-500 p-2 rounded-lg text-xl font-bold font-mono border-4 border-black" onClick={cancelAddition}>Cancel</button>
                        <button className="flex-1 bg-green-600 p-2 rounded-lg text-xl font-bold font-mono border-4 border-black" type="submit" disabled={isAdding}>Confirm</button>
                    </div>
                </form>
            </Popup>}
            {error && <div className="error">{error}</div> }
            {isLoading && <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full animate-pulse`}>Loading Boards</p>}
            {boardsOwned.map(board => <BoardLink key={board._id} board={board}/>)}  
        </div>
    )
}
