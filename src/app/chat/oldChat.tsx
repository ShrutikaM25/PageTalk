import { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "@nextui-org/react";

import ChatBox from "../../components/chat/ChatBox";
import ChatBubble from "../../components/chat/ChatBubble";
import ChatHeader from "../../components/chat/ChatHeader";

import { ApiService } from "@/config/api/ApiService";
import { useAppContext } from "@/state/appState";
import { Message } from "@/config/types";

const Chat = () => {
    const { state, dispatch } = useAppContext();
    const [messages, setMessages] = useState<
        { text: string; sender: "sender" | "receiver" }[]
    >([]);
    const [messageFetchInProgress, setMessageFetchInProgress] = useState(false);
    const [backendResponseInProgress, setBackendResponseInProgress] =
        useState(false);

    useEffect(() => {
        setMessageFetchInProgress(true);
        ApiService.get(`/message/${state.current_pdf_id}`).then((response) => {
            response.data.messages.map((message: Message) => {
                if (message.isModelResponse) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: message.content, sender: "receiver" },
                    ]);
                } else {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: message.content, sender: "sender" },
                    ]);
                }
            });
            setMessageFetchInProgress(false);
        });
    }, [state.current_pdf_id]);

    const addMessage = (newMessage: string) => {
        setBackendResponseInProgress(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: newMessage, sender: "sender" },
        ]);

        ApiService.post("/message/user", {
            pdf_id: state.current_pdf_id,
            content: newMessage,
        });

        ApiService.postModel("/post_data", {
            exists: "True",
            content:
                "https://storage.googleapis.com/page-talk.appspot.com/e3d0273a-3074-4384-be01-d2912363e0c9_Session-Hijacking.pdf?GoogleAccessId=firebase-adminsdk-xfipa%40page-talk.iam.gserviceaccount.com&Expires=1703186237&Signature=iBn5ifmF131B4%2FPQyWPX7a1P%2FIcaV1%2FOQ9mIAMffHgCDfBjRJfMlT6gKG%2BkWo6AdnhdbJ9aAwWqAWGFuClcvhSHGdMPg8u88wmTCAG0eK%2Bja2nA%2FOA%2FFodPYVZIZXIFudYAkzSjTf6OUgRLvmOPG8l08CQKR%2FMbKZeWXoALMquGMBUVqVvJqEG%2BeCiGXClNRumAgcIED0QgPfhaDC5uwPL5KxcWkACow%2BzgML0ZTTP9zn%2FOmuyTThZo01Dz6nqlhMunrwTGfdG8Q0Q52ALh5BZAM%2FVbMa%2F70aZbe4R%2BnzieYpO6AQeIgBBTjztCb5OTalh41ln7VcLd30UJdXnUMgQ%3D%3D",
            querry: newMessage,
        }).then(
            (response) => {
                console.log(response);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: response.data.response, sender: "receiver" },
                ]);
                setBackendResponseInProgress(false);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col w-4/5 max-w-6xl">
                <ChatHeader
                    pdf_name={state.current_pdf_name!}
                    username={state.email}
                />
                <div
                    id="messages"
                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {messageFetchInProgress && <Spinner size="lg" />}
                    {messages.map((message, index) => (
                        <ChatBubble
                            profileImage="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            key={index}
                            message={message.text}
                            color={message.sender}
                            altText="My Profile"
                        />
                    ))}
                    {backendResponseInProgress && <Spinner size="lg" />}
                    <ChatBox onSendMessage={addMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
