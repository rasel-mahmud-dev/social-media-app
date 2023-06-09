import React from "react";
import {useNavigate} from "react-router-dom";


import {bgPhone, email, max, min, required, text, tuple, validate} from "src/utils/validator.js";

import ErrorMessage from "components/ErrorMessage/ErrorMessage.jsx";
import {useDispatch} from "react-redux"
import Input from "components/Shared/Input/Input.jsx";
import Button from "components/Shared/Button/Button.jsx";
import Radio from "components/Shared/Input/Radio.jsx";
import {MoonLoader} from "react-spinners";
import {loginOrRegistrationAction} from "src/store/actions/authAction.js";
import {TiTimes} from "react-icons/ti";


const Registration = (props) => {

    const {onToggleRegistrationModal, onClose} = props

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const [errorMessage, setErrorMessage] = React.useState("")

    const [isPending, setPending] = React.useState(false)

    const [step, setStep] = React.useState(1)

    const [userData, setUserData] = React.useState({
        firstName: {value: "rasel", touch: false, errorMessage: ""},
        lastName: {value: "dev", touch: false, errorMessage: ""},
        emailPhone: {value: "rasel.code.dev@gmail.com", touch: false, errorMessage: "", isMail: false},
        birthDay: {value: "2022-06-16", touch: false, errorMessage: ""},
        gender: {value: "", touch: false, errorMessage: ""},
        password: {value: "", touch: false, errorMessage: ""},
        confirmPassword: {value: "", touch: false, errorMessage: ""},
    })

    const schema = {
        firstName: {
            text: text(),
            max: max(50),
            min: min(3),
            required: required(),
        },
        lastName: {
            text: text(),
            max: max(30),
            min: min(3),
            required: required(),
        },
        gender: {
            tuple: tuple(["male", "female"]),
        },

        birthDay: {
            required: required(),
        },
        password: {
            max: max(30),
            min: min(3),
            required: required(),
        },
        confirmPassword: {
            max: max(30),
            min: min(3),
            required: required(),
        }

    }

    function handleChange(e) {
        const {name, value} = e.target

        let updatedUserData = {...userData}

        if (name === "emailPhone") {
            let errorMessage = {};
            let isMail = !!isNaN(Number(value))
            if (isMail) {
                errorMessage = email()(name, value)
            } else {
                errorMessage = bgPhone()(name, value)
            }

            updatedUserData[name] = {
                value,
                touch: true,
                errorMessage: (errorMessage && errorMessage.emailPhone) ? errorMessage.emailPhone : "",
                isMail: isMail
            }

        } else {
            let error = validate(name, value, schema)
            updatedUserData[name] = {
                value,
                touch: true,
                errorMessage: error ? error[name] : ""
            }
        }

        setUserData(updatedUserData)
    }

    function handleStepBack() {
        if (errorMessage) {
            setErrorMessage("")
        }
        setStep(1)
    }

    function handleSubmit(e) {

        e.preventDefault && e.preventDefault()
        isPending && setPending(false)
        if (errorMessage) {
            setErrorMessage("")
        }

        let alertErrorMessage = ""
        let complete = true;
        for (const userDataKey in userData) {
            if (userData[userDataKey] && userData[userDataKey].errorMessage) {
                complete = false
                alertErrorMessage = userData[userDataKey].errorMessage
            }
        }

        if (!complete) {
            return setErrorMessage(alertErrorMessage)
        }

        let valData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            birthDay: userData.birthDay
        }
        if (step !== 1) {
            valData.password = userData.password
            valData.confirmPassword = userData.confirmPassword
        }

        let errors = validate("", valData, schema, false)


        let result = {
            ...userData
        }

        if (errors) {
            for (let errorsKey in errors) {
                result[errorsKey] = {
                    value: userData[errorsKey].value,
                    errorMessage: errors[errorsKey],
                    touch: true
                }
            }
            return setUserData(result)
        }

        if (step === 2) {
            if (userData.password.value !== userData.confirmPassword.value) {
                setErrorMessage("password not matched")
                return;
            }

            setPending(true)

            let payload = {
                firstName: userData.firstName.value,
                lastName: userData.lastName.value,
                gender: userData.gender.value,
                birthday: userData.birthDay.value,
                password: userData.password.value
            }


            if (userData.emailPhone) {
                let isMail = !!isNaN(Number(userData.emailPhone.value))
                if (isMail) {
                    payload.email = userData.emailPhone.value
                } else {
                    payload.phone = userData.emailPhone.value
                }
            }

            let formData = new FormData()
            for (let payloadKey in payload) {
                formData.append(payloadKey, payload[payloadKey])
            }


            dispatch(loginOrRegistrationAction({
                type: "registration",
                data: formData
            })).unwrap().then(()=>{
                navigate("/")
            }).catch((message)=>{
                setErrorMessage(message)
            }).finally(()=>{
                setPending(false)
            })


        } else {
            setStep(2)
        }

    }

    function sendAccountActiveMail() {
        return (
            <div>
                <div>
                    {/*<p className="para">We send a mail to <span className="text-blue-400">{userData.email.value}</span></p>*/}
                    {/*<p className="para">please check your mailbox and click there to validate your mail</p>*/}

                    <h4 className="font-medium mb-3 mt-4 color_h3">Next time login you can set a password</h4>
                    <Input
                        onChange={handleChange}
                        value={userData.password.value}
                        // placeholder="Enter Password."
                        name="password"
                        type="password"
                        label="Password"
                        errorMessage={(userData.password.touch && userData.password.errorMessage) ? userData.password.errorMessage : ""}
                    />
                    <Input
                        onChange={handleChange}
                        value={userData.confirmPassword.value}
                        type="password"
                        // placeholder="Confirm Password."
                        name="confirmPassword"
                        label="Confirm Password"
                        errorMessage={(userData.confirmPassword.touch && userData.confirmPassword.errorMessage) ? userData.confirmPassword.errorMessage : ""}
                    />

                    <div>
                        <button type="button" onClick={handleStepBack}
                                className="mr-2 btn btn-primary px-8">Back</button>
                        <button type="submit"
                                className={["btn btn-primary px-8", isPending ? "btn-disable" : ""].join(" ")}>
                            Registration</button>
                    </div>

                </div>
            </div>
        )
    }

    function basicInfo() {
        return (
            <div>
                <Input
                    onChange={handleChange}
                    value={userData.emailPhone.value}
                    // placeholder="Enter First Name."
                    name="emailPhone"
                    label="Email Or Phone"
                    errorMessage={(userData.emailPhone.touch && userData.emailPhone.errorMessage) ? userData.emailPhone.errorMessage : ""}
                />

                <Input
                    onChange={handleChange}
                    value={userData.firstName.value}
                    // placeholder="Enter First Name."
                    name="firstName"
                    label="First Name"
                    errorMessage={(userData.firstName.touch && userData.firstName.errorMessage) ? userData.firstName.errorMessage : ""}
                />

                <Input
                    onChange={handleChange}
                    value={userData.lastName.value}
                    // placeholder="Enter First Name."
                    name="lastName"
                    label="Last Name"
                    errorMessage={(userData.lastName.touch && userData.lastName.errorMessage) ? userData.lastName.errorMessage : ""}
                />


                <Input
                    onChange={handleChange}
                    value={userData.birthDay.value}
                    // placeholder="Enter First Name."
                    name="birthDay"
                    label="Date of Birthday"
                    errorMessage={(userData.birthDay.touch && userData.birthDay.errorMessage) ? userData.birthDay.errorMessage : ""}
                    type="date"
                />

                <div className="mt-4 mb-3">
                    <label className="font-medium min-w-100px mb-[5px] block text-base font-400 text-gray-dark-4"
                           htmlFor="">Gender</label>
                    <Radio
                        onChange={handleChange}
                        value={userData.gender.value}
                        className="flex"
                        // placeholder="Enter First Name."
                        name="gender"
                        label="female"
                    />

                    <Radio
                        onChange={handleChange}
                        value={userData.gender.value}
                        className="flex"
                        // placeholder="Enter First Name."
                        name="gender"
                        label="male"
                    />
                    <span
                        className="input--error_message">{userData.gender.touch && userData.gender.errorMessage ? userData.gender.errorMessage : ""}</span>
                </div>

                <div className="mt-2 mb-3 ">

                    <h4 className="text-sm font-400">Already have a account?
                        <span onClick={() => onToggleRegistrationModal(false)}
                              className="cursor-pointer text-blue-400 p-px ml-0.5 ">Click</span>
                        Login Page </h4>
                </div>
                <div>
                    <Button type="submit" className="bg-primary rounded px-8 py-1">Continue</Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="max-w-2xl  mx-auto">
                <TiTimes className="fixed top-5 right-5 " onClick={onClose} />
                <div className="">
                    <div className="px-6 py-4  max-w-xl mx-auto rounded-xl">
                        <h1 className="text-3xl font-bold color_h1  text-center">Create a new account.</h1>
                        <form onSubmit={handleSubmit} className="py-5">


                            {isPending && <div className="flex justify-center">
                                <MoonLoader size="20"/>
                            </div>}

                            <ErrorMessage errorMessage={errorMessage}/>


                            <div>
                                {step === 1 && basicInfo()}
                                {step === 2 && sendAccountActiveMail()}
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default Registration;
