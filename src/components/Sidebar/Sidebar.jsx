import "./sidebar.scss"
import {bool, element, func, string} from "prop-types";

const Sidebar = ({className, backdrop = true, children, isOpen, onClose}) => {
    return (
        <>
            {backdrop && isOpen && <div onClick={() => onClose && onClose()} className="sidebar-backdrop"></div>}

            <div className={`sidebar  ${isOpen ? "open-mobile-sidebar" : ""} ${className}`}>
                {children}
            </div>
        </>
    );
};


Sidebar.propTypes = {
    className: string,
    isOpen: bool,
    backdrop: bool,
    onClose: func,
    children: element,
}

export default Sidebar;