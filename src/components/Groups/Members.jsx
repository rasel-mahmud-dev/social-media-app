import React, {useEffect} from 'react';
import Search from "components/Shared/Input/Search.jsx";
import {useDispatch} from "react-redux";
import {fetchGroupMembersAction} from "src/store/actions/groupAction.js";


const Members = ({group}) => {

    const dispatch = useDispatch()

    useEffect(()=>{

        if(group && group._id){
            dispatch(fetchGroupMembersAction({
                groupId: group._id,
                pageNumber: 1
            }))
        }

    }, [group])

    return (
        <div className="card">

            <h4 className="color_h1 font-medium text-base">Members 43,968</h4>

            <p className="color_p text-sm">New people and Pages who join this group will appear here. Learn More</p>

            <div className="mt-4">
                <Search placeholder="Search members"/>
            </div>


            <div>

                <h4>Admins & moderators  · 21</h4>


                <h4>Friends  · 466</h4>

                <h4>All Peoples</h4>


            </div>

        </div>
    );
};

export default Members;