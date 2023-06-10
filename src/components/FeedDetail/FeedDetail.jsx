import React, {useEffect, useReducer} from 'react';
import HomeLayout from "layout/HomeLayout.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedDetailAction} from "src/store/actions/feedAction.js";
import FeedCard from "src/components/FeedCard/FeedCard.jsx";
import Loading from "src/components/Shared/Loading/Loading.jsx";

const FeedDetail = () => {

    const {feedId} = useParams()

    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state.authState)

    const [state, setState] = useReducer((p, a) => ({...p, ...a}), {
        feed: null,
        isLoading: false
    })

    useEffect(() => {
        if (feedId) {
            setState({isLoading: true})
            dispatch(fetchFeedDetailAction(feedId)).unwrap().then((data) => {
                setState({feed: data.feed})

            }).finally(() => {
                setState({isLoading: false})
            })
        }
    }, [feedId])

    return (
        <div>
            <HomeLayout>

                {state.isLoading ? (
                    <Loading></Loading>
                ) : (
                    state.feed && <FeedCard authId={auth._id} dispatch={dispatch} feed={state.feed}/>
                )}

            </HomeLayout>
        </div>
    );
};

export default FeedDetail;