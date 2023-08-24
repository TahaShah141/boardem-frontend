import { useContext } from "react"
import { APIContext } from "../Contexts/apiContext"

export const useAPIContext = () => {
    const context = useContext(APIContext)

    if (!context) {
        throw Error("APIContext used outside provider")
    }

    return context
}