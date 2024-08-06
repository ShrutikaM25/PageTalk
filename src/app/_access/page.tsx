"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";

import { setItem } from "@/lib/localStorageControl";
import { useAppContext } from "@/state/appState";

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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const signInSchema = z.object({
    email: z.string().email().default(""),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .default(""),
});

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(3, {
                message: "Username must be at least 3 characters.",
            })
            .default(""),
        first_name: z
            .string()
            .min(3, {
                message: "First name must be at least 3 characters.",
            })
            .default(""),
        last_name: z.string().default(""), // optional
        email: z.string().email().default(""),
        phone: z
            .string()
            .min(10, {
                message: "Phone number must be at least 10 digits.",
            })
            .default(""),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters.",
            })
            .default(""),
        reenterPassword: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters.",
            })
            .default(""),
    })
    .refine((data) => data.reenterPassword === data.password, {
        message: "Passwords do not match",
        path: ["reenterPassword"],
    });

function getSchema(isLogin: boolean) {
    if (isLogin) {
        return signInSchema; // Make other fields optional for Sign In
    } else return signUpSchema; // All fields mandatory for Sign Up
}

export default function Access() {
    const [isLogin, setIsLogin] = useState(true);
    let currentSchema = getSchema(isLogin);
    const apiName = "user";

    const form = useForm<z.infer<typeof currentSchema>>({
        resolver: zodResolver(currentSchema),
    });

    async function onSubmit(values: z.infer<typeof currentSchema>) {
        // console.log(values);
        if (isLogin) {
            fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
                .then(async (res) => {
                    const responseData = await res.json();
                    console.log(responseData);
                    const email = responseData.user.email;
                    const phone = responseData.user.phone;
                    const access_token = responseData.session.access_token;

                    

                    // dispatch({
                    //     type: "UPDATE_USER_DETAILS",
                    //     payload: {
                    //         username,
                    //         email,
                    //         first_name,
                    //         last_name,
                    //         phone,
                    //         authToken,
                    //     },
                    // });
                    // router.replace("/home");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // ApiService.post(`${apiName}/${values.username}`, values).then(
            //     (res) => {
            //         console.log(res);
            //         router.replace("/home");
            //     }
            // );
        }
        // const response = await fetch("/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(values),
        // });
    }

    const { dispatch } = useAppContext();
    const router = useRouter();

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-5 py-10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
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
                                <TabsTrigger value="login">Log In</TabsTrigger>
                                <TabsTrigger value="signup">
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Log In</CardTitle>
                                        <CardDescription>
                                            Log into your existing account to
                                            use PageTalk.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit">Log In</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="signup">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Sign Up</CardTitle>
                                        <CardDescription>
                                            Create an account to access all the
                                            features of PageTalk.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Username
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            First Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Last Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Phone
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
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
                                            control={form.control}
                                            name="reenterPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-1">
                                                        <FormLabel>
                                                            Re-enter Password
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
                                        <Button type="submit">Sign Up</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </form>
                </Form>
            </div>
        </div>
    );
}
