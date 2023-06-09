import React, {useReducer} from 'react';
import Avatar from "src/components/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addCommentAction} from "src/store/actions/feedAction.js";
import Loading from "src/components/Loading/Loading.jsx";

const AddComment = ({feedId, handleAddComment}) => {

    const {auth} = useSelector(state=>state.authState)
    const dispatch = useDispatch()

    const [state, setState] = useReducer((p, a)=>({...p, ...a}), {isLoading: false})

    function handleSendMessage(e){
        e.preventDefault();
        let comment = e.target.comment.value
        if(!comment){
            alert("Please write some text")
            return
        }

        setState({isLoading: true})
        e.target.comment.value = ""
        dispatch(addCommentAction({comment: comment, feedId: feedId})).then(action=>{

            if(action.payload.comment){
                handleAddComment(action.payload.comment)
            }
        }).finally(()=>{
            setState({isLoading: false})
        })
    }

    return (
        <div className="mt-4">

            <div className="flex items-center gap-x-2 mt-2">
                <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" username="ER SDF" src={auth?.avatar}/>
                <label htmlFor="">Write a comment</label>

        </div>
            <form onSubmit={handleSendMessage} className="w-full mt-1">
                <textarea className="text-sm input-elemtextarea" placeholder="Wrire comment" name="comment"></textarea>
                {state.isLoading ? (
                    <span className="flex items-center gap-x-1">
                        <Loading />
                        <span className="text-xs text-neutral-500">Please wait</span>
                    </span>
                ) : (
                    <button className="btn btn-primary" type={"submit"}>Post</button>
                )}
            </form>
        </div>
    );
};

export default AddComment;