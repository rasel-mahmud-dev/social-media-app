import React from 'react';
import "./sidebar.scss"

const Sidebar = ({className, children, isOpen, onClose}) => {
    return (
       <>
        {isOpen && <div onClick={()=>onClose && onClose()} className="sidebar-backdrop"></div> }
           <div className={`sidebar  ${isOpen ? "open-mobile-sidebar" : ""} ${className}`}>
               {children}
           </div>
       </>
    );
};

export default Sidebar;