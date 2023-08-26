import { useEffect, useState } from 'react'
import AuthForm from './AuthForm'

export default function ChangeCredentials({ closeMessage }) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [buttonText, setButtonText] = useState("Login")
    const [header, setHeader] = useState("Login")

    useEffect(() => {
        if (loggedIn) {
            setButtonText("Change")
            setHeader('Make Changes')
        }
    }, [loggedIn])

    const success = () => {
        if (loggedIn) closeMessage()
        else setLoggedIn(true)
    }

    return (
        <div onClick={closeMessage} className="flex justify-center bg-opacity-90 items-center fixed bg-black top-0 left-0 w-full max-h-screen h-full">
            <AuthForm type={'change'} buttonText={buttonText} onSuccess={success} header={header} />
        </div>
  )
}
