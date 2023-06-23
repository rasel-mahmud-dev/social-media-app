import React, {createContext, useEffect, useReducer, useRef, useState} from 'react';
import "./toast.scss"


const Toast = () => {
    const timeOutRef = useRef()

    let [state, setState] = useReducer(function (prev, action) {
        return {
            ...prev,
            ...action
        }
    }, {
        message: "",
        isOpen: false
    })

    useEffect(() => {
        document.addEventListener("start", handleShowToast)
        return () => {
            document.removeEventListener("start", handleShowToast)
        }
    }, []);

    function handleShowToast(e) {
        let payload = e.detail

        const {options, ...s} = payload


        clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setState(s)
        }, options?.delay ?? 0)

    }

    return (
        <div className={`toast ${state.isOpen ? "" : "toast--close"}`}>
            {state.message}
        </div>
    );
};


Toast.success = function (value, options = {}) {
    // if (!dispatch) console.warn("You need to use Toast component in root application")
    const event = new CustomEvent('start', {
        detail: {
            type: "success",
            isOpen: true,
            message: value,
            options,
        }
    });

    document.dispatchEvent(event);
}


Toast.error = function (value) {
    // if (!dispatch) console.warn("You need to use Toast component in root application")
    const event = new CustomEvent('start', {
        detail: {
            type: "error",
            isOpen: true,
            message: value
        }
    });
    document.dispatchEvent(event);
}


export default Toast;