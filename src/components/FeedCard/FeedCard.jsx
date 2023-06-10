import React, {useEffect, useReducer, useState} from 'react';
import {BiComment, BiLike, BiShare} from "react-icons/bi";
import Avatar from "../Shared/Avatar/Avatar.jsx";
import {
    deleteCommentAction,
    deleteFeedAction,
    getAllCommentsAction,
    toggleLikeAction
} from "src/store/actions/feedAction.js";
import {localToggleFeedReactionAction, updateLocalFeedAction} from "src/store/slices/feedSlice.js";
import Comments from "src/components/Comments/Comments.jsx";
import AddComment from "src/components/AddComment/AddComment.jsx";
import Loading from "src/components/Shared/Loading/Loading.jsx";
import {FaEllipsisH, FaEllipsisV} from "react-icons/fa";
import MenuDropdown from "src/components/Dropdown/MenuDropdown.jsx";
import {BsFillBookmarkFill, BsFillTrash2Fill} from "react-icons/bs";
import getPassTime from "src/utils/time.js";
import {addInToSaveAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";

import "./feed-card.scss"
import staticImage from "src/utils/staticImage.js";

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

    function isLiked(likes) {
        if(likes && authId){
            return likes.findIndex(l=>l.userId === authId) !== -1
        }
    }

    return (
        <div className="feed">
            <div className="bg-white card p-0">
                <div className="">

                    <div className="flex justify-between p-4">
                        <div className="flex items-center">
                            <Avatar className="!w-9 !h-9" imgClass="!w-9 !h-9" username={feed?.author?.fullName} src={feed?.author?.avatar}/>
                            <div className="ml-3">
                                <Link to={`/profile/${feed?.userId}`}><h3 className="dark:text-light-950 text-dark-850 text-lg font-bold">{feed?.author?.fullName}</h3></Link>
                                <p className="dark:text-dark-100 text-gray-600 text-xs">{getPassTime(feed.createdAt)}</p>
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


                    <div className="my-4 feed-content">

                        <div className="mb-3">
                            <p className="dark:text-light-950 text-gray-800 whitespace-pre-line">{feed?.content?.slice(0, state.isExpand ? undefined : 300)}</p>

                            { feed?.content?.length > 300 ?
                                state.isExpand
                                    ? <span className="text-xs font-medium" onClick={() => handleExpand(false)}>Show less</span>
                                    : <span className="text-xs font-medium" onClick={() => handleExpand(true)}>Show more</span>
                                : ""}
                        </div>

                        { feed.images.length > 0 && (
                            <div className={`feed-media image-${feed.images.length > 4 ? 4 : feed.images.length}`}>
                                {feed?.images.slice(0, feed?.images.length >= 4 ? 4 : undefined).map((image, index)=>(
                                    <div key={index} className="relative">
                                        <img src={staticImage(image)} alt=""/>

                                        { feed?.images.length >= 4  && index === 3 && (
                                            <div className={`position-center text-white font-semibold`}>
                                                {feed?.images.length} More items
                                            </div>
                                        ) }

                                    </div>
                                ))}
                            </div>
                        ) }
                    </div>


                    <div className="px-4 pb-6">
                        <div className="flex items-center justify-between mt-4 dark:text-dark-50 text-dark-850">
                            <li className="list-none flex items-center gap-x-1">
                                <img src="/icons/like.svg" className="w-5" alt=""/>
                                <span>{feed?.likes?.length > 0 ? feed?.likes?.length: "" }</span>
                            </li>
                            <li className="list-none flex items-center gap-x-1">
                                <BiComment/>
                                <span></span>
                            </li>
                        </div>

                        <div className="flex items-center justify-between border-y dark:border-y-dark-500 border-y-light-700 mt-4 py-1 text-sm font-medium dark:text-dark-50 text-dark-850">
                            {state.isLikeActionLoading ? (
                                <li className="flex items-center gap-x-1   dark:hover:bg-dark-600 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                                    <Loading />
                                </li>
                            ) : <li onClick={() => toggleLikeHandler(feed._id)}
                                    className={`${isLiked(feed.likes) ? "!text-blue-600" : ""} flex items-center gap-x-1 dark:hover:bg-dark-600 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center`}>
                                <BiLike/>
                                <span>Like</span>
                            </li>}
                            <li onClick={handleShowComment} className="flex items-center gap-x-1  dark:hover:bg-dark-600 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                                <BiComment/>
                                <span>Comment</span>
                            </li>
                            <li className="flex items-center gap-x-1  dark:hover:bg-dark-600 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
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
        </div>
    );
};

export default FeedCard;