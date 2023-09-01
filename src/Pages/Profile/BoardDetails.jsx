import { useEffect } from "react"
import BoardDetail from "./BoardDetail"
import { useAPI } from "../../Hooks/useAPI"
import { useAPIContext } from "../../Hooks/useAPIContext"

export default function BoardDetails() {

    const {getOwnedBoards, isLoading, error} = useAPI()
    const { boardsOwned, dispatch } = useAPIContext()

    useEffect(() => {
        getOwnedBoards()

        return () => dispatch({type: 'CLEAR_BOARDS_OWNED'})
    }, [])

    return (
        <div className="flex gap-3 text-white font-mono flex-col justify-between w-full">
            {!isLoading && boardsOwned.length === 0 && <p className={`text-red-500 text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>NO BOARDS MADE</p>}
            {error && <div className="error">{error}</div> }
            {isLoading && <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full animate-pulse`}>Loading Boards</p>}
            {boardsOwned.map(board => <BoardDetail key={board._id} board={board} />)} 
        </div>
    )
}
