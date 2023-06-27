import React, {useContext, useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchMyGroupsAction} from "src/store/actions/groupAction.js";
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import WithGroupHomeSidebar from "pages/Group/WithGroupHomeSidebar.jsx";


const GroupHome = () => {

    const [state, setState] = useCustomReducer({
        name: "",
        description: "",
        groupCoverPhoto: null,
        createNewGroup: false,
        isPublic: true,
        members: []
    })


    const dispatch = useDispatch()
    const location = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchMyGroupsAction())
    }, [])

    useEffect(() => {
        if (location.pathname === "/groups/create") {
            setState({
                createNewGroup: true
            })

        } else if (location.pathname === "/groups") {
            setState({
                createNewGroup: false
            })
        }


    }, [location.pathname])



    return (

        <WithGroupHomeSidebar>
            <div className="group-content">
                <div className="card">
                    sdasd
                    <div className="card-meta">
                        <h4>My Groups</h4>
                    </div>

                    <div className="mt-6">
                        <p>This features will be implemented soon</p>


                        Groups you've joined
                        Recent activity

                    </div>

                </div>
            </div>

        </WithGroupHomeSidebar>
    )
};

export default GroupHome;