import { Link } from "react-router-dom"

export default function Protected404() {
  return (
    <div className="bg-neutral-800 rounded-xl border border-black">
        <p>It Seems like you took a detour from the flow of the app.</p>
        <div>Click <Link to="/">Home</Link> to return to the home page</div>
        <p>Feel free to use the NavBar to go elsewhere, but you wont find something on this page</p>
    </div>
  )
}
