import { useEffect, useState } from "react"
import { useAPI } from "../../Hooks/useAPI"
import { useAPIContext } from "../../Hooks/useAPIContext"
import BoardLink from "./BoardLink"

export default function BoardsJoined() {

    const {getJoinedBoards, isLoading, error} = useAPI()
    const {searchBoards, isLoading: searching, error: searchError} = useAPI()
    const { boardsJoined, dispatch } = useAPIContext()
    const [query, setQuery] = useState("")

    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        getJoinedBoards()

        return () => dispatch({type: 'CLEAR_BOARDS_JOINED'})
    }, [])

    const search = async () => {
        const searched = await searchBoards(query)
        if (searched) setSearchResults(searched)
    }

    return (
        <div className="flex gap-3 text-white font-mono flex-col justify-between w-full">

            <div className={`relative flex items-center`}>
                <input type="text" className="text-input w-full" value={query} onChange={(e) => {setQuery(e.target.value); setSearchResults(null)}} placeholder="Search..."/>
                <button onClick={search} type="button" className="absolute right-0 m-2 h-8 w-8 p-1 text-neutral-400 hover:text-neutral-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>search</title><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" fill="currentColor"/></svg>
                </button>
            </div>

            {searchResults &&
            <div className="flex flex-col gap-2 p-2">
                {searching && <p className="animate-pulse">Searching</p>}
                {searchError && <div className="error">{searchError}</div>}
                {searchResults.length === 0 && <p>No Boards Found</p>}
                {searchResults.length !== 0 && <p>{`Found ${searchResults.length} board(s)...`}</p>}
                {searchResults.map(board => <BoardLink key={board._id} board={board} allowed={board.loggedIn} />)}
            </div>
            }
            <hr />
            {!isLoading && boardsJoined.length === 0 && <p className={`text-red-500 text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full`}>NO BOARDS JOINED</p>}
            {error && <div className="error">{error}</div> }
            {isLoading && <p className={`text-white text-xl text-center py-2 bg-neutral-800 rounded-xl font-mono border-4 border-black tracking-widest w-full animate-pulse`}>Loading Boards</p>}
            {boardsJoined.map(board => <BoardLink key={board._id} board={board}/>)}  
        </div>
    )
}
