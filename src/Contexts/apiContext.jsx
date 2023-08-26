import { createContext, useReducer } from "react";

export const APIContext = createContext()

export const apiReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {...state, messages : action.payload}
        case 'NEW_MESSAGE':
            return {...state, messages: [action.payload, ...(state.messages)]}
        case 'NEW_MESSAGES':
            return {...state, messages: [...action.payload, ...(state.messages)]}
        case 'DELETE_MESSAGE':
            return {...state, messages: state.messages.filter(msg => msg._id !== action.payload._id)}
        case 'CLEAR_MESSAGES':
            return {...state, messages: []}
        case 'EDIT_MESSAGE':
            return {...state,
                messages: state.messages.map((msg) => {
                    if (msg._id === action.payload._id)
                        return {...msg, ...action.payload}
                    else return msg
                    })
            }
        case 'BOARD':
            return {...state, board: action.payload}
        
        default:
            return state
    }
}

export const APIContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, {
        messages: [],
        board: null
    })

    console.log(state.board)

    return (
        <APIContext.Provider value={{ ...state, dispatch }}>
            { children }
        </APIContext.Provider>
    )
}
