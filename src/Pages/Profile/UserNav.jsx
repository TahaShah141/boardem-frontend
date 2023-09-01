import { NavLink } from 'react-router-dom'

export default function UserNav() {
  return (
    <div className='flex gap-10 text-xl'>
        <NavLink className="nav-link" to="boards">Boards</NavLink>
        <NavLink className="nav-link" to="messages">Messages</NavLink>
    </div>
  )
}
