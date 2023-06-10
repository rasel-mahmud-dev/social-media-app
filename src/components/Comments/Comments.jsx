import React from 'react';
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import {BsFillTrash2Fill} from "react-icons/bs";


const Comments = ({comments = [], handleDeleteComment}) => {


    return (
        <div>
            {comments.map(comment=>(
                <div key={comment._id} className="mb-4">
                    <div className="flex items-center gap-x-2 mt-2">
                        <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" username="ER SDF" src={comment?.author?.avatar}/>
                        <div>
                            <p className="text-sm" >{comment?.author?.fullName}</p>
                            <p className="text-xs text-neutral-400" >{new Date(comment?.createdAt).toDateString()}</p>
                        </div>
                    </div>

                    <div className="ml-10">


                    <p className=" whitespace-pre-line">{comment.comment}</p>

                    <div className="flex items-center gap-x-2 mt-2">
                        <li className="list-none ">
                            <img src="/icons/like.svg" className="w-4" alt=""/>
                        </li>
                        <li onClick={()=>handleDeleteComment(comment._id)} className="list-none">
                            <BsFillTrash2Fill className="text-sm" />
                        </li>
                    </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;