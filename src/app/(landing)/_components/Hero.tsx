"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@nextui-org/react";

const Component: React.FC = () => {
    return (
        <>
            <div className="max-x-3xl space-y-4">
                <h1 className="text-3xl md:text-5xl sm:text-4xl font-bold tracking-tight">
                    Document Reading, <span className="highlight text-white text">Redefined.</span><br></br> Welcome to{" "}
                    <span className="hover-2">PageTalk</span>.
                </h1>
                <h3 className="text-base sm:text-xl md:text-xl font-light tracking-tight">
                    PageTalk is a connected workspace powered by AI where better
                    and faster work happens
                </h3>
                <Link href="/login">
                    <Button>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center max-w-5xl">
                <div className="flex items-center">
                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                        <Image
                            src="/MessyDoodle_dark.svg"
                            fill
                            className="object-contain dark:hidden"
                            alt="Documents"
                        />
                        <Image
                            src="/MessyDoodle_light.svg"
                            fill
                            className="object-contain hidden dark:block"
                            alt="Documents"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Component;
