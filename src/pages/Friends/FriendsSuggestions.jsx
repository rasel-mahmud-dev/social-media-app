import React, {useEffect, useMemo} from 'react';
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import staticImage from "src/utils/staticImage.js";
import Button from "components/Shared/Button/Button.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFetchPeoplesQuery} from "src/store/features/peoplesApi.js";


const FriendsSuggestions = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // const {data: peoplesData} = useFetchFriendsQuery({pageNumber: 1})

    const {data: peoplesData} = useFetchPeoplesQuery({pageNumber: 1})


    // const filterPendingFriends = useMemo(() => {
    //     return friendsData?.friends?.filter(friend => friend.status === "pending")
    // }, [friendsData]);

    const openSidebar = "";


    console.log(peoplesData)

    return (
        <div>
            <Sidebar
                className="white left-sidebar group-sidebar"
                isOpen={false}
                onClose={() => dispatch(openSidebarAction(""))}>

                <div className="flex items-center gap-x-4 border-b border-dark-600 pb-4 mb-3">
                    <div className="rounded_circle " onClick={() => navigate("/friends")}>
                        <i className="icon_arrow-left png_filter_white"></i>
                    </div>
                    <div>
                        <h4 className="color_p text-sm">Peoples</h4>
                        <h2 className="font-semibold text-2xl color_h1">Peoples Suggestion</h2>
                    </div>
                </div>

                <div>
                    {peoplesData?.peoples?.map(people => (
                        <div key={people._id} className="relative !p-0  !m-0 items-start list-item">

                            <div className="mt-4">
                                <Avatar className="!w-16 !h-16" imgClass="!w-16 !h-16"
                                        src={staticImage(people.avatar)}/>
                            </div>


                            <div className="p-3">
                                <h2 className="color_h2 font-semibold text-base">{people.fullName}</h2>
                                <p className="color_p font-normal text-xs">28K mutual friends</p>
                                <div className="flex gap-x-2 mt-2">
                                    <Button className="btn btn-primary w-full relative z-20">Add</Button>
                                    <Button className="btn btn-primary2 w-full relative z-20">Remove</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </Sidebar>
            <div className="group-content  ">
                <div className="w-full flex justify-center items-center h-screen">
                    <div className="block mx-auto">
                        <Avatar className="mx-auto rounded-none w-28 h-28" imgClass="w-28 h-28 rounded-none"
                                src="/icons/null_states_people_dark_mode.svg"/>
                        <h4 className="color_h1 text-lg font-semibold">Select people's names to preview their
                            profile.</h4>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default FriendsSuggestions;