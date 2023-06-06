import React from 'react';
import "./sidebar.scss"

const Sidebar = ({className, children}) => {
    return (
        <div className={`sidebar ${className}`}>
            {children}
        </div>
    );
};

export default Sidebar;