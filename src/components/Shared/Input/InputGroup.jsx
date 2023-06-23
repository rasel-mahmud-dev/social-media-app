import React from 'react';
import Input2 from "./Input2.jsx";
import DatePicker from ".//DatePicker.jsx";
import MultiSelectInput from "components/Shared/Input/MultiSelectInput.jsx";

const InputGroup = ({
                        className = "",
                        labelClass = "",
                        as,
                        name,
                        label = "",
                        placeholderText,
                        selected,
                        onChange,
                        multiple = false,
                        ...attr
                    }) => {

    return (
        <div className={className}>
            <label className={labelClass} htmlFor={name}>{label}</label>

            {as === "datepicker" ? (
                <DatePicker
                    selected={selected}
                    placeholderText={placeholderText}
                    onChange={(v) => onChange({target: {name, value: v}})}/>
            ) : (as === "select" && multiple) ?  (
                <MultiSelectInput id={name} name={name} as={as} onChange={onChange} {...attr} />

            ):          <Input2 id={name} name={name} as={as} onChange={onChange} {...attr} /> }

        </div>
    );
};

export default InputGroup;