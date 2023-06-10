import React from "react";
import {backend} from "src/apis/index.js";
import {BsGoogle} from "react-icons/bs";


const SocialLogin = () => {
    return (
		<button
			className="bg-red-400 justify-center items-center flex w-full px-4 py-2 border-none text-white text-sm rounded-full">
			<a href={`${backend}/api/v1/auth/google`} className="flex items-center">
				<BsGoogle className="mr-2 text-md"/>
				Login With Google
			</a>
		</button>
    );
};

export default SocialLogin;
