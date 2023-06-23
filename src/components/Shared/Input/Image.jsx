import React, {useEffect, useRef, useState} from "react";

import "./image.scss";
import chooseImage from "src/utils/chooseImage.js";
import resizeImage from "src/utils/resizeImage.js";

const ImageChoose = ({
                         name,
                         labelIcon,
                         defaultValue,
                         label,
                         imagePreviewClass,
                         onChange,
                         placeholder,
                     }) => {
    const [state, setState] = useState({
        value: "",
        base64: "",
    });

    const input = useRef(null);

    useEffect(() => {
        setState({
            base64: "",
            value: defaultValue,
        });
    }, []);


    async function handleChooseImage() {
        let file = await chooseImage()
        if (file) {
            if (file.base64) {
                // reduce image size
                let compressImage = await resizeImage(file.base64, 600)
                setState(compressImage)
                onChange && onChange({target: {name, value: compressImage.blob}}, "");
            } else {
                setState(file)
                onChange && onChange({target: {name, value: file.blob}}, "");
            }
        }
    }

    return (
        <div className="flex flex-col custom-input-group mt-2">
            {label && (
                <label className="cursor-pointer font-sm  text-gray-600 mb-1.5" htmlFor={name}>
                    {label}
                </label>
            )}

            <div onClick={handleChooseImage} className="image-chooser">
                <div className="flex w-full items-center gap-x-2">
                    {labelIcon}
                    <span className="bg-transparent text-dark-200 px-0">{placeholder}</span>
                </div>

                <input
                    ref={input}
                    id={name}
                    name={name}
                    onClick={handleChooseImage}
                    hidden={true}
                    className="input"
                    placeholder={placeholder}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                />
            </div>

            <div className={imagePreviewClass}>
                {state.base64 ? (
                    <img src={state.base64} className="w-full mt-2" alt=""/>
                ) : (
                    defaultValue && <img src={defaultValue} className="w-full mt-2" alt=""/>
                )}
            </div>
        </div>
    );
};

export default ImageChoose;
