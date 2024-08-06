import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().email().default(""),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .default(""),
});

export const signUpSchema = z
    .object({
        email: z.string().email().default(""),
        name: z.string().min(3).default(""),
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
