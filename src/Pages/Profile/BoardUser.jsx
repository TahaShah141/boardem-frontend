import { useAPI } from "../../Hooks/useAPI"

export default function BoardUser({ boardID, user }) {

    const {updateBoardUser, kickBoardUser, isLoading, error} = useAPI()

    const updateUser = (isAuthor) => {
        if (isLoading || error) return
        updateBoardUser(boardID, user._id, isAuthor)
    }

    const kickUser = () => {
        if (isLoading || error) return
        kickBoardUser(boardID, user._id)
    }

    return (
        <div className="p-3 bg-neutral-950 bg-opacity-20 rounded-lg border-2 border-black flex justify-between items-center">
            {!error && <div className={`font-bold tracking-wider p-1 ${isLoading ? 'animate-pulse': 'animate-none'}`}>{user.username}</div>}
            {error && <div className="error">{error}</div>}
            <div className="flex gap-1 x-sm:gap-3">
                <button className="x-sm:block font-mono border border-white py-1 px-2 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500 hidden" disabled={isLoading} onClick={() => updateUser(!user.isAuthor)}>{user.isAuthor ? "Author":"Viewer"}</button>
                <button className="h-10 w-10 p-2 bg-neutral-950 rounded-full x-sm:hidden" disabled={isLoading} onClick={() => updateUser(!user.isAuthor)}> 
                    {user.isAuthor ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>make reader</title><path d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M18.96 7.33L13.29 13H11V10.71L16.67 5.03L18.96 7.33M22.36 6.55C22.35 6.85 22.04 7.16 21.72 7.47L19.2 10L18.33 9.13L20.93 6.54L20.34 5.95L19.67 6.62L17.38 4.33L19.53 2.18C19.77 1.94 20.16 1.94 20.39 2.18L21.82 3.61C22.06 3.83 22.06 4.23 21.82 4.47C21.61 4.68 21.41 4.88 21.41 5.08C21.39 5.28 21.59 5.5 21.79 5.67C22.08 5.97 22.37 6.25 22.36 6.55Z" fill="currentColor" /></svg>:
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>make author</title><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" fill="currentColor"/></svg>}
                </button>
                <button className="x-sm:block font-mono border border-white py-1 px-2 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500 hidden" disabled={isLoading} onClick={() => kickUser()}>Kick</button>
                <button className="h-10 w-10 p-2 bg-neutral-950 rounded-full x-sm:hidden" disabled={isLoading} onClick={() => kickUser()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>kick</title><path d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z" fill="currentColor"/></svg>
                </button>
            </div>
        </div>
    )
}
