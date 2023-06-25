import React from 'react';
import "./checkbox.scss"


const Checkbox = (props) => {

    const {
        className = "checkbox-primary", ...attr
    } = props

    return (
        <input type="checkbox" className={`checkbox ${className}`} {...attr} />
    );
};

export default Checkbox;