import React, {useContext, useEffect} from 'react';
import {GiGears} from "react-icons/gi";
import Search from "components/Shared/Input/Search.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "components/Shared/Button/Button.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import {GroupLayoutContext} from "src/store/GroupLayoutContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchMyGroupsAction} from "src/store/actions/groupAction.js";
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
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


    const {openSidebar} = useSelector(state => state.appState)
    const {auth, groups} = useSelector(state => state.authState)
    const {peoples} = useSelector(state => state.feedState)


    function handleCreateGroup() {
        const payload = new FormData()
        payload.append("name", state.name)
        payload.append("description", state?.description)
        if (state.groupCoverPhoto && state.groupCoverPhoto.blob) {
            payload.append("coverPhoto", state.groupCoverPhoto.blob, "group-cover")
        }
        if (state.members && state.members.length > 0) {
            payload.append("members", JSON.stringify(state.members.map(m => m._id)))
        }
        dispatch(createGroupAction(payload))
    }

    async function handleChooseGroupCoverPhoto() {
        let file = await chooseImage()
        if (!file || !file?.base64) return;
        let newFile = await resizeImageByMaxWidth(file.base64, 920)
        setState({
            groupCoverPhoto: newFile
        })
    }

    function handleFetchPeople() {
        dispatch(fetchPeoplesAction())
    }


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