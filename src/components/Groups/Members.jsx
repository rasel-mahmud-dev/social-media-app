import React, {useEffect} from 'react';
import Search from "components/Shared/Input/Search.jsx";
import {useDispatch} from "react-redux";

import {useAdminMemberQuery, useQueryObjectQuery} from "src/store/features/groupMembersApi.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";


const Members = ({group}) => {

    const dispatch = useDispatch()


    let {data: members} = useQueryObjectQuery({
        groupId: group._id,
        pageNumber: 1
    })

    let {data: adminUsers} = useAdminMemberQuery({
        groupId: group?._id
    })


    useEffect(() => {

        // if(group && group._id){
        //     dispatch(fetchGroupMembersAction({
        //         groupId: group._id,
        //         pageNumber: 1
        //     }))
        // }

    }, [group])

    return (
        <div className="card">

            <h4 className="color_h1 font-medium text-base">Members {members && members?.totalMembers}</h4>

            <p className="color_p text-sm">New people and Pages who join this group will appear here. Learn More</p>

            <div className="mt-4">
                <Search placeholder="Search members"/>
            </div>


            <div>
                <h4 className="text-sm mt-8 mb-2  color_h1">Admins & moderators · {adminUsers && adminUsers?.members.length}</h4>
                {adminUsers && adminUsers?.members?.map(member => (
                    <div key={member._id} className="flex items-start gap-x-2 my-2">
                        <Avatar src={member.user.avatar} username={member.user.fullName}/>
                        <div className="">
                            <h4 className="color_h2 text-sm ">{member.user.fullName}</h4>
                            <span className="text-xs font-medium bg-primary/20 px-2 rounded py-1 text-primary">{member.role}</span>
                        </div>
                    </div>
                ))}


                <h4 className="text-sm mt-8 mb-2  color_h1">Friends · {members && members?.members.length}</h4>
                {members && members?.members?.map(member => (
                    <div key={member._id} className="flex items-start gap-x-2 my-2">
                        <Avatar src={member.user.avatar} username={member.user.fullName}/>
                        <div className="">
                            <h4 className="color_h2 text-sm ">{member.user.fullName}</h4>
                            <span className="text-xs font-medium text-primary">User</span>
                        </div>
                    </div>
                ))}


                <h4 className="text-sm mt-8 mb-2  color_h1">All Peoples</h4>
                {members && members?.members?.map(member => (
                    <div key={member._id} className="flex items-start gap-x-2 my-2">
                        <Avatar src={member.user.avatar} username={member.user.fullName}/>
                        <div className="">
                            <h4 className="color_h2 text-sm ">{member.user.fullName}</h4>
                            <span className="text-xs font-medium text-primary">User</span>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    );
};

export default Members;