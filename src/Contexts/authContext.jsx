import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user:null
    })

    useEffect(() => {
        dispatch({type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user'))})
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}
