import { useContext } from "react"
import { AuthContext } from "../Contexts/authContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("AuthContext used outside provider")
    }

    return context
}