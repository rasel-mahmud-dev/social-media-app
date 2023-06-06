import {Outlet} from "react-router-dom";
import Header from "../compoenents/Header/Header.jsx";
import {fetchCurrentAuthAction} from "src/store/actions/authAction.js";
import {useDispatch} from "react-redux";
import {useEffect} from "react";


const Main = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchCurrentAuthAction())
    }, []);


    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default Main;