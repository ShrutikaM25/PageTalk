import { Image } from "@nextui-org/react";

interface Props {
    message: string;
    profileImage: string;
    altText: string;
    color: "sender" | "receiver";
}

const Component: React.FC<Props> = ({
    message = "Can be verified on any platform using docker",
    profileImage = "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
    altText = "My profile",
    color = "sender",
}) => {
    return color === "receiver" ? (
        <div className="flex items-end justify-start">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        {message}
                    </span>
                </div>
            </div>
            <Image
                src={profileImage}
                alt={altText}
                className="w-6 h-6 rounded-full order-2"
            />
        </div>
    ) : (
        <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2  items-end">
                <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        {message}
                    </span>
                </div>
            </div>
            <Image
                src={profileImage}
                alt={altText}
                className="w-6 h-6 rounded-full"
            />
        </div>
    );
};

export default Component;
