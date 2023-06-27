import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    acceptJoinGroupInvitationAction,
    addGroupInvitePeopleAction,
    fetchGroupDetailAction
} from "src/store/actions/groupAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import Button from "components/Shared/Button/Button.jsx";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {BiChevronDown, BiChevronUp, BiHeart, BiHome, BiLock, BiPlus} from "react-icons/bi";


import "./group-detail.scss"
import Checkbox from "components/Shared/Input/Checkbox.jsx";
import Discussion from "components/Groups/Discussion.jsx";
import AboutGroup from "components/Groups/AboutGroup.jsx";
import Rooms from "components/Groups/Rooms.jsx";
import Members from "components/Groups/Members.jsx";
import {useQueryObjectQuery} from "src/store/features/groupMembersApi.js";

import {openSidebarAction} from "src/store/slices/appSlice.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import {CgLock} from "react-icons/cg";

import {VscHome, VscTriangleDown} from "react-icons/vsc";

import {IoEllipsisHorizontal} from "react-icons/io5";
import addAlpha from "src/utils/addAlpha.js";
import {TiHome} from "react-icons/ti";
import Collapse from "components/Shared/Collapse/Collapse.jsx";
import {GoGear} from "react-icons/go";
import {BsClock} from "react-icons/bs";


const categories = [
    {
        label: "Admin tools",
        children: [
            {
                label: "Community chats",
                subLabel: "4 chat suggestions for your group",
                icon: <BiHeart className="text-2xl color_p"/>
            }, {
                label: "Pending approvals",
                subLabel: "4 new today",
                icon: <BsClock className="text-2xl color_p"/>
            }
        ]
    },
    {
        label: "Settings",
        children: [
            {
                label: "Group Settings",
                subLabel: "Manage discussions, permissions and roles",
                icon: <GoGear className="text-2xl color_p"/>,
            },
            {
                label: "Add features",
                subLabel: "Choose post formats, badges and other features",
                icon: <GoGear className="text-2xl color_p"/>,
            },
        ]
    },
]

const GroupDetail = () => {

    const {groupSlug} = useParams()
    const dispatch = useDispatch()

    const [state, setState] = useCustomReducer({
        group: null,
        isYouMember: false,
        role: "user",
        isOpenInvitationUserModal: false,
        invitationUsers: [],
        activeTab: "Discussion"
    })


    const navs = [
        {label: "Discussion"},
        {label: "About", notForMember: true},
        {label: "Rooms"},
        {label: "Members"},
        {label: "Events"},
        {label: "Media"},
        {label: "Files"},
    ]

    const {peoples} = useSelector(state => state.feedState)
    const {auth} = useSelector(state => state.authState)
    const {openSidebar} = useSelector(state => state.appState)

    useEffect(() => {
        dispatch(fetchGroupDetailAction(groupSlug)).unwrap().then(data => {
            if (data) {
                setState({
                    group: data.group,
                    role: data.role,
                    isYouMember: data.isYouMember,
                    activeTab: data.isYouMember ? "Discussion" : "About"
                })

                if (data.group?.meta) {
                    const root = document.documentElement
                    root.style.setProperty("--accent", data.group?.meta.accentColor)
                }

            }
        })
    }, [groupSlug])

    useEffect(() => {
        if (state.isOpenInvitationUserModal) {
            dispatch(fetchPeoplesAction())
        }
    }, [state.isOpenInvitationUserModal])


    let {data: members} = useQueryObjectQuery({
        groupId: state?.group?._id,
        pageNumber: 1
    })

    console.log(members)


    function handleSendInvitation() {

        dispatch(addGroupInvitePeopleAction({
            groupId: state.group._id,
            peoples: state.invitationUsers.map(i => i._id),
        })).unwrap().then(() => {
            setState({
                invitationUsers: [],
                isOpenInvitationUserModal: false
            })
        })


        // toast.success("Loading...", {
        //     delay: 10
        // })
        // toast.success("asdfasdf", {delay: 100})
    }

    function onSelectPeople(people) {
        setState(prev => {
            let updatedState = [...prev.invitationUsers]
            let index = updatedState.findIndex(i => i._id === people._id)
            if (index === -1) {
                updatedState.push(people)
            } else {
                updatedState.splice(index, 1)
            }
            prev.invitationUsers = updatedState
            return prev
        })
    }


    function handleSwitchTab(tabName) {
        setState({
            activeTab: tabName
        })
    }


    function handleAcceptInvitationAndJoinGroup(group) {

        if (!group) return;

        dispatch(acceptJoinGroupInvitationAction({
            groupId: group._id
        }))
    }

    function filterNavItem(navs) {
        if (state.isYouMember) {
            return navs
        } else {
            return navs.filter((_, index) => index === 1 || index === 3)
        }
    }

    return (
        <div>

            {/*<button onClick={()=>handleSendInvitation()}>Open</button>*/}

            {state.isOpenInvitationUserModal && (
                <ModalWithBackdrop
                    isOpen={true}
                    modalClass="w-52 card"
                    backdropClass="bg-dark-900/60"
                    onClose={() => setState({isOpenInvitationUserModal: false})}>

                    <div>
                        <h2 className="color_h2 font-medium mb-2">Select User for Invitation </h2>
                        {peoples.map((people) => (
                            <div key={people._id}
                                 className="flex items-center justify-between color_h2 font-normal py-1">
                                <label htmlFor={people._id} className="flex items-center gap-x-2">
                                    <Avatar className="!w-8 !h-8 font-normal text-sm "
                                            imgClass="font-normal text-sm  !w-8 !h-8 text-xs" src={people.avatar}
                                            username={people.fullName}/>
                                    <span className="font-normal text-sm ">{people.fullName}</span>

                                </label>
                                <Checkbox
                                    className="checkbox checkbox-accent"
                                    onChange={() => onSelectPeople(people)} id={people._id}
                                    name="user"
                                />
                            </div>
                        ))}

                        <Button onClick={handleSendInvitation} className="btn-accent block mt-4 ml-auto">Send
                            Invitation</Button>
                    </div>

                </ModalWithBackdrop>
            )}


            <div className="flex justify-between">
                <Sidebar
                    className="white left-sidebar group-sidebar"
                    isOpen={openSidebar === "left-sidebar"}
                    onClose={() => dispatch(openSidebarAction(""))}>

                    {state.group && (
                        <div>
                            <Link to={`/groups/${state.group.slug}`}>
                                <div className="list-item mb-2">
                                    <img className="!w-16 aspect-square object-cover " src={state.group.coverPhoto}/>
                                    <div className="ml-2">
                                        <h1>{state.group.name}</h1>
                                        <div className="text-sm font-normal flex gap-x-2 mt-1">
                                        <span
                                            className="flex gap-x-1 items-center"> <CgLock/> {state.group.isPublic ? "Public" : "Private"}</span>
                                            <span>{members?.totalMembers} members</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="w-full flex items-center">
                                <Button
                                    className="btn-dark2 w-full flex items-center justify-center gap-x-1">
                                    <i className="icon_group2_16 png_filter_white"></i>
                                    <span>Joined</span>
                                    <VscTriangleDown/>
                                </Button>

                                <Button
                                    className="btn-dark2 py-3 ml-2">
                                    <IoEllipsisHorizontal/>
                                </Button>
                            </div>

                            {/* home navigate button */}
                            <Link to={`/groups/${state.group.slug}`}>
                                <Button
                                    className="w-full mt-3 flex items-center gap-x-1 text-accent"
                                    style={{backgroundColor: addAlpha(state.group.meta.accentColor, 0.2)}}>
                                    <TiHome className="text-xl"/>
                                    <span className="font-medium">Community Home</span>
                                </Button>
                            </Link>


                            {/* admin group options */}


                            {state.isYouMember && state.role === "admin" && (
                                <Collapse initialExpand={[1]} className="mt-4">
                                    {categories.map((item) => (
                                        <Collapse.Item
                                            key={item.label}
                                            className="list-item text-sm py-3 px-2 mt-2"
                                            label={item.label}
                                            prefixIcon={item.prefixIcon}
                                            icon={(isActive) => !isActive ? <BiChevronDown/> : <BiChevronUp/>}
                                        >
                                            {item.children && (
                                                <div className="text-sm ">
                                                    {
                                                        item.children.map(item2 => (
                                                            item2.to
                                                                ? (
                                                                    <Link to={`${item2.to}`}>
                                                                        <h5 className="collapse-item-h5 mx-2 rounded-md text-dark-200">
                                                                            {item2.label}
                                                                            {item2.subLabel}
                                                                        </h5>
                                                                    </Link>

                                                                )
                                                                : (
                                                                    <h5 className="flex items-center gap-x-4 py-2  rounded-md color_h1">
                                                                        {item2.icon && item2.icon}
                                                                        <div className="text-sm">
                                                                            {item2.label}
                                                                            <div className="color_p text-xs">
                                                                                {item2.subLabel}
                                                                            </div>
                                                                        </div>
                                                                    </h5>
                                                                )
                                                        ))
                                                    }
                                                </div>
                                            )}
                                        </Collapse.Item>
                                    ))}
                                </Collapse>
                            )}

                        </div>
                    )}

                </Sidebar>


                <div className="group-content">
                    <div>
                        {state.group && (
                            <>

                                <div className="bg-dark-650">
                                    <div className="group-container group-detail py-4 px-0 xl:px-4">

                                        <div className="group-banner ">
                                            <div className="cover-photo-root">
                                                <img className="cover-photo" src={staticImage(state.group.coverPhoto)}
                                                     alt=""/>
                                            </div>
                                            <div className="group-name p-3">
                                                <h2 className="text-sm color_h1 font-semibold">Group
                                                    by {state.group.name}</h2>
                                            </div>
                                        </div>

                                        <div className="group-container-content">

                                            <div
                                                className=" mt-4 border-b border-dark-500 pb-8">
                                                <h2 className="text-2xl  color_h1 mt-3 font-semibold">{state.group.name}</h2>


                                                <div className="flex items-center justify-between">

                                                    {/***  members ***/}

                                                    {members && <div className=" flex items-center ml-3 mt-2">
                                                        {members && members.members?.map(member => (
                                                            <div className="-ml-3">
                                                                <Avatar
                                                                    className="!w-9 !h-9"
                                                                    imgClass="!w-9 !h-9 border-2 border-dark-650"
                                                                    username={member?.user?.fullName}
                                                                    src={member?.user?.avatar}/>
                                                            </div>
                                                        ))}
                                                        <div className="flex items-center">

                                                            <BiPlus className="text-sm color_h1"/>

                                                            <span
                                                                className="text-accent font-semibold text-sm">{(members.totalMembers - members?.members?.length).toString()}</span>


                                                        </div>
                                                    </div>
                                                    }

                                                    <div>

                                                        {state.isYouMember ? <Button
                                                                onClick={() => setState({isOpenInvitationUserModal: true})}
                                                                className="btn-accent">
                                                                Invite
                                                            </Button>
                                                            : (
                                                                <div>
                                                                    <Button
                                                                        onClick={() => handleAcceptInvitationAndJoinGroup(state.group)}
                                                                        className="btn-dark2">
                                                                        Accept Invitation and Join Group
                                                                    </Button>

                                                                    <Button
                                                                        onClick={() => setState({isOpenInvitationUserModal: true})}
                                                                        className="btn-dark2 py-3 ml-2">
                                                                        <BiChevronDown/>
                                                                    </Button>
                                                                </div>

                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="group-container">
                                        <div className="group-container-content">
                                            <div className="flex items-center color_p text-sm">
                                                {filterNavItem(navs).map((navItem, index) => (
                                                    <div key={index} onClick={() => handleSwitchTab(navItem.label)}
                                                         className={`cursor-pointer px-4 pb-2 ${state.activeTab === navItem.label ? "border-accent text-accent border-b-2" : ""}`}>
                                                        {navItem.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="group-container mt-5">
                                    <div className="group-container-content">

                                        {
                                            state.activeTab === "Discussion"
                                                ? <Discussion group={state.group}/>
                                                : state.activeTab === "About"
                                                    ? <AboutGroup group={state.group}/>
                                                    : state.activeTab === "Rooms"
                                                        ? <Rooms group={state.group}/>
                                                        : state.activeTab === "Members"
                                                            ? <Members group={state.group}/>
                                                            : ""
                                        }

                                    </div>
                                </div>

                            </>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default GroupDetail;