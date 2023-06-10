
import {useDispatch, useSelector} from "react-redux";
import { confirmFriendRequestAction} from "src/store/actions/userAction.js";

import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";
import HomeLayoutLink from "pages/HomeLayoutLink/HomeLayoutLink.jsx";

const RequestForYou = () => {
const dispatch = useDispatch()

    const { pendingFriends, auth } = useSelector(state=>state.authState)


    return (
        <HomeLayout>
            <HomeLayoutLink />
            <div className="card">

                <div className="card-meta">
                    <div className="flex items-center gap-x-2">
                        <h4>Request for you</h4>
                    </div>

                </div>

                <div className="mt-6">{
                    pendingFriends.map((friend, i) => friend.receiverId === auth._id && (
                    <div className="mb-5" key={i}>

                        <div className="flex items-center mb-2">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" src={friend?.sender?.avatar} username={friend?.sender?.fullName}/>
                            <div className="ml-3">
                                <h3 className="text-base font-medium text-neutral-700">{friend?.sender.fullName}</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <button onClick={()=> dispatch(confirmFriendRequestAction({friendId: friend._id, userId: friend?.senderId}))} className="btn btn-primary">Accept</button>
                            <button className="btn">Profile</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        </HomeLayout>
    );
};

export default RequestForYou;