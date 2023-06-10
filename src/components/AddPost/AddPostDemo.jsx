import React, {useState} from 'react';
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {useSelector} from "react-redux";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import AddPost from "components/AddPost/AddPost.jsx";

const AddPostDemo = ({className = ""}) => {

    const {auth,} = useSelector(state => state.authState)
    const [isOpenAddPostModal, setOpenAddPostModal] = useState(false)

    function handleOpenAddPostModal(isOpen) {
        setOpenAddPostModal(isOpen)
    }

    return (<>
        <ModalWithBackdrop root="modal-root" modalClass="add-feed-modal" isOpen={isOpenAddPostModal}
                           onClose={() => setOpenAddPostModal(false)}>
            <AddPost onClose={() => setOpenAddPostModal(false)}/>
        </ModalWithBackdrop>


        <div className={`card ${className}`}>
            <div>
                <div className="flex items-center gap-x-2 border-b border-neutral-600/10 dark:border-dark-500 mb-3 pb-3">
                    <Avatar className="!h-9" imgClass="!w-9 !h-9" src={auth?.avatar}
                            username={auth?.fullName}></Avatar>
                    <h2 className="py-2 dark:bg-dark-600 color_p bg-neutral-100 rounded-full px-3 w-full text-sm text-neutral-600"
                        onClick={() => handleOpenAddPostModal(true)}>What on your
                        mind, {auth?.firstName}?</h2>
                </div>


                <div className="flex items-center justify-around text-sm font-medium color_h3">
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 video-icon"></i>
                        <span>Videos</span>
                    </li>
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 photo-icon"></i>
                        <span>Photos</span>
                    </li>
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 emoji-icon"></i>
                        <span>Feelings</span>
                    </li>
                </div>
            </div>
        </div>
    </>);
};

export default AddPostDemo;