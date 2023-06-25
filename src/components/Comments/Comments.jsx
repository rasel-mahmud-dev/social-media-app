import React, {useState} from 'react';
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import {BsFillTrash2Fill} from "react-icons/bs";


const Comments = ({comments = [], handleDeleteComment}) => {

    const [viewStep, setViewStep] = useState(1)

    function len(viewStep) {
        if (viewStep === 1) return 100
        if (viewStep === 2) return 500
        if (viewStep === 3) return 800
        if (viewStep === 4) return 1100
        if (viewStep === 5) return undefined
    }

    function handleShowMore() {
        setViewStep(prevState => {
            if (prevState !== 5) {
                prevState++
                return prevState
            } else {
                return 1
            }
        })
    }

    return (
        <div>
            {comments.map(comment => (
                <div key={comment._id} className="mb-4">
                    <div className="flex items-center gap-x-2 mt-2">
                        <Avatar imgClass="text-xs !w-6 !h-6" className="!w-6 !h-6" username="ER SDF"
                                src={comment?.author?.avatar}/>
                        <div>
                            <p className="text-sm color_h2">{comment?.author?.fullName}</p>
                            <p className="text-xs color_mute">{new Date(comment?.createdAt).toDateString()}</p>
                        </div>
                    </div>

                    <div className="ml-0 mt-2">
                        <p className="color_p text-sm whitespace-pre-line">{comment?.comment?.substring(0, len(viewStep))}</p>

                        {comment?.comment?.length > 100 ? <span className="text-accent text-xs cursor-pointer"
                                                              onClick={handleShowMore}>{viewStep === 5 ? "show less" : "read more"}</span> : ""}

                        <div className="flex items-center gap-x-2 mt-2">
                            {/*<li className="list-none ">*/}
                            {/*    <img src="/icons/like.svg" className="w-4" alt=""/>*/}
                            {/*</li>*/}
                            {/*<li onClick={() => handleDeleteComment(comment._id)} className="list-none">*/}
                            {/*    <BsFillTrash2Fill className="color_p text-sm"/>*/}
                            {/*</li>*/}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;