import { createContext, useReducer } from "react"

const today = new Date()
let tomorrow =  new Date()
tomorrow.setDate(today.getDate() + 1)


const INITIAL_STATE = {
    destination: "Paris",
    from: "Madrid",
    category: null,
    dates: [
        {    startDate: today,
            endDate: tomorrow,
            key: "selection",}
    ],
    options: {
        adults: 1,
        children: 0,
        rooms: 1
    }
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_DESTINATION":
            return {...state, destination: action.payload}
        case "CHANGE_FROM":
            return {...state, from: action.payload}
        case "CHANGE_DATES":
            return {...state, dates: action.payload }
        case "CHANGE_ADULTS":
            return {...state, options: {...state.options, adults: action.payload}}
        case "CHANGE_CHILDREN":
                return {...state, options: {...state.options, children: action.payload}}
        case "CHANGE_ROOMS":
                return {...state, options: {...state.options, rooms: action.payload}}
        case "CHANGE_CATEGORY":
            return {...state, category: action.payload}
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state;
    }
}

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

     return (
         <SearchContext.Provider value={{...state, dispatch}}>
             {children}
         </SearchContext.Provider>
     )
}