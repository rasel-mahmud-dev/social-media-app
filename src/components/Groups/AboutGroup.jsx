import React from 'react';

const AboutGroup = ({group}) => {
    return (
        <div>
            <div className="card">
                <h4 className="card-border-b-title ">About This Group</h4>
                <p className="whitespace-pre-line color_p text-sm">{group.description}</p>

                <div className="color_p text-sm mt-4">

                    <li className="">
                        <h1 className="text-base font-medium color_h2">Private</h1>
                        <p>
                            Only members can see who's in the group and what they post.
                        </p>
                    </li>
                    <li className="mt-3">
                        <h1 className="text-base font-medium color_h2">Visible</h1>
                        <p>
                            Anyone can find this group.
                        </p>
                    </li>
                    <li className="mt-3">
                        <h1 className="text-base font-medium color_h2">History</h1>
                        <p>Group created on {new Date(group.createdAt).toLocaleDateString()}
                        </p>
                    </li>
                </div>
            </div>


            <div className="card mt-5">
                <h4 className="card-border-b-title">Members {group.members.length}</h4>
                <div className="color_p text-sm mt-4">

                </div>
            </div>

            <div className="card mt-5">
                <h4 className="card-border-b-title">Activity</h4>
                <div className="color_p text-sm mt-4">
                </div>
            </div>
        </div>
    );
};

export default AboutGroup;