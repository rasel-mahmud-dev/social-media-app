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

    function notificationCommon(notification, body) {
        return (
            <div className="flex items-start gap-x-2">
                <Avatar
                    src={staticImage(notification?.sender?.avatar)}
                    className="!w-14 !h-14 "
                    imgClass="!w-14 !h-14 !max-w-max"
                    username="Sender"/>

                <div>
                    {body}
                    <p className="text-primary mt-2 text-xs">{getPassTime(notification?.createdAt)}</p>
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

                        </p>
                    )
                }
            </Link>

        } else if (notification.notificationType === "friend-request") {
            return <Link onClick={onClickNotificationItem} to="/friend-request-received">
                {notificationCommon(notification,
                    <p className="color_h2 text-sm">
                        {notification.sender.fullName} send you a friend request
                    </p>
                )
                }
            </Link>
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