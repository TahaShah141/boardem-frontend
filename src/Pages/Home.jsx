import { useEffect } from "react"
import BoardView from "../Components/BoardView"
import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('prevURL', JSON.stringify(window.location))
        })
        const prevURL = JSON.parse(localStorage.getItem('prevURL'))

        if (prevURL) {
            const path = prevURL.pathname
            localStorage.removeItem('prevURL')
            navigate(`${path}`)
        }
      }, [])
    
    return (<BoardView delay={10000}/>)
}
