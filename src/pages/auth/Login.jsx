import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux"

import Input from "components/Shared/Input/Input.jsx";
import Button from "components/Shared/Button/Button.jsx";

import {bgPhone, email, max, min, required, validate} from "src/utils/validator.js";

import apis from "src/apis";

import errorResponse from "src/utils/errorResponse.js";


import "./Login.scss"


import ErrorMessage from "components/ErrorMessage/ErrorMessage.jsx";
import Footer from "components/footer/Footer";
import Loading from "components/Shared/Loading/Loading.jsx";
import {loginOrRegistrationAction} from "src/store/actions/authAction.js";


const Login = (props) => {

    // const schema = Joi.object({
    //   email: Joi.string().min(3).max(30).required(),
    //   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // })


    const [isPending, setPending] = React.useState(false)

    const {afterRedirect} = props

    let navigate = useNavigate()

    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = React.useState("")
    const [newAccountForm, setNewAccountForm] = React.useState(false)

    const [userData, setUserData] = React.useState({
        emailPhone: {value: "rasel@gmail.com", touch: false, errorMessage: "", isMail: true},
        password: {value: "123", touch: false, errorMessage: ""},
    })

    const schema = {
        emailPhone: {
            max: max(50),
            min: min(5),
            required: required(),
        },
        password: {
            max: max(30),
            min: min(3),
            required: required(),
        }
    }


    function handleChange(e) {
        const {name, value} = e.target


        let error = validate(name, value, schema)
        let a = {
            ...userData,
            [name]: {
                value,
                touch: true,
                errorMessage: error ? error[name] : ""
            }
        }
        if (name === "emailPhone") {


            let errorMessage = {};
            let isMail = !!isNaN(Number(value))
            if (isMail) {
                errorMessage = email()(name, value)
            } else {
                errorMessage = bgPhone()(name, value)
            }

            a = {
                ...a,
                [name]: {
                    value,
                    touch: true,
                    errorMessage: (errorMessage && errorMessage.emailPhone) ? errorMessage.emailPhone : "",
                    isMail: isMail
                }
            }
        }
        setUserData(a)
    }

    function handleSubmit(e) {
        e.preventDefault()

        errorMessage && setErrorMessage("")
        isPending && setPending(false)

        let errMessage = ""

        let allOk = true
        for (let userDataKey in userData) {
            if (userData[userDataKey].errorMessage) {
                allOk = false
                errMessage = userData[userDataKey].errorMessage
                break;
            }
        }


        if (!allOk) {
            setErrorMessage(errMessage)
            return;
        }

        setPending(true)

        let payload = {}

        if (userData.emailPhone) {
            if (!userData.emailPhone.isMail) {
                payload.phone = userData.emailPhone.value
            } else {
                payload.email = userData.emailPhone.value
            }
        }

        dispatch(loginOrRegistrationAction({
            type: "login",
            data: {
                ...payload,
                password: userData.password.value

            }
        })).unwrap().then(()=>{
            // navigate("/")
        }).catch((message)=>{
            // setState({
            //     errorMessage: message
            // })
        })


        /*apis.post("/api/login", {
            ...payload,
            password: userData.password.value,
        }).then(response => {
            if (response.status === 201) {
                setPending(false)
                // dispatch<LoginAction>(loginHandlerAction(response.data))
                // navigate("/")
            }
        }).catch(ex => {
            setPending(false)
            setErrorMessage(errorResponse(ex))
        })*/
    }


    function toggleRegistrationModal(isOpen) {
        setNewAccountForm(isOpen)
        // dispatch({
        //   type: ActionTypes.TOGGLE_BACKDROP,
        //   payload: {
        //     isOpen: isOpen,
        //     where: "content",
        //     message: "registration",
        //   }
        // })
    }

    return (
        <div>
            <div className="container-1200 ">
                <div className="align-middle-vh">
                    <div className="registration-form-popup">
                        {/*<Modal className="registration-form_modal" inProp={newAccountForm} >*/}
                        {/*  <div className="max-w-4xl mx-auto sm:shadow-b relative  bg-white/90 p-4 rounded-lg mx-auto  w-full mx-auto rounded">*/}
                        {/*  <FontAwesomeIcon onClick={()=>toggleRegistrationModal(false)} icon={faTimes} className="font-xl absolute top-5 right-5" />*/}
                        {/*  <Registration onToggleRegistrationModal={toggleRegistrationModal} />*/}
                        {/*  </div>*/}
                        {/*</Modal>*/}
                    </div>

                    <div className="flex items-center justify-center flex-col sm:flex-row">
                        <div>
                            <h1 className="font-bold mt-4 text-2xl sm:text-4xl text-primary">Facebook3.0</h1>
                            <h3 className="font-medium mt-3 max-w-sm text-lg text-dark-300">Facebook3.0 helps you
                                contact and share with the people in your life</h3>
                        </div>
                        <div className="sm:w-auto w-full">
                            <div className="sm:px-6">
                                <div className=" sm:mt-0 mt-8">

                                    <div
                                        className="sm:shadow-b   bg-white p-4 rounded-lg mx-auto sm:w-[400px] w-full mx-auto rounded">

                                        <form onSubmit={handleSubmit} className="w-full flex-1">

                                            {isPending && <div className="flex justify-center">
                                                <Loading/>
                                            </div>}


                                            <ErrorMessage errorMessage={errorMessage}/>

                                            <Input
                                                onChange={handleChange}
                                                value={userData.emailPhone.value}
                                                // placeholder="Enter Your Email."
                                                name="emailPhone"
                                                label="Email or Phone"
                                                errorMessage={(userData.emailPhone.touch && userData.emailPhone.errorMessage) ? userData.emailPhone.errorMessage : ""}
                                            />

                                            <Input
                                                onChange={handleChange}
                                                value={userData.password.value}
                                                // placeholder="Enter Your Password."
                                                name="password"
                                                label="Password"
                                                type="password"
                                                errorMessage={(userData.password.touch && userData.password.errorMessage) ? userData.password.errorMessage : ""}
                                            />

                                            <Button type="submit"
                                                    className={["bg-primary w-full font-medium rounded py-1", isPending ? "btn-disable" : ""].join(" ")}>Login</Button>
                                            <span className="mt-3 block text-center ">
                                              <Link className="text-blue-500 text-sm " to="/auth/registration">Forget Password?</Link>
                                             </span>
                                            <div className="border border-1 border-[#e4e4e4] my-4"></div>

                                            <div className="mt-2 mb-3">
                                                <Button onClick={() => toggleRegistrationModal(true)}
                                                        className="bg-secondary-400 px-4 py-1 font-medium mx-auto block">Create
                                                    Account</Button>

                                            </div>
                                            <div>


                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default Login;