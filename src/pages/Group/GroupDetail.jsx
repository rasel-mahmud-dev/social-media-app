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


const GroupDetail = () => {

    const {groupSlug} = useParams()
    const dispatch = useDispatch()

    const [state, setState] = useCustomReducer({
        group: null,
        isOpenInvitationUserModal: false,
        invitationUsers: [],
        activeTab: "about"
    })

    const {peoples} = useSelector(state => state.feedState)
    const {auth} = useSelector(state => state.authState)


    useEffect(() => {
        dispatch(fetchGroupDetailAction(groupSlug)).unwrap().then(data => {
            if (data) {
                setState({
                    group: data
                })
            }
        })

    }, [groupSlug])

    useEffect(() => {
        if (state.isOpenInvitationUserModal) {
            dispatch(fetchPeoplesAction())
        }
    }, [state.isOpenInvitationUserModal])


    function handleSendInvitation() {
        console.log(state.invitationUsers)

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
                        <div className="group-container group-detail py-4">
                            <div className="group-banner">
                                <div className="cover-photo-root">
                                    <img className="cover-photo" src={staticImage(state.group.coverPhoto)} alt=""/>
                                </div>
                                <div className="group-name p-3">
                                    <h2 className="text-sm color_h1 font-semibold">Group by {state.group.name}</h2>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between  mt-4 mx-5 border-b border-dark-500  pb-8">
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
                                                    className="btn-primary">
                                                    Accept Invitation and Join Group
                                                </Button>

                                                <Button
                                                    onClick={() => setState({isOpenInvitationUserModal: true})}
                                                    className="btn-primary py-3 ml-2">
                                                    <BiChevronDown/>
                                                </Button>
                                            </div>

                                        )}


                                </div>
                            </div>
                        </div>

                        <div className="group-container">
                            <div className="flex items-center gap-x-4 color_p text-sm">
                                <div onClick={() => handleSwitchTab("about")}
                                     className={`cursor-pointer px-4 pb-2 ${state.activeTab === "about" ? "border-accent text-accent border-b-2" : ""}`}>About
                                </div>
                                <div onClick={() => handleSwitchTab("discussion")}
                                     className={`cursor-pointer px-4 pb-2 ${state.activeTab !== "about" ? "border-accent text-accent border-b-2" : ""}`}>Discussion
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="group-container mt-10">
                        <div className="group-container-content">

                            <div className="card">
                                <h4 className="card-border-b-title ">About This Group</h4>
                                <p className="whitespace-pre-line color_p text-sm">{state.group.description}</p>

                                <div className="color_p text-sm mt-4">

                                    <li className="">
                                        <h1 className="text-base font-medium color_h2">Private</h1>
                                        <p>
                                            Only members can see who's in the group and what they post.
                                        </p>
                                    </li>
                                    <li className="mt-3">
                                        <h1 className="text-base font-medium color_h2">Visible</h1>
                                        <p>
                                            Anyone can find this group.
                                        </p>
                                    </li>
                                    <li className="mt-3">
                                        <h1 className="text-base font-medium color_h2">History</h1>
                                        <p>Group created on {new Date(state.group.createdAt).toLocaleDateString()}
                                        </p>
                                    </li>
                                </div>
                            </div>


                            <div className="card mt-5">
                                <h4 className="card-border-b-title">Members {state.group.members.length}</h4>
                                <div className="color_p text-sm mt-4">

                                </div>
                            </div>

                            <div className="card mt-5">
                                <h4 className="card-border-b-title">Activity</h4>
                                <div className="color_p text-sm mt-4">
                                </div>
                            </div>

                        </div>
                    </div>

                </>
            )}

        </div>
    );
};

export default GroupDetail;