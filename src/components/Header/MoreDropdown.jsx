import React, { Suspense} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";


import DisplayAccessibilityPanel from "components/header/DisplayAccessibilityPanel";
import {useDispatch, useSelector} from "react-redux";


import {CSSTransition} from "react-transition-group"

import staticImage from "src/utils/staticImage.js";
import Loading from "components/Shared/Loading/Loading.jsx";


// interface Props {
//   isShow: boolean,
//   onSetExpandDropdown: (value: any)=> void
// }

const MoreDropdown = (props) => {

  const {appState, authState} = useSelector((state)=>state)


  const { isShow, onSetExpandDropdown } = props;


  function logoutRoutePush(url){

  }
  function pushRoute(url){

  }

  const items   = [
    {id: 1, label: "Setting & Privacy", icon_class: "icon_gear", hasSubMenu: true },
    {id: 2, label: "Help & Support", icon_class: "icon_help", hasSubMenu: true },
    {id: 3, label: "Display & Accessibility", icon_class: "icon_moon", hasSubMenu: true },
    {id: 4, label: "Give Feedback", icon_class: "icon_feedback", hasSubMenu: false },
    {id: 5, label: "Log Out", icon_class: "icon_logout", hasSubMenu: false },
  ]

  const [openItem, setOpenItem] = React.useState(3);


  function handleSubItemOpen(subItemId){
    setOpenItem(subItemId)
  }

  console.log(openItem)

    return isShow ? (
        <div className="absolute top-10 right-0 ">
          <div className="min-w-[350px] menu_panel_card overflow-hidden">

            {/*********** More menu panel ***********/}
            <CSSTransition unmountOnExit={true} in={openItem === 0} timeout={400} classNames="menu_content">
              <div>
                <Suspense fallback={<Loading/>}>
                  <Index onSetExpandDropdown={onSetExpandDropdown} onSubItemOpen={handleSubItemOpen} items={items} authState={authState} />
                </Suspense>
              </div>
            </CSSTransition>


            {/*********** Display and Accessibility menu panel ***********/}
            <CSSTransition unmountOnExit={true} in={openItem === 3} timeout={400} classNames="menu_content">
                <div>
                  <Suspense fallback={<Loading/>}>
                    <DisplayAccessibilityPanel onSubItemOpen={handleSubItemOpen}  isDarkMode={appState.isDarkMode} />
                  </Suspense>
                </div>
              </CSSTransition>

          </div>
        </div>
    ) : <span></span>
};

const Index = ({authState, items, onSubItemOpen, onSetExpandDropdown})=>{

  const dispatch =  useDispatch()
  const navigator =  useNavigate()

  function logOutHandler(){
    // dispatch(loginOutHandlerAction(()=> {
    //   onSetExpandDropdown("")
    //   navigator("/")
    // }))
  }

  return (
      <div className="bg-white dark:bg-dark-700">
        { authState._id &&
            <div>

                <div className="px-3 pt-3">
                    <div className="flex items-center">
                        <div className="w-14">
                            <img className="w-full rounded-full" src={staticImage(authState.avatar)} alt=""/>
                        </div>
                        <div className="ml-2">
                            <h4 className="color_h2 text-lg font-medium">{authState.firstName}</h4>
                            <p className="color_p text-sm font-normal">
                                <Link to="/">
                                    See your profile
                                </Link>
                            </p>

                        </div>
                    </div>


                </div>

                <div className="border_b"></div>

                <div className="py-5 px-2">

                  { items.map((item)=>(
                      <li className='list_item' onClick={()=> item.hasSubMenu ? onSubItemOpen(item.id) : logOutHandler()}>
                        <div className="flex items-center">
                            <span className="rounded_circle">
                              <i className={["png_icon", item.icon_class].join(" ")}></i>
                            </span>
                          <h4 className="ml-2 color_li">{item.label}</h4>
                        </div>
                        { item.hasSubMenu && <i className="png_icon icon_arrow_right"></i> }

                      </li>
                  )) }
                </div>
            </div>
        }


        <footer className="px-4 pb-4 text-sm color_p">
          Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·   · Meta © 2022
        </footer>
      </div>
  )
}

export default MoreDropdown;