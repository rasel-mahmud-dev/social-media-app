import React, {useContext, useEffect} from 'react';

import "./create-group.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {TiTimes} from "react-icons/ti";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import InputGroup from "components/Shared/Input/InputGroup.jsx";
import Button from "components/Shared/Button/Button.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchMyGroupsAction} from "src/store/actions/groupAction.js";
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";

const CreateGroup = () => {

    const [state, setState] = useCustomReducer({
        name: "",
        description: "",
        groupCoverPhoto: null,
        accent: "",
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
        payload.append("accent", state?.accent)
        if (state.groupCoverPhoto && state.groupCoverPhoto.blob) {
            payload.append("coverPhoto", state.groupCoverPhoto.blob, "group-cover")
        }
        if (state.members && state.members.length > 0) {
            payload.append("members", JSON.stringify(state.members.map(m => m._id)))
        }
        dispatch(createGroupAction(payload)).unwrap().then(()=>{
            navigate("/groups")
        })
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
        <div className="flex justify-between">
            <Sidebar
                className="white left-sidebar group-sidebar"
                isOpen={openSidebar === "left-sidebar"}
                onClose={() => dispatch(openSidebarAction(""))}>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium color_h2">Create Group</h2>
                        <Link to="/groups">
                            <div className="rounded_circle color_p">
                                <TiTimes/>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-x-1 my-1 py-2  px-2  color_h1">
                        <Avatar className="!w-8 !h-8" imgClass="!w-8 !h-8 text-xs" src={auth.avatar}
                                username={auth.fullName}/>
                        <div className="ml-2">
                            <span className="font-medium text-base ">{auth.fullName}</span>
                            <h5 className="text-xs color_p">Admin</h5>
                        </div>
                    </div>

                    {/***** group inputs *****/}
                    <div>
                        <InputGroup
                            className="mt-2"
                            inputClass="w-full"
                            name="group-name"
                            onChange={(e) => setState({name: e.target.value})}
                            placeholder="Group Name"
                        />


                        <InputGroup
                            as="textarea"
                            className="mt-2"
                            inputClass="w-full"
                            onChange={(e) => setState({description: e.target.value})}
                            placeholder="Group Description"
                        />

                        <InputGroup
                            label="Choose acent color"
                            labelClass="color_p text-sm"
                            type="color"
                            className="mt-2"
                            inputClass="w-full"
                            onChange={(e) => setState({accent: e.target.value})}
                            placeholder="Group Description"
                        />


                        <InputGroup
                            className="mt-2"
                            as="select"
                            inputClass="w-full"
                            onChange={(e) => setState({isPublic: e.target.value === "1"})}
                            // label="Group Name"
                            defaultValue="1"
                            renderOption={() => (
                                <>
                                    <option value="1">Group Privacy</option>
                                    <option value="0">Private</option>
                                    <option value="1">Public</option>
                                </>
                            )}
                        />

                        <InputGroup
                            as="select"
                            className="mt-2"
                            inputClass="w-full"
                            onChange={(e) => setState({members: e.target.value})}
                            placeholder="Add People"
                            onClick={handleFetchPeople}
                            multiple={true}
                            keyField={"_id"}
                            nameField={"fullName"}
                            options={peoples}
                            renderSelectedItem={(item, keyField, nameField, removeItem) => (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-2 text-sm color_p">
                                        <Avatar className="!w-8 !h-8" username={item[nameField]}
                                                imgClass="!w-8 !h-8" src={item["avatar"]}/>
                                        <span>{item[nameField]}</span>
                                    </div>
                                    <span className="clear-icon" onClick={() => removeItem(item[keyField])}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                                         viewBox="0 0 352 512"><path
                                                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                                </span>
                                </div>
                            )}
                        />

                        <Button onClick={handleChooseGroupCoverPhoto} className="mt-2 btn-dark2 w-full">Choose
                            Group Cover</Button>


                    </div>


                    <div className="mt-10 w-full">
                        <Button onClick={handleCreateGroup} className="btn-primary w-full ">Create</Button>
                    </div>

                </div>

            </Sidebar>


            <div className="group-content w-full">
                <div className="card">
                    <h2 className="color_h1">Desktop Preview</h2>

                    <div className="group-image"
                         style={{backgroundImage: `url(${state.groupCoverPhoto ? state.groupCoverPhoto?.base64 : ""})`}}>
                    </div>

                    <div className="mt-6">
                        <h1 className={`text-2xl font-medium ${state.name ? "color_h1" : "color_mute"}`}>{state.name ? state.name : "Group Name"}</h1>
                        <p className="mt-2 text-sm color_h3">Group Privacy 1
                            member {state.isPublic ? " Public" : " Private"}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateGroup;