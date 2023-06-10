import React from "react";


const ErrorMessage = ({errorMessage}) => (<p
        className={[errorMessage && "open__error_message", "input--error_message  text-center bg-red-400/20"].join(" ")}>
        {errorMessage && errorMessage}
    </p>
)

export default ErrorMessage