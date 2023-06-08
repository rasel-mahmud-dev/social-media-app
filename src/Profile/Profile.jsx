import React, {useEffect, useReducer} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import apis from "src/apis";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import FeedCard from "src/compoenents/FeedCard/FeedCard.jsx";


const Profile = () => {

    const {userId} = useParams()

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useReducer((p, a) => ({...p, ...a}), {
        profile: {
            feeds: [],
            friends: [],
            user: null
        },
        isLoading: false
    })

    useEffect(() => {
        if (userId) {

            apis.get("/users/profile/" + userId).then(({status, data}) => {
                if (status === 200) {
                    setState(data)
                }

            }).catch(ex => {

            })

        }
    }, [userId])


    function renderItem(people, _friend) {
        return (
            <div>
                <div className="flex items-center mb-2">
                    <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar} username={people.fullName}/>
                    <div className="ml-3">
                        <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                        <p className="text-gray-600 text-sm">3 hours ago</p>
                    </div>
                </div>
            </div>
        )
    }

    function handleUploadAvatar(){
        let input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.addEventListener("change", handleUploadImage)
        input.click()
    }

    function handleUploadImage(e){
        let file = e.target.files[0]


        let formData = new FormData()
        formData.append("avatar", file, "avatar")
        apis.post("/auth/update-profile", formData).then(({data, status})=>{
            console.log(data, status)
        })


    }

    return (
        <div className="max-w-screen-2xl mx-auto px-4">
            {state.user && (
                <div className="grid grid-cols-12">
                    <div className="col-span-2">
                        <Avatar className="!h-40 !w-40" src={state.user?.avatar} imgClass="!h-40 !w-40 !text-xs"
                                username={state.user.fullName}/>

                        {state.user._id === auth._id && (
                            <div className="mt-2">
                                <button onClick={handleUploadAvatar} className="btn text-xs font-medium">Change Photo</button>
                            </div>
                        )}

                        <h4 className="font-semibold">{state.user.fullName}</h4>

                       <div className="mt-4">
                           <div className="text-xs font-semibold">
                               Friends: {state.friends.length}
                           </div>
                           <div className="text-xs font-semibold">
                               Total Posts: {state.feeds.length}
                           </div>
                       </div>
                    </div>


                    <div className="col-span-10">

                        <div className="">

                            <div className="card-meta my-4">
                                <h4 className="font-semibold">Timeline</h4>
                            </div>


                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="card">
                                    <div className="card-meta">
                                        <h4>Posts</h4>
                                    </div>

                                    <div className="flex flex-col gap-y-4">
                                        {state.feeds && state.feeds.slice(0, 3).map(feed => (
                                            <FeedCard key={feed._id} feed={feed} authId={auth._id} dispatch={dispatch}/>
                                        ))}
                                    </div>


                                </div>

                                <div className="card">
                                    <div className="card-meta ">
                                        <h4>Friends</h4>
                                    </div>

                                    <div>
                                        <div className="mt-6">{
                                            state.friends.map((friend) => (
                                                <div className="mb-5" key={friend._id}>
                                                    {renderItem((friend.receiverId === state.user._id) ? friend.sender : friend.receiver, friend)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>


                </div>
            )}
        </div>
    );
};

export default Profile;