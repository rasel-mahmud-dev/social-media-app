import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addGroupInvitePeopleAction, fetchGroupDetailAction} from "src/store/actions/groupAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";
import Button from "components/Shared/Button/Button.jsx";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import toast from "components/Shared/Toast/Toast.jsx";


const GroupDetail = () => {

    const {groupId} = useParams()
    const dispatch = useDispatch()

    const [state, setState] = useCustomReducer({
        group: null,
        isOpenInvitationUserModal: false,
        invitationUsers: []
    })

    const {peoples} = useSelector(state => state.feedState)


    useEffect(() => {
        dispatch(fetchGroupDetailAction(groupId)).unwrap().then(data => {
            if (data) {
                setState({
                    group: data
                })
            }
        })

    }, [groupId])

    useEffect(() => {
        if (state.isOpenInvitationUserModal) {
            dispatch(fetchPeoplesAction())
        }
    }, [state.isOpenInvitationUserModal])


    function handleSendInvitation() {
        console.log(state.invitationUsers)

        dispatch(addGroupInvitePeopleAction({
            groupId,
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
                                <input onChange={() => onSelectPeople(people)} id={people._id} type="checkbox"
                                       name="user"/>
                            </div>
                        ))}

                        <Button onClick={handleSendInvitation} className="btn-primary block mt-4 ml-auto">Send
                            Invitation</Button>
                    </div>

                </ModalWithBackdrop>
            )}

            {state.group && (
                <div className="card">
                    <img src={staticImage(state.group.coverPhoto)} alt=""/>

                    <h2 className="text-2xl  color_h1 mt-3 font-semibold">{state.group.name}</h2>

                    <div className="flex items-center justify-between  mt-2">
                        <div>
                            <AvatarGroup data={state?.group?.members ? state?.group?.members.map(m => ({
                                avatar: m?.user?.avatar,
                                fullName: m?.user?.fullName
                            })) : []
                            }/>
                        </div>

                        <div>
                            <Button
                                onClick={() => setState({isOpenInvitationUserModal: true})}
                                className="btn-primary">
                                Invite
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GroupDetail;