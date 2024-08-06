import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    if (!user) {
        console.log("Login first");
        return <a href="/login" className="flex flex-col h-screen">Login First</a>
    }
    return <div>{children}</div>;
}
