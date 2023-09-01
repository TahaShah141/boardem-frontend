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
            return {...state, messagesSent: state.messagesSent.map(board => {
                if (board._id === action.payload.board_id) {
                    return {...board, messages: board.messages.filter(message => message._id !== action.payload._id)}
                } else return board
            })}
        case 'CLEAR_MESSAGES':
            return {...state, messages: []}
        case 'EDIT_MESSAGE':
            return {...state, messagesSent: state.messagesSent.map(board => {
                if (board._id === action.payload.board_id) {
                    return {...board, messages: board.messages.map(message => {
                        if (message._id === action.payload._id) return action.payload
                        else return message
                    })}
                } else return board
            })}
        case 'CLEAR_VIEW':
            return {...state, messages: [], board: null}
        case 'BOARD':
            return {...state, board: action.payload}
        case 'SET_OWNED_BOARDS':
            return {...state, boardsOwned: action.payload}
            case 'NEW_BOARD':
                return {...state, boardsOwned: [...state.boardsOwned, action.payload]}
                case 'EDIT_OWNED_BOARD':
            return {...state, boardsOwned: state.boardsOwned.map(board => {
                if (board._id === action.payload._id) {
                    const newBoard = {_id: action.payload._id, name: action.payload.name, public: action.payload.public}
                    return {...board, ...newBoard}
                } else return board
            })}
        case 'DELETE_OWNED_BOARD':
            return {...state, boardsOwned: state.boardsOwned.filter(board => board._id !== action.payload._id)}
        case 'EDIT_BOARDS_USER':
            return {...state, boardsOwned: state.boardsOwned.map(board => {
                if (board._id === action.payload.boardID) {
                    const newBoard = {...board, users: board.users.map(user => {
                        if (user._id === action.payload.userID) {
                            return {...user, isAuthor: action.payload.isAuthor}
                        } else return user
                    })}
                    return newBoard
                } else return board
            })}
        case 'KICK_BOARDS_USER':
            return {...state, boardsOwned: state.boardsOwned.map(board => {
                if (board._id === action.payload.boardID) {
                    const newBoard = {...board, users: board.users.filter(user => user._id !== action.payload.userID)}
                    return newBoard
                } else return board
            })}
        case 'CLEAR_BOARDS_OWNED':
            return {...state, boardsOwned: []}
        case 'CLEAR_BOARDS_JOINED':
            return {...state, boardsJoined: []}
        case 'CLEAR_MESSAGES_SENT':
            return {...state, messagesSent: []}    
        case 'SET_JOINED_BOARDS':
            return {...state, boardsJoined: action.payload}
            case 'JOIN_BOARD':
                return {...state, boardsJoined: [...state.boardsJoined, action.payload]}
        case 'SET_MESSAGES_SENT':
            return {...state, messagesSent: action.payload}
        default:
            return state
    }
}

export const APIContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, {
        messages: [],
        board: null,
        boardsOwned: [],
        boardsJoined: [],
        messagesSent: []
    })
    
    return (
        <APIContext.Provider value={{ ...state, dispatch }}>
            { children }
        </APIContext.Provider>
    )
}
