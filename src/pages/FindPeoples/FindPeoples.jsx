import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";

const FindPeoples = () => {
const dispatch = useDispatch()

    const { peoples } = useSelector(state=>state.feedState)

    useEffect(()=>{
        dispatch(fetchPeoplesAction())
    }, [])

    console.log(peoples)

    return (
        <HomeLayout>
            <div className="card">

                <div className="card-meta">
                    <h4>Friend Request</h4>
                    <Link to="/">See all</Link>
                </div>

                <div className="mt-6">{
                    peoples.map((people, i) => (
                    <div className="mb-5" key={i}>

                        <div className="flex items-center mb-2">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar} username={people.fullName}/>
                            <div className="ml-3">
                                <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <button className="btn btn-primary">Add Friend</button>
                            <button className="btn">Profile</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        </HomeLayout>
    );
};

export default FindPeoples;