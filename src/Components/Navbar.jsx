import { NavLink } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useAPIContext } from "../Hooks/useAPIContext";

export default function Navbar({isOpen, setOpen}) {

  const { user, dispatch } = useAuthContext()

  return (
    <>
    <div className="hidden justify-between items-center p-7 bg-primary text-white md:px-10 sm:flex border-b-2 border-black">
        <NavLink to="/" className="text-3xl font-bold md:text-5xl">Board<span className="text-red-500 inline-block -rotate-12 translate-x-1 -translate-y-1">em</span></NavLink>
        {user && (<div className="flex gap-4 text-lg md:gap-9 md:text-xl items-center">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/messages">Messages</NavLink>
        <button className="font-mono border-2 border-white py-2 px-4 text-sm rounded-md bg-neutral-700 hover:scale-110 hover:font-bold hover:border-black hover:bg-red-500" onClick={() => dispatch({type: 'LOGOUT'})}>Log Out</button>
        <NavLink className="profile-link" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" fill="currentColor"/></svg></NavLink>
        </div>)}

        {!user && (<div className="flex gap-4 text-lg md:gap-9 md:text-xl">
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
        </div>)}
    </div>

    <div className="relative flex justify-between items-center p-7 bg-primary text-white md:px-10 sm:hidden border-b-2 border-black">
        <NavLink onClick={() => setOpen(false)} to='/' className="text-3xl font-bold md:text-5xl">Board<span className="text-red-500 inline-block -rotate-12 translate-x-1 -translate-y-1">em</span></NavLink>
        <button onClick={() => setOpen(!isOpen)}className="text-white w-10 h-10"><svg className=" w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" fill="currentColor"/></svg></button>
        {isOpen && (
        <>
          {user && (<div className="absolute bg-primary top-full left-[5%] w-[90%] my-4 rounded-3xl border-4 border-neutral-900 p-3 text-lg flex flex-col items-center gap-4 animate-popup z-10">
          <NavLink className="nav-link" onClick={() => setOpen(false)} to="/">Home</NavLink>
          <NavLink className="nav-link" onClick={() => setOpen(false)} to="/messages">Messages</NavLink>
          <NavLink className="nav-link" onClick={() => setOpen(false)} to="/profile">Profile</NavLink>
          <button className="font-mono border-2 border-white p-2 text-sm rounded-md bg-neutral-700 hover:scale-110 hover:font-bold hover:border-black hover:bg-red-500" onClick={() => {dispatch({type: 'LOGOUT'}); setOpen(false)}}>Log Out</button>
          </div>)}

          {!user && (<div className="absolute bg-primary top-full left-[5%] w-[90%] my-4 rounded-3xl border-4 border-neutral-900 p-3 text-lg flex flex-col items-center gap-4 animate-popup">
          <NavLink className="nav-link" onClick={() => setOpen(false)} to="/signup">Sign Up</NavLink>
          <NavLink className="nav-link" onClick={() => setOpen(false)} to="/login">Login</NavLink>
          </div>)}
        </>
        )}
    </div>
    </>
  )
}
