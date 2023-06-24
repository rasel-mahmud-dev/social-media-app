import React, {createContext, useEffect, useReducer, useRef, useState} from 'react';
import "./toast.scss"
import {array} from "prop-types";


const Toast = () => {
    const timeOutRef = useRef()

    const stateRef = useRef([])

    let [state, setState] = useReducer(function (prev, action) {
        return {
            ...prev,
            ...action
        }
    }, {
        message: "",
        isOpen: false
    })

    const [queue, setQueue] = useState([])

    useEffect(() => {
        document.addEventListener("start", handleShowToast)
        return () => {
            document.removeEventListener("start", handleShowToast)
        }
    }, []);


    function handleShowToast(e) {

        let payload = e.detail


        let queue = []
        if (stateRef.current && Array.isArray(stateRef.current)) {
            queue = [
                ...stateRef.current,
                payload
            ]
        } else {
            queue = [
                payload
            ]
        }

        stateRef.current = [...queue]


        // const {options, ...s} = payload
        //
        //
        // clearTimeout(timeOutRef.current)
        // timeOutRef.current = setTimeout(() => {
        //     setState(s)
        // }, options?.delay ?? 0)
    }

    useEffect(() => {
        // if (queue && queue.length > 0) {
        //     setQueue(prevState => {
        //         openToast(prevState[0], prevState, function (p) {
        //             console.log(p)
        //             // p.splice(1, 1)
        //             return [...p]
        //         })
        //         // return [...prevState]
        //     })
        // }

        console.log(stateRef)

    }, [stateRef]);

    function openToast(payload, p, cb) {
        clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setState(payload)
            cb(p)
        }, payload.options?.delay ?? 0)

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