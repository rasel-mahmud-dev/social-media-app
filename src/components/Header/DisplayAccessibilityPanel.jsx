import React from 'react';
import {useDispatch} from "react-redux";
import {toggleDarkMode} from "src/store/slices/appSlice.js";

// import {toggleDarkMode} from "actions/appAction";

const DisplayAccessibilityPanel = (props) => {

  const {isDarkMode, onSubItemOpen}  = props

  const dispatch = useDispatch()


  function onChangeDarkMode(status){
    dispatch(toggleDarkMode(status))
  }


  return (
      <div className="px-3 pt-3">
        <div className="flex items-center mb-4 cursor-pointer"  onClick={()=>onSubItemOpen(0)}>
          <span className="h-8 w-8 hover:bg-dark-900/10 cursor-pointer rounded-full flex items-center justify-center">
            <i className="png_icon icon_arrow_left"></i>
          </span>
          <h2 className="color_h1 text-xl font-bold ml-2">Display & accessibility</h2>
        </div>

        <div className="flex items-start">
           <div className="">
             <div className="rounded_circle">
               <i className="png_icon icon_moon"></i>
             </div>
           </div>
            <div className="ml-2">
              <h4 className="color_h2 text-lg font-medium">Dark Mode</h4>
              <p className="font-normal color_p">
                Dark Mode
                Adjust the appearance of Facebook to reduce glare and give your eyes a break.</p>
              <ul className="mt-4">
                <label className="list_item justify-between" htmlFor="dark_mode_off">
                  <h4 className="color_p">Off</h4>
                  <input onChange={()=>onChangeDarkMode(false)}  type="radio" name="darkMode" checked={!isDarkMode} id="dark_mode_off" />
                </label>
                <label className="list_item justify-between" htmlFor="dark_mode_on">
                  <h4 className="color_p">On</h4>
                  <input onChange={()=>onChangeDarkMode(true)}  id="dark_mode_on" type="radio" name="darkMode" checked={isDarkMode} />
                </label>
              </ul>
            </div>
        </div>

        <div className="flex items-start">
           <div className="">
             <div className="rounded_circle">
               <i className="png_icon icon_moon"></i>
             </div>
           </div>
            <div className="ml-2">
              <h4 className="color_h2 text-lg font-medium">Compact Mode</h4>
              <p className="font-normal color_p">
                Make your font size smaller so more content can fit on the screen.
              </p>
              <ul className="mt-4">
                <label className="list_item flex justify-between" >
                  <h4 className="color_p">Off</h4>
                  <input type="radio" name="darkMode"  id="" />
                </label>
                <label className="list_item flex justify-between" >
                  <h4 className="color_p">On</h4>
                  <input id="" type="radio" name="darkMode" />
                </label>
              </ul>
            </div>
        </div>
      </div>
  );
};

export default DisplayAccessibilityPanel;