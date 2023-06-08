import React, {useReducer} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginOrRegistrationAction} from "src/store/actions/authAction.js";
import {useDispatch} from "react-redux";


const Registration = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [state, setState] = useReducer((prev, action)=>({...prev, ...action}), {
        isLoading: false,
        errorMessage: ""
    })

    function handleSubmit(e){
        e.preventDefault()

        setState({errorMessage: ""})

        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        if(!email) return setState({errorMessage: "Email Requried"})
        if(!password) return setState({errorMessage: "Password Requried"})
        if(!confirmPassword) return setState({errorMessage: "confirmPassword Requried"})
        if(!firstName) return setState({errorMessage: "firstName Requried"})
        if(!lastName) return setState({errorMessage: "lastName Requried"})

        if(password !== confirmPassword) return setState({errorMessage: "Password Does'nt match "})

        let formData = new FormData()
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("email", email)
        formData.append("password", password)

        dispatch(loginOrRegistrationAction({
            type: "registration",
            data: formData
        })).unwrap().then(()=>{
            navigate("/")
        }).catch((message)=>{
            setState({
                message: message
            })
        })

        // api.post("/api/users", {
        //     first_name: userData.firstName,
        //     last_name: userData.lastName,
        //     email: userData.email,
        //     password: userData.password,
        // }).then(data=>{
        //     console.log(data)
        // })
    }

    return (
        <div className="">
            <div className="py-20 ">
                <div className="max-w-lg mx-auto card">
                    <h1 className="text-2xl font-semibold text-center">Create a new account.</h1>

                    {state.errorMessage && (
                        <div
                            className="p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            <span className="font-medium">{state.errorMessage}</span>
                        </div>
                    )}


                    <form onSubmit={handleSubmit} className="pb-5">

                        <div className=" mb-2 ">
                            <label className="font-medium block text-sm font-400 text-gray-dark-4" htmlFor="">First Name</label>
                            <input
                                placeholder="Enter Your First Name."
                                className="input-elem" type="text" name="firstName" />
                        </div>

                        <div className=" mb-2 ">
                            <label className="font-medium block text-sm font-400 text-gray-dark-4" htmlFor="">Last Name</label>
                            <input
                                placeholder="Enter Your Last Name."
                                className="input-elem " type="text" name="lastName" />
                        </div>

                        <div className=" mb-2 ">
                            <label className="font-medium  block text-sm font-400 text-gray-dark-4" htmlFor="">Email</label>
                            <input
                                placeholder="Enter Your Email."
                                className="input-elem "
                                type="email" name="email" />
                        </div>
                        <div  className=" mb-2 ">
                            <label className="font-medium  block text-sm font-400 text-gray-dark-4 " htmlFor="">Password</label>
                            <input

                                placeholder="Enter Your Password."
                                className="input-elem "
                                type="text" name="password"
                            />
                        </div>
                        <div  className=" mb-2 ">
                            <label className="font-medium  block text-sm font-400 text-gray-dark-4" htmlFor="confirmPassword">Confirm Password</label>
                            <input

                                placeholder="Enter Your Password."
                                className="input-elem "
                                type="text" name="confirmPassword"
                            />
                        </div>
                        <div className="mt-2 mb-3">
                            <h4 className="text-sm font-400">Already have a account?
                                <span className="cursor-pointer text-blue-400 p-px ml-0.5 "><Link to="/login">Click</Link></span>
                                Login Page </h4>

                        </div>
                        <div>
                            <button className="btn btn-primary  text-sm  cursor-pointer">Registration</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Registration;