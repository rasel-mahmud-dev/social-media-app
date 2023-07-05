import React from "react";
import staticImage from "src/utils/staticImage.js";

const Video = React.memo(({src, videoRef}) => {

    return (
        <video ref={videoRef} controls={true} src={staticImage(src)}></video>
    )
})
export default Video