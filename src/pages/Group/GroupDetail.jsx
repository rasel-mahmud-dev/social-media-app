import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    acceptJoinGroupInvitationAction,
    addGroupInvitePeopleAction,
    fetchGroupDetailAction
} from "src/store/actions/groupAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";
import Button from "components/Shared/Button/Button.jsx";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {BiChevronDown} from "react-icons/bi";

import "./group-detail.scss"
import Checkbox from "components/Shared/Input/Checkbox.jsx";
import Discussion from "components/Groups/Discussion.jsx";
import AboutGroup from "components/Groups/AboutGroup.jsx";
import Rooms from "components/Groups/Rooms.jsx";
import Members from "components/Groups/Members.jsx";


const GroupDetail = () => {

    const {groupSlug} = useParams()
    const dispatch = useDispatch()

    const [state, setState] = useCustomReducer({
        group: null,
        isYouMember: false,
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


    useEffect(() => {
        dispatch(fetchGroupDetailAction(groupSlug)).unwrap().then(data => {
            if (data) {
                setState({
                    group: data.group,
                    isYouMember: data.isYouMember,
                    activeTab: data.isYouMember ? "Discussion" : "About"
                })

                if(data.group?.meta){
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


    function checkAsYouMember(authId, group) {
        if (group.ownerId === authId) {
            return true
        }
        if (group && group.members) {
            let index = group.members.findIndex(member => member.userId === group)
            return index !== -1
        }
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

            {state.group && (
                <>

                    <div className="bg-dark-650">
                        <div className="group-container group-detail py-4 px-0 xl:px-4">

                            <div className="group-banner ">
                                <div className="cover-photo-root">
                                    <img className="cover-photo" src={staticImage(state.group.coverPhoto)} alt=""/>
                                </div>
                                <div className="group-name p-3">
                                    <h2 className="text-sm color_h1 font-semibold">Group by {state.group.name}</h2>
                                </div>
                            </div>

                            <div className="group-container-content">

                                <div
                                    className="flex items-center justify-between mt-4 border-b border-dark-500 pb-8">
                                    <h2 className="text-2xl  color_h1 mt-3 font-semibold">{state.group.name}</h2>

                                    <div>

                                        {checkAsYouMember(auth._id, state.group) ? <Button
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
                                            ? <Rooms group={state.group} />
                                            : state.activeTab === "Members"
                                                ? <Members group={state.group} />
                                                : ""
                            }

                        </div>
                    </div>

                </>
            )}

        </div>
    );
};

export default GroupDetail;