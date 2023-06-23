import React from "react";

function chooseFirstLetter(name) {
    if (!name) {
        return "";
    }
    let letterOne = name[0];
    let letterTwo = "";
    let splitName = name.split(" ");
    if (splitName.length > 1) {
        letterTwo = splitName[1][0];
    }
    return letterOne + (letterTwo ? letterTwo : "");
}


const Avatar = ({className = "", imgClass = "", username, src, ...attr}) => {
    let letter = chooseFirstLetter(username)

    function handleErrorImage(e) {
        let avatarRoot = e.target.parentNode
        if (avatarRoot) {
            let d = document.createElement("div")
            d.classList = `rounded-full h-full w-full dark:text-light-950 text-dark-850 dark:bg-dark-800 bg-light-700 flex text-sm font-semibold items-center justify-center uppercase ${imgClass}`
            avatarRoot.innerHTML = null
            d.innerText = letter
            avatarRoot.appendChild(d)

        }

    }

    return (
        <div className={`w-12 h-12 ${className}`} {...attr}>
            {src
                ?
                <img onError={handleErrorImage} src={src} alt="avatar"
                     className={`rounded-full w-full ${imgClass}`}/>

                : <div
                    className={`rounded-full h-full w-full dark:text-light-950 text-dark-850 dark:bg-dark-800 bg-light-700 flex text-sm font-semibold items-center justify-center uppercase ${imgClass}`}>{letter}</div>
            }
        </div>
    );
};

export default Avatar;
