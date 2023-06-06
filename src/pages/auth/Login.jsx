import  React, {useEffect} from "react";
import {Link} from "react-router-dom";
import api from "src/apis";
import { useDispatch } from "react-redux"

const Login = (props) => {

    const dispatch = useDispatch()

    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
    })


    function handleChange(e){
        setUserData({
            ...userData,
            [e.target.name]: e.target.value.trim()
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        let complete = true;
        for (const userDataKey in userData) {
            if(!userData[userDataKey]){
                complete = false
            }
        }
        if(complete){
            api.post("/api/login", {
                email: userData.email,
                password: userData.password,
            }).then(data=>{
                dispatch({
                    type: "LOGIN",
                    payload: {
                        ...data.data
                    }
                })
            })
        } else {
            alert("please full all field")
        }
    }

    return (
        <div>
            <div className="max-w-screen-2xl mx-auto">
                <div className="bg-white px-6 py-4 rounded-5 max-w-xl mx-auto">
                    <h1 className="text-2xl font-400 text-gray-light-7 text-center">Login in your Account.</h1>
                    <form onSubmit={handleSubmit} className="py-10">
                        <div className=" flex mb-2">
                            <label className="font-medium min-w-100px block text-sm font-400 text-gray-dark-4" htmlFor="">Email</label>
                            <input
                                onChange={handleChange}
                                value={userData.email}
                                placeholder="Enter Your Email."
                                className="input-elem" type="text" name="email" />
                        </div>
                        <div className="mb-2 flex">
                            <label className="font-medium min-w-100px block text-sm font-400 text-gray-dark-4 " htmlFor="">Password</label>
                            <input
                                onChange={handleChange}
                                value={userData.password}
                                placeholder="Enter Your Password."
                                className="w-full input-elem"
                                type="text" name="password"
                            />
                        </div>
                        <div className="mt-2 mb-3">
                            <h4 className="text-sm font-400">Not have a account?
                                <span className="cursor-pointer text-blue-400 p-px ml-0.5 "><Link to="/auth/registration">Create a account new account</Link></span></h4>
                        </div>
                        <div>
                            <button className="btn">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;