import React from 'react';

//
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import {
//  faEye, faEyeSlash
//
// } from "@fortawesome/pro-regular-svg-icons";
import "./styles.scss"

// interface Props{
//   onChange: any,
//   name: string,
//   value: string | number,
//   type?: string
//   placeholder?: string
//   label: string
//   className?: string
//   errorMessage?: string
// }

const Input = (props) => {

    const {
        onChange,
        name,
        value,
        type = "text",
        placeholder,
        label,
        className,
        errorMessage
    } = props

    const [isShowPass, setShowPass] = React.useState(false)

    const [isFocus, setFocus] = React.useState(false)

    function handleBlur() {
        setFocus(false)
    }

    function handleFocus() {
        setFocus(true)
    }

    return (
        <div className={["input-group flex mb-3", isFocus ? "input_focus" : ""].join(" ")}>
            <label
                onClick={handleFocus}
                htmlFor={name + "-input"}>{label}</label>
            <div className="input_box">
                {type === "password" ? (
                    <div className="flex justify-between items-center">
                        <input
                            type={isShowPass ? "text" : type}
                            onChange={onChange ? onChange : () => {
                            }}
                            value={value}
                            name={name}
                            id={name + "-input"}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                            onClick={handleFocus}
                            className={["input-item", className ? className : ""].join(" ")}
                        />
                        {/*{value && <FontAwesomeIcon onClick={()=>setShowPass(!isShowPass)} icon={isShowPass ? faEyeSlash : faEye  } /> }*/}
                    </div>
                ) : (
                    <input
                        type={type}
                        onChange={onChange ? onChange : () => {
                        }}
                        value={value}
                        name={name}
                        id={name + "-input"}
                        placeholder={placeholder}
                        onBlur={handleBlur}
                        onClick={handleFocus}
                        className={["input-item", className ? className : ""].join(" ")}
                    />
                )}


                <div className="relative overflow-x-hidden">
                    <div className="input-border"/>
                    <div
                        className={["input-border__active", isFocus ? "input-border__focus" : "input-border__blur"].join(" ")}/>
                </div>

                <span
                    className={["input--error_message", errorMessage ? "open__error_message" : "close__error_message"].join(" ")}>{errorMessage}</span>
            </div>
        </div>
    );
};

export default Input;