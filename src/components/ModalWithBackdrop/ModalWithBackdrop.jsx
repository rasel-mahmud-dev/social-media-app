import React from "react";

import "./styles.scss"
import {createPortal} from "react-dom";
import {TiTimes} from "react-icons/ti";


const ModalWithBackdrop = (props) => {
    const {isOpen, root, className = "", title = "", backdropClass, modalClass, onClose} = props

    function handleCloseModal(e) {
        let el = e.target
        if (el.classList.contains('modal-backdrop')) {
            onClose()
        }
    }

    function renderTitle(){
        return typeof title === "string" ? (
            <div className="flex items-center justify-center relative" >
                <h2 className="color_h1 text-lg font-semibold mb-2 text-center">{title}</h2>
                <div className="absolute right-4 circle-hover-btn text-white" onClick={onClose}>
                    <TiTimes />
                </div>
            </div>
        ) : title
    }

    return root ? <ReactPortal>
        <div className={className}>
            <div
                className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
                onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`}>
                    {title && renderTitle()}
                    {props.children}
                </div>
            </div>
        </div>
    </ReactPortal> : (
        <div className={className}>
            <div
                className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
                onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`}>
                    {title && renderTitle()}
                    {props.children}
                </div>
            </div>
        </div>

    )

}

const ReactPortal = ({children}) => createPortal((
    children
), document.getElementById("modal-root"))

export default ModalWithBackdrop