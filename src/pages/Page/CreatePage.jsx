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
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";


const pageCategories = [
    "Software development",
    "Nature",
    "Company",
    "Music",
    "Fun",
    "Blogging",
    "Business",
    "Newspaper",
]

const CreatePage = () => {

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
        if (location.pathname === "/pages/create") {
            setState({
                createNewGroup: true
            })

        } else if (location.pathname === "/pages") {
            setState({
                createNewGroup: false
            })
        }


    }, [location.pathname])


    const {openSidebar} = useSelector(state => state.appState)
    const {auth} = useSelector(state => state.authState)

    function handleCreatePage() {
        const payload = new FormData()
        payload.append("name", state.name)
        payload.append("bio", state?.description)
        if (state.groupCoverPhoto && state.groupCoverPhoto.blob) {
            payload.append("coverPhoto", state.groupCoverPhoto.blob, "group-cover")
        }

        apis.post("/page/create", payload).then(({status, data}) => {
            if (status === 201) {
                navigate("/pages")
            }
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


    return (
        <div className="flex justify-between">
            <Sidebar
                className="white left-sidebar group-sidebar"
                isOpen={openSidebar === "left-sidebar"}
                onClose={() => dispatch(openSidebarAction(""))}>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium color_h2">Create Page</h2>
                        <Link to="/pages">
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
                            name="page-name"
                            onChange={(e) => setState({name: e.target.value})}
                            placeholder="Page Name"
                        />


                        <InputGroup
                            className="mt-2"
                            as="select"
                            inputClass="w-full"
                            onChange={(e) => setState({category: e.target.value})}
                            // label="Group Name"
                            defaultValue="1"
                            renderOption={() => (
                                <>
                                    <option value="">Page category</option>
                                    {pageCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </>
                            )}
                        />


                        <InputGroup
                            as="textarea"
                            className="mt-2"
                            inputClass="w-full"
                            onChange={(e) => setState({bio: e.target.value})}
                            placeholder="Bio"
                        />


                        <Button onClick={handleChooseGroupCoverPhoto} className="btn-dark2">Choose Pages Cover</Button>


                    </div>


                    <div className="left-0   w-full mt-10">
                        <Button onClick={handleCreatePage} className="btn-primary w-full ">Create Page</Button>
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
                        <h1 className={`text-2xl text-center font-medium ${state.name ? "color_h1" : "color_mute"}`}>{state.name ? state.name : "Page Name"}</h1>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreatePage;