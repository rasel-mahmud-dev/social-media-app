import React from "react";

import "./styles.scss"


const ModalWithBackdrop = (props) => {
    const { isOpen, maxHeight, maxWidth, backdropClass, modalClass, onClose } = props
    
    function handleCloseModal(e) {
        let el = e.target
        if (el.classList.contains('modal-backdrop')) {
            onClose()
        }
    }
    
    return (
        
        <div
            className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
            onClick={handleCloseModal}
        >
            <div className={`${modalClass} modal`}>
                {props.children}</div>
        </div>
    
    )
}


export default ModalWithBackdrop