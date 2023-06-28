import React, {useContext, useEffect} from 'react';


import {Outlet} from "react-router-dom";

const PageLayout = ({children}) => {

    return (
        <div>
            <div className=" ">
                <Outlet/>
                {/*<div className="group-content">*/}
                {/*    <div className="content-full">*/}
                {/*        <Outlet/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<Sidebar*/}
                {/*    className="white right-sidebar"*/}
                {/*    isOpen={openSidebar === "right-sidebar"}*/}
                {/*    onClose={() => dispatch(openSidebarAction(""))}*/}
                {/*>*/}

                {/*<ActiveFriend*/}
                {/*    handleStartChat={handleStartChatHandler}*/}
                {/*    auth={auth}*/}
                {/*    friends={friends}*/}
                {/*/>*/}
                {/*<PendingFriendRequestCard className="mt-4" auth={auth} pendingFriends={pendingFriends} />*/}

                {/*</Sidebar>*/}

            </div>
        </div>
    );
};

export default PageLayout