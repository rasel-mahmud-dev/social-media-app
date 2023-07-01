import React, {useContext, useEffect} from 'react';


import {Outlet} from "react-router-dom";

const GroupLayout = ({children}) => {

    // const [state, setState] = useContext(GroupLayoutContext)
    // const dispatch = useDispatch()
    // const location = useLocation()

    // useEffect(() => {
    //     dispatch(fetchMyGroupsAction())
    // }, [])

    // useEffect(() => {
    //     if (location.pathname === "/groups/create") {
    //         setState({
    //             createNewGroup: true
    //         })
    //
    //     } else if (location.pathname === "/groups") {
    //         setState({
    //             createNewGroup: false
    //         })
    //     }
    // }, [location.pathname])

    // const {openSidebar} = useSelector(state => state.appState)

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default GroupLayout