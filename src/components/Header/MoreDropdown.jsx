import React, {Suspense} from 'react';
import {Link, useNavigate} from "react-router-dom";


import DisplayAccessibilityPanel from "components/header/DisplayAccessibilityPanel";
import {useDispatch, useSelector} from "react-redux";


import {CSSTransition} from "react-transition-group"

import staticImage from "src/utils/staticImage.js";
import Loading from "components/Shared/Loading/Loading.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {logoutAction} from "src/store/slices/authSlice.js";


// interface Props {
//   isShow: boolean,
//   onSetExpandDropdown: (value: any)=> void
// }

const MoreDropdown = (props) => {

    const {appState, authState} = useSelector((state) => state)

    const {isShow, onSetExpandDropdown} = props;

    const items = [
        {id: 1, label: "Setting & Privacy", icon_class: "icon_gear", hasSubMenu: true},
        {id: 2, label: "Help & Support", icon_class: "icon_help", hasSubMenu: true},
        {id: 3, label: "Display & Accessibility", icon_class: "icon_moon", hasSubMenu: true},
        {id: 4, label: "Give Feedback", icon_class: "icon_feedback", hasSubMenu: false},
        {id: 5, label: "Log Out", icon_class: "icon_logout", hasSubMenu: false},
    ]

    const [openItem, setOpenItem] = React.useState(0);


    function handleSubItemOpen(e, subItemId) {
        e.stopPropagation();
        setOpenItem(subItemId)
    }


    return (
        <div className="more-dropdown-menu">
            <div className="min-w-[350px] menu_panel_card overflow-hidden">

                {/*********** More menu panel ***********/}
                <CSSTransition unmountOnExit={true} in={openItem === 0} timeout={400} classNames="menu_content">
                    <div>
                        <Suspense fallback={<Loading/>}>
                            <Index onSetExpandDropdown={onSetExpandDropdown} onSubItemOpen={handleSubItemOpen}
                                   items={items} auth={authState.auth}/>
                        </Suspense>
                    </div>
                </CSSTransition>


                {/*********** Display and Accessibility menu panel ***********/}
                <CSSTransition unmountOnExit={true} in={openItem === 3} timeout={400} classNames="menu_content">
                    <div>
                        <Suspense fallback={<Loading/>}>
                            <DisplayAccessibilityPanel
                                onSubItemOpen={handleSubItemOpen}
                                isDarkMode={appState.isDarkMode}/>
                        </Suspense>
                    </div>
                </CSSTransition>

            </div>
        </div>
    )
};

const Index = ({auth, items = [], onSubItemOpen, onSetExpandDropdown}) => {

    const dispatch = useDispatch()

    function logOutHandler() {
        dispatch(logoutAction())

        /// remove caching to reload browser
        location.reload()
    }


    return (
        <div className="bg-white dark:bg-dark-700">
            {auth && auth._id &&
                <div>

                    <div className="px-3 pt-3">
                        <Link to={`/profile/${auth._id}`}>
                            <div className="list_item">
                                <Avatar username={auth.fullName} src={staticImage(auth.avatar)} className="!w-10 !h-10"
                                        imgClass="!w-10 !h-10"/>

                                <div className="ml-2">
                                    <h4 className="color_h2 text-lg font-medium">{auth.fullName}</h4>
                                    <p className="color_p text-sm font-normal">See your profile</p>
                                </div>
                            </div>
                        </Link>


                    </div>

                    <div className="border_b"></div>

                    <div className="pt-0 pb-4 px-2">

                        {items.map((item) => (
                            <li key={item.id} className='list_item'
                                onClick={(e) => item.hasSubMenu
                                    ? onSubItemOpen(e, item.id)
                                    : item.id === 5
                                        ? logOutHandler()
                                        : null
                                }>
                                <div className="flex items-center">
                            <span className="rounded_circle">
                              <i className={["png_icon", item.icon_class].join(" ")}></i>
                            </span>
                                    <h4 className="ml-2 color_li">{item.label}</h4>
                                </div>
                                {item.hasSubMenu && <i className="png_icon icon_arrow_right"></i>}

                            </li>
                        ))}
                    </div>
                </div>
            }


            <footer className="px-4 pb-4 text-sm color_p">
                Privacy · Terms · Advertising · Ad Choices · Cookies · · Meta © 2022
            </footer>
        </div>
    )
}

export default MoreDropdown;