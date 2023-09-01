import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";

export default function RootLayout() {

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <>
    <header className="sticky top-0">
      <nav className="z-50">
          <Navbar isOpen={isOpen} setOpen={setOpen}/>
      </nav>
    </header>

    <main className="p-7 md:p-10">
      <Outlet />
    </main>
    </>
  )
}
