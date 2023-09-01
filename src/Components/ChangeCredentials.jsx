import { useEffect, useState } from 'react'
import AuthForm from './AuthForm'
import { Popup } from './Popup'

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
        <Popup closeMessage={closeMessage}>
            <AuthForm type={'change'} buttonText={buttonText} onSuccess={success} header={header} />
        </Popup>
  )
}
