"use client";

import { useReducer } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/oldcomponents/Navbar";

import { setItem } from "@/lib/localStorageControl";
import { ApiService } from "@/config/api/ApiService";
import { useAppContext } from "@/state/appState";

enum ActionType {
    TOGGLE_LOGIN = "TOGGLE_LOGIN",
    SET_FORM_DATA = "SET_FORM_DATA",
    SET_PASSWORD_MISMATCH = "SET_PASSWORD_MISMATCH",
    SET_INVALID_EMAIL = "SET_INVALID_EMAIL",
    SET_INVALID_PASSWORD = "SET_INVALID_PASSWORD",
    SET_ERROR_TEXT = "SET_ERROR_TEXT",
}

interface Action {
    type: ActionType;
    payload?: any;
}

interface FormData {
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: number;
    reenterPassword: string;
    apiName: string;
}

const initialState: {
    isLogin: boolean;
    formData: FormData;
    passwordMismatch: boolean;
    invalidEmail: boolean;
    invalidPassword: boolean;
    errorText: string;
} = {
    isLogin: true,
    formData: {
        email: "",
        password: "",
        username: "",
        first_name: "",
        last_name: "",
        phone: 0,
        reenterPassword: "",
        apiName: "user",
    },
    passwordMismatch: false,
    invalidEmail: false,
    invalidPassword: false,
    errorText: "",
};

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case ActionType.TOGGLE_LOGIN:
            return { ...state, isLogin: !state.isLogin };
        case ActionType.SET_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, ...action.payload },
            };
        case ActionType.SET_PASSWORD_MISMATCH:
            return { ...state, passwordMismatch: action.payload };
        case ActionType.SET_INVALID_EMAIL:
            return { ...state, invalidEmail: action.payload };
        case ActionType.SET_INVALID_PASSWORD:
            return { ...state, invalidPassword: action.payload };
        case ActionType.SET_ERROR_TEXT:
            return { ...state, errorText: action.payload };
        default:
            return state;
    }
};

export default function Login() {
    const [state, localDispatch] = useReducer(reducer, initialState);

    const {
        isLogin,
        formData,
        passwordMismatch,
        invalidEmail,
        invalidPassword,
        errorText,
    } = state;

    const { dispatch } = useAppContext();

    const router = useRouter();

    const handleSignIn = () => {
        localDispatch({ type: ActionType.TOGGLE_LOGIN });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            ApiService.post(`${formData.apiName}/login`, formData)
                .then((res) => {
                    const authToken = res.data.authToken;
                    setItem("authToken", authToken);
                    setItem("username", res.data.username);
                    setItem("email", res.data.email);
                    setItem("first_name", res.data.first_name);
                    setItem("last_name", res.data.last_name);
                    setItem("phone", res.data.phone);

                    const { apiName, reenterPassword, ...remFormData } =
                        formData;
                    dispatch({
                        type: "UPDATE_USER_DETAILS",
                        payload: { ...remFormData, authToken },
                    });
                    router.replace("/home");
                })
                .catch((err) => {
                    localDispatch({
                        type: ActionType.SET_PASSWORD_MISMATCH,
                        payload: true,
                    });
                    localDispatch({
                        type: ActionType.SET_ERROR_TEXT,
                        payload: "Invalid username or password.",
                    });
                });
        } else {
            if (formData.password === formData.reenterPassword) {
                localDispatch({
                    type: ActionType.SET_PASSWORD_MISMATCH,
                    payload: false,
                });
                if (isValidEmail(formData.email)) {
                    localDispatch({
                        type: ActionType.SET_INVALID_EMAIL,
                        payload: false,
                    });
                    console.log(formData);
                    ApiService.post(
                        `${formData.apiName}/${formData.username}`,
                        formData
                    ).then((res) => {
                        console.log(res);

                        router.replace("/home");
                    });
                } else {
                    // Invalid email
                    localDispatch({
                        type: ActionType.SET_INVALID_EMAIL,
                        payload: true,
                    });
                }
            } else {
                // Passwords don't match
                localDispatch({
                    type: ActionType.SET_PASSWORD_MISMATCH,
                    payload: true,
                });
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        localDispatch({
            type: ActionType.SET_FORM_DATA,
            payload: { [name]: value },
        });
    };

    const isValidEmail = (email: string) => {
        // Basic email validation using regex
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <Card className="w-[400px]">
                    <CardHeader className="flex flex-col gap-3 pt-10">
                        {/* <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        /> */}
                        <div className="flex flex-col text-center">
                            <p className="text-md">PageTalk</p>
                            <p className="text-small text-default-500">
                                {isLogin ? "Login" : "Sign Up"}
                            </p>
                        </div>
                    </CardHeader>

                    <div className="max-h-[60vh] overflow-y-auto">
                        <form onSubmit={handleFormSubmit}>
                            {isLogin ? (
                                <CardBody className="items-center flex flex-col gap-3">
                                    <Input
                                        type="text"
                                        label="Username"
                                        className="w-[300px]"
                                        name="username"
                                        isInvalid={invalidPassword}
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="password"
                                        label="Password"
                                        className="w-[300px]"
                                        name="password"
                                        isInvalid={invalidPassword}
                                        errorMessage={errorText}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <Button color="primary" type="submit">
                                        <p className="text-white">Sign In</p>
                                    </Button>
                                    <Link href="/">
                                        <p className="text-small text-default-500">
                                            Forgot password?
                                        </p>
                                    </Link>
                                    <p
                                        className="text-small text-primary hover:cursor-pointer"
                                        onClick={handleSignIn}
                                    >
                                        New User? Sign Up
                                    </p>
                                </CardBody>
                            ) : (
                                <CardBody className="items-center flex flex-col gap-3">
                                    <Input
                                        type="text"
                                        label="Username"
                                        className="w-[300px]"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="text"
                                        label="First Name"
                                        className="w-[300px]"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        className="w-[300px]"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="email"
                                        label="Email"
                                        className="w-[300px]"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="phone"
                                        label="Phone"
                                        className="w-[300px]"
                                        name="phone"
                                        value={
                                            formData.phone == 0
                                                ? ""
                                                : formData.phone.toString()
                                        }
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="password"
                                        label="Password"
                                        className="w-[300px]"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="password"
                                        label="Re-enter Password"
                                        className="w-[300px]"
                                        name="reenterPassword"
                                        value={formData.reenterPassword}
                                        onChange={handleInputChange}
                                    />
                                    {passwordMismatch && (
                                        <p className="text-small text-danger">
                                            Passwords do not match.
                                        </p>
                                    )}
                                    {invalidEmail && (
                                        <p className="text-small text-danger">
                                            Invalid email.
                                        </p>
                                    )}
                                    <Button color="primary" type="submit">
                                        <p className="text-white">Sign Up</p>
                                    </Button>
                                    <Link href="/">
                                        <p className="text-small text-default-500">
                                            Forgot password?
                                        </p>
                                    </Link>
                                    <p
                                        className="text-small text-primary hover:cursor-pointer "
                                        onClick={handleSignIn}
                                    >
                                        Existing User? Log In
                                    </p>
                                </CardBody>
                            )}
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
