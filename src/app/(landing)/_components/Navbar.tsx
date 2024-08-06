"use client";

import { useScrollTop } from "@/config/hooks/use-scroll-top";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Component: React.FC = () => {
    const scrolled = useScrollTop();
    return (
        <div
            className={cn(
                "z-50 fixed bg-background min-h-unit-24 flex justify-start items-center w-full backdrop:blur-10",
                scrolled && "border-b shadow-sm"
            )}
        >
            <Image
                src="/PageTalk_Logo.svg"
                fill
                className="object-contain justify-start"
                alt="Documents"
            />
        </div>
    );
};

export default Component;
