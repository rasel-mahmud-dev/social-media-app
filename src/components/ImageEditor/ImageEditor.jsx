import React, {useState} from 'react';
import Cropper from "react-easy-crop";

const ImageEditor = ({src, onCropComplete, aspect = 4 / 4}) => {


    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)

    return (
        <Cropper
            showGrid={false}
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
        />
    );
};

export default ImageEditor;