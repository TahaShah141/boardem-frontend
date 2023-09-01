import { Outlet } from "react-router-dom";
import BoardsNav from "./BoardsNav";

export default function Boards() {

    return (
    <>
    <div className="bg-opacity-30 rounded-xl flex flex-col items-center gap-3">
        <div className="bg-neutral-800 rounded-xl border-4 border-black py-3 px-5 flex gap-3 text-sm text-white font-mono m-2">
            <BoardsNav />
        </div>
        <Outlet />
    </div>
    </>)
}
