import { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import UserMessages from "./UserMessages";
import NewMessage from "../Components/NewMessage"
import ChangeCredentials from "../Components/ChangeCredentials"
import { useAPIContext } from "../Hooks/useAPIContext";

export default function User() {

    const [sending, setSending] = useState(false)
    const [changing, setChanging] = useState(false)
    const { user, dispatch } = useAuthContext()

    return (
    <>
    <div className="bg-neutral-950 bg-opacity-30 rounded-xl p-3 flex flex-col gap-3">
        <div className="bg-neutral-800 rounded-xl border border-black flex gap-3 p-5 text-sm text-white font-mono items-baseline flex-wrap justify-between">
            <div>Logged in as: <span className="text-3xl text-red-500 font-sans font-semibold">{user.username}</span></div>
            <div className="flex flex-wrap gap-3 self-center">
                <button onClick={() => setSending(true)} className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500 min-[600px]:w-fit w-full">Add New Message</button>
                <button onClick={() => setChanging(true)} className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500 min-[600px]:w-fit w-full">Change Username/Password</button>
                <button onClick={() => dispatch({type: 'LOGOUT'})}  className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-red-500 min-[600px]:w-fit w-full">Logout</button>
            </div>
        </div>
        <UserMessages />
        {sending && <NewMessage closeMessage={() => setSending(false)}/>}
        {changing && <ChangeCredentials closeMessage={() => setChanging(false)} />}
    </div>
    </>)
}
