import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractFileName(fullName: string): string {
    const parts = fullName.split(".");
    parts.pop();
    return parts.join(".");
}

export function extractFileNameFromPath(path: string): string {
    const parts = path.split("/");
    return parts[parts.length - 1];
}
