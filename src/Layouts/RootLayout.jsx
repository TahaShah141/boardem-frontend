import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function RootLayout() {
  return (
    <>
    <header className="sticky top-0">
      <nav>
          <Navbar />
      </nav>
    </header>

    <main className="p-7 md:p-10">
      <Outlet />
    </main>
    </>
  )
}
