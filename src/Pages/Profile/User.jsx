import { useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import ChangeCredentials from "../../Components/ChangeCredentials"
import UserNav from "./UserNav";
import { Outlet } from "react-router-dom";

export default function User() {

    const [changing, setChanging] = useState(false)
    const { user, dispatch } = useAuthContext()

    return (
    <>
    <div className="bg-opacity-30 rounded-xl flex flex-col items-center gap-3">
        <div className="bg-neutral-800 rounded-xl border-4 border-black flex gap-3 p-5 text-sm text-white font-mono items-baseline min-[700px]:flex-wrap min-[700px]:flex-row flex-col justify-between w-full">
            <div>Logged in as: <span className="text-3xl text-violet-500 font-sans font-semibold">{user.username}</span></div>
            <div className="flex min-[700px]:flex-wrap min-[700px]:flex-row flex-col gap-3 max-[700px]:w-full">
                <button onClick={() => setChanging(true)} className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-violet-500">Change Username/Password</button>
                <button onClick={() => dispatch({type: 'LOGOUT'})}  className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-105 hover:font-bold hover:border-black hover:border-2 hover:bg-violet-500">Log Out</button>
            </div>
        </div>
        <div className="bg-neutral-800 rounded-xl border-4 border-black py-3 px-5 flex gap-3 text-sm text-white font-mono">
            <UserNav />
        </div>
        <Outlet />
        {changing && <ChangeCredentials closeMessage={() => setChanging(false)} />}
    </div>
    </>)
}
