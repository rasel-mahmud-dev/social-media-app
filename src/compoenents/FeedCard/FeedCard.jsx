import React, {useEffect, useReducer, useState} from 'react';
import {BiComment, BiLike, BiShare} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";
import {
    deleteCommentAction,
    deleteFeedAction,
    getAllCommentsAction,
    toggleLikeAction
} from "src/store/actions/feedAction.js";
import {localToggleFeedReactionAction, updateLocalFeedAction} from "src/store/slices/feedSlice.js";
import Comments from "src/compoenents/Comments/Comments.jsx";
import AddComment from "src/compoenents/AddComment/AddComment.jsx";
import Loading from "src/compoenents/Loading/Loading.jsx";
import {FaEllipsisH, FaEllipsisV} from "react-icons/fa";
import MenuDropdown from "src/compoenents/Dropdown/MenuDropdown.jsx";
import {BsFillBookmarkFill, BsFillTrash2Fill} from "react-icons/bs";
import getPassTime from "src/utils/time.js";
import {addInToSaveAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";

const FeedCard = ({feed, authId, dispatch}) => {

    const [state, setState] = useReducer((prev, action)=>({
        ...prev,
        ...action
    }), {
        isExpand: false,
        setLikeActionLoading: false,
        isShowComment: false,
        comments: []
    })

    function handleExpand(isExpand) {
        setState({isExpand: isExpand})
    }

    function toggleLikeHandler(feedId) {
        setState({isLikeActionLoading: true})

        dispatch(toggleLikeAction({feedId})).unwrap().then((data)=>{
            if(!data) return;

            dispatch(localToggleFeedReactionAction(data.like))

        }).finally(() => {
            setState({isLikeActionLoading: false})
        })
    }

    function handleShowComment(){
        setState({isShowComment: true})
        if(feed._id){
            dispatch(getAllCommentsAction(feed._id)).unwrap().then(data=>{
                setState({comments: data.comments})
            })
        }
    }

    function handleDeleteComment(commentId){
        dispatch(deleteCommentAction(commentId)).unwrap().then(data=>{
            setState({comments: state.comments.filter(c=>c._id !== commentId)})
        })
    }

    function handleAddComment(newComment){
        setState({comments: [newComment, ...state.comments]})
    }

    function handelDeleteFeed(feedId){
        dispatch(deleteFeedAction(feedId))
    }
    function handleSaveItem(feedId){
        dispatch(addInToSaveAction({feedId}))
    }

    return (
        <div className="feed">
            <div className="bg-white card w-full">
                <div className="">

                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Avatar className="!w-9 !h-9" imgClass="!w-9 !h-9" username={feed?.author?.fullName} src={feed?.author?.avatar}/>
                            <div className="ml-3">
                                <Link to={`/profile/${feed?.userId}`}><h3 className="text-lg font-bold">{feed?.author?.fullName} {new Date().getTime()} </h3></Link>
                                <p className="text-gray-600 text-xs">{getPassTime(feed.createdAt)}</p>
                            </div>
                        </div>
                        <MenuDropdown contentClass="right-0 w-40" render={()=>(
                            <div className="">
                               <li onClick={()=>handelDeleteFeed(feed._id)} className={`cursor-pointer flex items-center gap-x-1 list-none
                                ${feed.userId === authId ? "" : "disable-delete-feed"}`}>
                                   <BsFillTrash2Fill />
                                   <span className="text-xs font-medium text-gray-500">Delete</span>
                               </li>
                                <li onClick={()=>handleSaveItem(feed._id)} className="cursor-pointer flex items-center gap-x-1 list-none mt-2">
                                    <BsFillBookmarkFill />
                                    <span className="text-xs font-medium text-gray-500">Save </span>
                                </li>
                            </div>
                        )}>
                            <span className="w-7 h-7 cursor-pointer flex rounded-full justify-center items-center hover:bg-neutral-200"><FaEllipsisV className="text-xs text-neutral-700" /></span>
                        </MenuDropdown>
                    </div>


                    <div className="mt-4">
                        <p className="text-gray-800">{feed?.content?.slice(0, state.isExpand ? undefined : 300)}</p>

                        { feed?.content?.length > 300 ?
                            state.isExpand
                                ? <span onClick={() => handleExpand(false)}>show less</span>
                                : <span onClick={() => handleExpand(true)}>show more</span>
                            : ""}
                    </div>


                    <div className="flex items-center justify-between mt-4">
                        <li className="list-none flex items-center gap-x-1">
                            <img src="/icons/like.svg" className="w-5" alt=""/>
                            <span>{feed?.likes?.length > 0 ? feed?.likes?.length: "" }</span>
                        </li>
                        <li className="list-none flex items-center gap-x-1">
                            <BiComment/>
                            <span></span>
                        </li>
                    </div>

                    <div className="flex items-center justify-between border-t border-b mt-4 py-1 text-sm font-medium">
                        {state.isLikeActionLoading ? (
                            <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                                <Loading />
                            </li>
                        ) : <li onClick={() => toggleLikeHandler(feed._id)}
                                className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiLike/>
                            <span>Like</span>
                        </li>}
                        <li onClick={handleShowComment} className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiComment/>
                            <span>Comment</span>
                        </li>
                        <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiShare/>
                            <span>Share</span>
                        </li>
                    </div>

                    {
                        state.isShowComment && (
                            <div>
                                <Comments handleDeleteComment={handleDeleteComment} comments={state.comments} />
                                <AddComment handleAddComment={handleAddComment} feedId={feed._id}/>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default FeedCard;