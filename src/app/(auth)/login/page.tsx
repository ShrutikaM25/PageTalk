"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

import { useAppContext } from "@/state/appState";
import { setItem } from "@/lib/localStorageControl";

import { signUpInterface, signInInterface } from "@/types/auth";
import { signUpSchema, signInSchema } from "@/zod/schema";

import Navbar from "@/components/oldcomponents/Navbar";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getSchema(isLogin: boolean) {
    if (isLogin === true) {
        return signInSchema;
    } else return signUpSchema;
}

export default function Access() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);
    const [verification, setVerification] = useState(false);
    const [userDetails, setUserDetails] = useState<signUpInterface | null>(
        null
    );
    const [user, setUser] = useState<User | null>(null);
    const [otpValues, setOTPValues] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);
    const [isFilled, setIsFilled] = useState<boolean>(false);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const { dispatch } = useAppContext();

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...otpValues];
        newValues[index] = value;
        setOTPValues(newValues);
        if (
            value &&
            index < inputRefs.length - 1 &&
            inputRefs[index + 1].current
        ) {
            inputRefs[index + 1].current!.focus();
        }
    };

    let currentSchema = getSchema(isLogin);
    const loginForm = useForm<z.infer<typeof currentSchema>>({
        resolver: zodResolver(currentSchema),
    });
    const supabase = createClientComponentClient();
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof currentSchema>) => {
        if (isLogin) {
            const formData = values as signInInterface;
            const res = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (res.error) {
                console.error("Error logging in:", res.error.message);
                return;
            }
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .eq("id", res.data.user?.id);
            const payload = {
                email: data![0].email,
                name: data![0].name,
                phone: data![0].phone,
                user_id: data![0].id,
                access_token: res.data.session?.access_token!,
            };
            dispatch({
                type: "UPDATE_USER_DETAILS",
                payload: payload,
            });

            setItem("user_id", data![0].id);
            setItem("access_token", res.data.session?.access_token!);
            setItem("email", data![0].email);
            setItem("name", data![0].name);
            setItem("phone", data![0].phone.toString());
            setUser(res.data.user);
            router.replace("/home");
        } else {
            const formData = values as signUpInterface;
            await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        name: formData.name,
                        phone: formData.phone,
                    },
                },
            });
            setUserDetails(formData);
            setVerification(true);
        }
    };

    const onOTP = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = otpValues.join("");
        const res = await supabase.auth.verifyOtp({
            email: userDetails!.email,
            token,
            type: "email",
        });
        setUser(res.data.user);
        const error = res.error;
        if (error) {
            console.error("Error signing up:", error.message);
        } else {
            const { error } = await supabase.from("user").upsert([
                {
                    id: res.data.user?.id,
                    email: userDetails!.email,
                    name: userDetails!.name,
                    phone: userDetails!.phone,
                },
            ]);
            if (error) {
                console.error("Error updating user data:", error);
            } else {
                dispatch({
                    type: "UPDATE_USER_DETAILS",
                    payload: {
                        email: userDetails!.email,
                        name: userDetails!.name,
                        phone: userDetails!.phone,
                        user_id: res.data.user?.id!,
                        access_token: res.data.session?.access_token!,
                    },
                });
                setItem("user_id", res.data.user?.id!);
                setItem("access_token", res.data.session?.access_token!);
                setItem("email", userDetails!.email);
                setItem("name", userDetails!.name);
                setItem("phone", userDetails!.phone.toString());
                router.replace("/home");
            }
        }
    };

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();
    }, []);

    useEffect(() => {
        const checkAndRedirect = async () => {
            try {
                if (user) router.replace("/home");
            } catch (error) {
                console.error("Error checking and redirecting:", error);
            }
        };
        checkAndRedirect();
    });

    useEffect(() => {
        setIsFilled(otpValues.every((value) => value !== ""));
    }, [otpValues]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {loading ? (
                <Spinner color="default" />
            ) : verification ? (
                <>
                    <form onSubmit={onOTP}>
                        <Card className="w-full max-w-md mx-auto">
                            <CardHeader>
                                <CardTitle>Enter OTP</CardTitle>
                                <CardDescription>
                                    Please enter the 6-digit OTP sent to your
                                    mobile number.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-between gap-4">
                                {otpValues.map((value, index) => (
                                    <Input
                                        key={index}
                                        className="w-10 text-center"
                                        maxLength={1}
                                        value={value}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        ref={inputRefs[index]}
                                    />
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button type="submit" disabled={!isFilled}>
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </>
            ) : (
                <div className="flex-grow flex items-center justify-center px-5 py-10">
                    <Form {...loginForm}>
                        <form
                            onSubmit={loginForm.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <Tabs
                                defaultValue="login"
                                className="w-[400px]"
                                onValueChange={(_) => {
                                    setIsLogin(!isLogin);
                                    currentSchema = getSchema(isLogin);
                                }}
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="login">
                                        Log In
                                    </TabsTrigger>
                                    <TabsTrigger value="signup">
                                        Sign Up
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="login">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Log In</CardTitle>
                                            <CardDescription>
                                                Log into your existing account
                                                to use PageTalk.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <FormField
                                                control={loginForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Password
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="password"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit">
                                                Log In
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="signup">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Sign Up</CardTitle>
                                            <CardDescription>
                                                Create an account to access all
                                                the features of PageTalk.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <FormField
                                                control={loginForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Phone
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Password
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="password"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="reenterPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-1">
                                                            <FormLabel>
                                                                Re-enter
                                                                Password
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="password"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit">
                                                Sign Up
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}
