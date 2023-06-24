import React, {useState} from 'react';

import "./style.scss"

import {FaEllipsisH} from "react-icons/fa";
import {useSelector} from "react-redux";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import Button from "components/Shared/Button/Button.jsx";
import getPassTime from "src/utils/time.js";


const NotificationDropdown = ({}) => {

    const {notifications} = useSelector(state => state.notificationState)

    const [isShowAll, setShowAll] = useState(true)

    function handleShowNotification(isShowAll) {
        setShowAll(isShowAll)
    }

    function filterNotificationByType(notifications) {
        return isShowAll ? notifications : notifications.filter(notification => !notification.isRead)
    }


    return (
        <div className="absolute top-10 right-0 dropdown-panel-list-parent  ">
            <div className="min-w-[350px] menu_panel_card overflow-hidden">
                <div className="flex items-center justify-between px-3 pt-3">
                    <h1 className="color_h1 font-semibold text-lg">Notification</h1>
                    <div className="flex items-center gap-x-1">
                        <li className="circle-hover-btn color_p text-sm">
                            <FaEllipsisH/>
                        </li>
                    </div>
                </div>


                <div className="dropdown-panel-list">

                    <div className="flex items-center my-2 px-2">
                        <Button onClick={() => handleShowNotification(true)}
                                className={isShowAll ? "btn-primary" : ""}>All</Button>
                        <Button onClick={() => handleShowNotification(false)}
                                className={!isShowAll ? "btn-primary" : ""}>Unread</Button>
                    </div>

                    {filterNotificationByType(notifications).map(notification => (
                        <div key={notification._id}
                             className={`py-2 px-2 mx-2 notification-item rounded-md my-1 ${!notification?.isRead ? "unread-notification" : ""}`}>

                            <div className="flex items-start gap-x-2">
                                <Avatar
                                    src={staticImage(notification?.sender?.avatar)}
                                    className="!w-14 !h-14 "
                                    imgClass="!w-14 !h-14 !max-w-max"
                                    username="Sender"/>

                               <div>
                                   <p className="color_p text-sm">{notification.message}</p>
                                   <p className="text-primary mt-2 text-xs">{getPassTime(notification?.createdAt)}</p>
                               </div>
                            </div>

                            { !notification?.isRead  && <div className="new-noti"></div> }

                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
};

export default NotificationDropdown;