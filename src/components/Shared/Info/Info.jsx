import * as PropTypes from "prop-types";

import "./info.scss"

function Info({className = "", status = "success", message = ""}) {
    return message && (
        <div className={`${className} info-message info-${status}`}>
            {message}
        </div>
    )
}

Info.propTypes = {
    message: PropTypes.string,
    status: PropTypes.string
};

export default Info