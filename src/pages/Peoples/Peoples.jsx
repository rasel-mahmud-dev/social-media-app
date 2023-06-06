import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";

const Peoples = () => {
const dispatch = useDispatch()

    const { peoples } = useSelector(state=>state.feedState)

    useEffect(()=>{
        dispatch(fetchPeoplesAction())
    }, [])

    console.log(peoples)

    return (
        <div>

        </div>
    );
};

export default Peoples;