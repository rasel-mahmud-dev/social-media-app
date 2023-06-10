import React, {useEffect} from 'react';
import {fetchProfileMediaAction} from "src/store/actions/userAction.js";
import {useDispatch, useSelector} from "react-redux";

const MediaSection = ({userId}) => {

    const dispatch = useDispatch()

    const {media} = useSelector(state=>state.authState)

    useEffect(() => {
        if (userId) {
            dispatch(fetchProfileMediaAction({userId}))
        }
    }, [userId]);

    console.log(media)

    return (
        <div className="mt-4">
            <div className="card">
                <div className="card-meta">
                    <h1>Photos</h1>
                </div>
                <div>
                    {media[userId] && media[userId].map(image=>(
                        <div key={image._id}>
                            <img src={image.url} alt=""/>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default MediaSection;