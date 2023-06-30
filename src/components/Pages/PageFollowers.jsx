import React, {useEffect} from 'react';
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";

const PageFollowers = ({pageId}) => {

    const [state, setState] = useCustomReducer({
        following: []
    })

    useEffect(() => {
        if (!pageId) return;
        apis.get("/page/following?pageId=" + pageId).then(({data, status}) => {
            if (status === 200) {
                setState({
                    following: data.following
                })
            }
        })
    }, []);


    return (
        <div className="card mt-5">

            {state?.following.length === 0  && (
                <h2 className="color_h2 font-medium">This page has no followers</h2>
            )}

            {state?.following.map(follower => (
                <div key={follower._id}>
                    <div className="flex items-center gap-x-2">
                        <Avatar className="!w-10 !h-10" imgClass="!w-10 !h-10" src={staticImage(follower.user.avatar)}
                                alt=""/>
                        <h4 className="color_h2 font-medium">{follower?.user?.fullName}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PageFollowers;
