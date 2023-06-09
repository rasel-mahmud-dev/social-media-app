import {useReducer} from "react";

const useCustomReducer = (init) => useReducer((prevState, action) => {
    if (typeof action === "function") {
        return {
            ...prevState,
            ...action(prevState)
        }
    } else {
        return {
            ...prevState,
            ...action
        }
    }
}, init)

export default useCustomReducer
