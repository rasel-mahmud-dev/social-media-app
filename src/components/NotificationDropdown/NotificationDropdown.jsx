import React, {useState} from 'react';

import "./style.scss"

import {FaEllipsisH} from "react-icons/fa";
import {useSelector} from "react-redux";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import Button from "components/Shared/Button/Button.jsx";
import getPassTime from "src/utils/time.js";
import {Link, useNavigate} from "react-router-dom";


const NotificationDropdown = ({onClose}) => {

    const {notifications} = useSelector(state => state.notificationState)

    const navigate = useNavigate()

    const [isShowAll, setShowAll] = useState(true)

    function handleShowNotification(isShowAll) {
        setShowAll(isShowAll)
    }

    function filterNotificationByType(notifications) {
        return isShowAll ? notifications : notifications.filter(notification => !notification.isRead)
    }

    function onClickNotificationItem() {
        onClose()
    }

    function renderMessage(notification) {

    }

    function notificationCommon(notification, body ) {

        console.log(notification.createdAt)

                return (
            <div className={`flex items-center gap-x-2 py-3 rounded-md mt-1 px-3 relative ${notification.isRead ? "bg-transparent" : "unread-notification dark:bg-dark-600 bg-light-800"}`} >
                <div className="">
                    <Avatar
                        src={staticImage(notification?.sender?.avatar)}
                        className="!w-10 !h-10 "
                        imgClass="!w-10 !h-10"
                        username="Sender"/>
                </div>

                <div className="">
                    {body}
                    <p className="text-primary mt-0 text-xs">{getPassTime(notification?.timestamp)}</p>
                </div>
            </div>)
    }

    function renderNotificationItem(notification) {

        if (notification.notificationType === "group-invitation") {
            return <Link onClick={onClickNotificationItem} to={`/groups/${notification?.group?._id}`}>
                {
                    notificationCommon(notification,
                        <p className="color_h2 text-sm">
                            {notification.sender.fullName} invite you to join {notification?.group?.name} group

                        </p>, true
                    )
                }
            </Link>

        } else if (notification.notificationType === "friend-request") {
            return <Link className="" onClick={onClickNotificationItem} to="/friend-request-received">
                {notificationCommon(notification,
                    <p className="color_h2 text-sm">
                        {notification.sender.fullName} send you a friend request
                    </p>, true
                )
                }
            </Link>
        } else if (notification.notificationType === "friend-request-accepted") {
            return  notificationCommon(notification,
                <p className="color_h2 text-sm">
                    {notification.sender.fullName} accepted your friend request
                </p>
            )
        } else if (notification.notificationType === "unfriend") {
            return notificationCommon(notification,
                <p className="color_h2 text-sm">
                    {notification.sender.fullName} remove you from friend list
                </p>
            )
        } else {
            return notificationCommon(notification, "ooooooooooooooooooo")
        }

        //     {!notification?.isRead && <div className="new-noti"></div>}
        // }
        //
        // return (
        //     <div key={notification._id}
        //          className={`py-2 px-2 mx-2 notification-item rounded-md my-1 ${!notification?.isRead ? "unread-notification" : ""}`}>
        //
        //
        //
        //     </div>
        // )
    }

    return (
        <div className="notification-panel dropdown-panel-list-parent  ">
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

                    <div className="flex items-center px-1 mb-3">
                        <Button onClick={() => handleShowNotification(true)}
                                className={isShowAll ? "btn-primary " : "dark:text-light-900 text-dark-950"}>All</Button>
                        <Button onClick={() => handleShowNotification(false)}
                                className={!isShowAll ? "btn-primary" : "dark:text-light-900 text-dark-950"}>Unread</Button>
                    </div>

                    {filterNotificationByType(notifications).map(notification => (
                        renderNotificationItem(notification)
                    ))}

                </div>
            </div>
        </div>
    )
};

export default NotificationDropdown;