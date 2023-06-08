import React, {useReducer} from "react";
import {Link, useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux"
import {loginOrRegistrationAction} from "src/store/actions/authAction.js";

const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();


    const [state, setState] = useReducer((prev, action) => ({...prev, ...action}), {
        isLoading: false,
        errorMessage: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        setState({errorMessage: ""})

        const email = e.target.email.value
        const password = e.target.password.value

        if (!email) return setState({errorMessage: "Email Requried"})
        if (!password) return setState({errorMessage: "Password Requried"})


        dispatch(loginOrRegistrationAction({
            type: "login",
            data: {
                email, password,
            }
        })).unwrap().then(()=>{
            navigate("/")
        }).catch((message)=>{
            setState({
                errorMessage: message
            })
        })


    }

    return (
        <div className="py-20 pb-72">
            <div className="max-w-lg mx-auto card">
                <div className="">
                    <h1 className="text-2xl font-semibold text-center">Login in your Account.</h1>

                    {state.errorMessage && (
                        <div
                            className="p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            <span className="font-medium">{state.errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="pb-5">
                        <div className="mb-4">
                            <label className="font-medium  block w-full text-sm font-400 text-gray-dark-4"
                                   htmlFor="">Email</label>
                            <input
                                placeholder="Enter Your Email."
                                className="input-elem" type="text" name="email"/>
                        </div>
                        <div className="mb-2 ">
                            <label className="font-medium  block text-sm font-400 text-gray-dark-4 "
                                   htmlFor="">Password</label>
                            <input
                                placeholder="Enter Your Password."
                                className=" input-elem"
                                type="text" name="password"
                            />
                        </div>
                        <div className="mb-6">
                            <h4 className="text-sm font-400">Not have a account?
                                <span className="cursor-pointer text-blue-400 p-px ml-0.5 "><Link to="/registration">Create a account new account</Link></span>
                            </h4>
                        </div>
                        <div>
                            <button className="btn btn-primary ">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};


export default Login;