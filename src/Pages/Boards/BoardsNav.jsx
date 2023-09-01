import { NavLink } from 'react-router-dom'

export default function BoardsNav() {
  return (
    <div className='flex gap-10 text-xl'>
        <NavLink className="nav-link" to="created">Created</NavLink>
        <NavLink className="nav-link" to="joined">Joined</NavLink>
    </div>
  )
}
