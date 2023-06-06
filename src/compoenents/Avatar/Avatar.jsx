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
    return letterOne + letterTwo;
}



const Avatar = ({className = "", imgClass = "", username, src, ...attr}) => {
    let letter = chooseFirstLetter(username)

    function handleErrorImage(e ) {

        let avatarRoot = e.target.parentNode
        if(avatarRoot) {
            avatarRoot.innerHTML = `
			<span class="rounded-full bg-neutral-200 w-9 h-9 flex items-center text-sm font-medium justify-center uppercase ${imgClass}>${chooseFirstLetter(username)}</span>
		`
        }
    }

    return (
        <div className={`w-12 h-12 ${className}`} {...attr}>
            {src
                ?
                <img onError={handleErrorImage} src={src} alt="avatar"
                     className={`rounded-full w-full ${imgClass}`}/>

                : <div
                    className={`rounded-full h-full w-full bg-neutral-200 flex text-sm font-semibold items-center justify-center uppercase ${imgClass}`}>{letter}</div>
            }
        </div>
    );
};

export default Avatar;
