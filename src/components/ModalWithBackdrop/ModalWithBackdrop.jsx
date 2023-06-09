import React from "react";

import "./styles.scss"
import {createPortal} from "react-dom";


const ModalWithBackdrop = (props) => {
    const {isOpen, root, className = "", backdropClass, modalClass, onClose} = props

    function handleCloseModal(e) {
        let el = e.target
        if (el.classList.contains('modal-backdrop')) {
            onClose()
        }
    }

    return root ? <ReactPortal>
        <div className={className}>
            <div
                className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
                onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`}>
                    {props.children}</div>
            </div>
        </div>
    </ReactPortal> : (
        <div className={className}>
            <div
                className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
                onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`}>
                    {props.children}</div>
            </div>
        </div>

    )

}

const ReactPortal = ({children}) => createPortal((
    children
), document.getElementById("modal-root"))

export default ModalWithBackdrop