import React from "react";
import {FaFacebookF , FaLinkedin, FaSlack, FaYoutube} from "react-icons/fa";
import {BiGlobe} from "react-icons/bi";
import {Link} from "react-router-dom";


function SocialLinks(){
    return (
        <ul className="flex gap-4 mt-4">
            <a
                className="card-label transition transition-colors  hover:bg-primary hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-grey-200  rounded-lg"
                href=""
            >
                <FaFacebookF className="text-lg" />
            </a>
            <a
                className="card-label transition transition-colors  hover:bg-primary hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-gray-100/20  rounded-lg"
                href=""
            >
                <BiGlobe className="text-lg" />
            </a>
            <a
                className="card-label transition transition-colors  hover:bg-primary hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-gray-100/20  rounded-lg"
                href=""
                target="_blank"
            >
                <FaSlack className="text-lg" />
            </a>{" "}
            <a
                className="card-label transition transition-colors  hover:bg-primary hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-gray-100/20  rounded-lg"
                href=""
            >
                <FaYoutube className="text-lg" />
            </a>
            <a
                className="card-label transition transition-colors  hover:bg-primary hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-gray-100/20  rounded-lg"
                href=""
                target="_blank"
            >
                <FaLinkedin className="text-lg" />
            </a>
        </ul>
    )
}

const Footer = () => {
    return (
        <>
            <footer className="bg-primary2 pb-10 py-14">
                <div className="container-2 grid grid-cols-1 md:grid-cols-8 gap-0 md:gap-10 justify-between">
                    <div className="col-auto md:col-span-3 lg:col-span-4 max-w-max lg:max-w-lg">
                        <div className="flex items-center gap-x-1">
                            <Link to="/">
                                <div className="flex items-end ">
                                    <img className="w-10" src="https://flowbite.com/docs/images/logo.svg" alt=""/>
                                    <h4 className="text-semibold text-xl text-white ml-2">Kotha</h4>
                                </div>
                            </Link>
                        </div>
                        <p className="text-gray-300 font-normal text-sm pt-4">
                            Kotha is the social management type application. Here user can make fun.
                        </p>
                        <SocialLinks />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between col-span-5 lg:col-span-4 w-full mt-4 md:mt-0">
                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold heading-subtitle !text-start">Our sevices</h3>
                            <ul className="mt-2">
                                <li className="text-gray-300 font-normal text-sm pt-1">
                                    Web design
                                </li>
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">Money Loan</li>*/}
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">Data Engineer</li>*/}
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">Data Analyst</li>*/}
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">*/}
                                {/*    Intro to Programming*/}
                                {/*</li>*/}
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">*/}
                                {/*    Digital Marketing*/}
                                {/*</li>*/}
                                {/*<li className="text-gray-300 font-normal text-sm pt-1">*/}
                                {/*    Self Driving Car Engineer*/}
                                {/*</li>*/}
                            </ul>
                        </div>

                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold heading-subtitle !text-start">Quick Links</h3>
                            <ul className="mt-2">
                                <li className="text-gray-300 font-normal text-sm pt-1">
                                    <span  className="hover:text-primary-500">
                                        My Account
                                    </span>
                                </li>
                                <Link to="/login"><li className="text-gray-300 font-normal text-sm pt-1">
                                    <span className="hover:text-primary-500">
                                        Login
                                    </span>
                                </li></Link>

                                <Link to="/registration"><li className="text-gray-300 font-normal text-sm pt-1">
                                    <span className="hover:text-primary-500">
                                        Registration
                                    </span>
                                </li>
                                </Link>

                            </ul>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold heading-subtitle !text-start">GET IN TOUCH!</h3>
                            <ul className="mt-2">
                                <p className="text-gray-300 font-normal text-sm">
                                    Every Single Updates and Notifications
                                </p>
                                <div className="mt-3">
                                    <input
                                        placeholder="Your Email"
                                        className="input-elem bg-transparent !border-primary outline-none"
                                        onChange={()=>{}}  />
                                    <button className="btn btn-primary mt-4 ">Subscribe</button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="bg-primary2 py-4">
                <div className="container-2 flex flex-col md:flex-row text-center md:text-start gap-4 md:gap-4 justify-between text-white">
                    <h3>Kotha</h3>
                    <p>Copyright © {new Date().getFullYear()}  All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;