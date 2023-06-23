import React from 'react';
import "./input.scss"

const Input2 = ({as = "input", inputClass = "",  renderOption, ...attr}) => {
    return (
        as === "select"
            ? (
                <select className={`input ${inputClass}`} {...attr}>
                    {renderOption()}
                </select>
            )
            : as === "textarea"
                ? <textarea className={`input ${inputClass}`} {...attr} />
                : <input className={`input ${inputClass}`} {...attr} />
    );
};

export default Input2;