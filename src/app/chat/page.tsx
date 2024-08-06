"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MsgCard from "./components/msgCard";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import IconButton from "@mui/material/IconButton";
import MicIcon from '@mui/icons-material/Mic';


export default function Component() {
    const [messages, setMessages] = useState([
        { text: "Hello, how are you?", sender: "user" },
        { text: "I'm fine, thanks for asking!", sender: "receiver" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isListening, setIsListening] = useState(false);
   

  useEffect(() => {
    let recognitionInstance;

    const startSpeechRecognition = () => {
      recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setNewMessage((prevMessage) => prevMessage + ' ' + result);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionInstance.start();
      setIsListening(true);
    };

    const stopSpeechRecognition = () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
        setIsListening(false);
      }
    };

    if (isListening) {
      startSpeechRecognition();
    } else if (recognitionInstance) {
      stopSpeechRecognition();
    }

    return () => {
      if (recognitionInstance) {
        stopSpeechRecognition();
      }
    };
  }, [isListening]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([
                ...messages,
                { text: newMessage, sender: "user" },
            ]);
            // call the api for posting in the messages table and the chatbot backend
            // 2 apis : 1 for storing in chat table async and 1 for fetching the response from the bot asyc(await for the output)
            setNewMessage("");
            // You can send the message to the backend here
        }
    };

    const iconColor = isListening ? 'green' : 'initial';
    const iconStyle = {
        padding: '20px',
        margin: '10px',
        color: iconColor,
      };

    return (
        <div key="1" className="flex w-screen bg-white dark:bg-zinc-800">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] rounded-lg border"
            >
                <ResizablePanel defaultSize={20} maxSize={25} minSize={17}>
                    <div className="overflow-y-scroll max-h-screen">
                        <aside className="w-auto border-r dark:border-zinc-700 items-start overflow-y-scroll">
                            <div className="overflow-scroll">
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold">
                                            Messages
                                        </h2>
                                        <Button size="icon" variant="ghost">
                                            <PencilIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                    <div className="flex w-full max-w-sm items-start space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Search messages..."
                                        />
                                        <Button
                                            variant="secondary"
                                            type="submit"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>
                                <div className="overflow-scroll flex flex-col p-4 space-y-3 max-h-fit">
                                    {messages.map((message, index) => (
                                        <MsgCard
                                            key={index}                          
                                            message={message.text}
                                            sender={message.sender}
                                        />
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={80}>
                    <section className="flex flex-col w-full h-full">
                        <header className="border-b dark:border-zinc-700 p-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Avatar className="relative overflow-visible w-10 h-10">
                                    <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600" />
                                    <AvatarImage
                                        alt="User Avatar"
                                        src="/placeholder-avatar.jpg"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div>
                                    Contact Names
                                    <span className="text-xs text-green-600 block">
                                        Online
                                    </span>
                                </div>
                            </h2>
                        </header>
                        <main className="flex-1 overflow-auto p-4">
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={
                                            message.sender !== "user"
                                                ? "flex items-end gap-2"
                                                : "flex items-end gap-2 justify-end"
                                        }
                                    >
                                        <div
                                            className={
                                                message.sender === "user"
                                                    ? "rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2"
                                                    : "rounded-lg bg-blue-500 text-white p-2"
                                            }
                                        >
                                            <p className="text-sm">
                                                {message.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                        <footer className="border-t dark:border-zinc-700 p-4">
                            <div className="flex items-center gap-2">
                            <IconButton
                        style = {iconStyle}
                        onClick={() => setIsListening((prev) => !prev)}
                    >
                        <MicIcon />
                    </IconButton>
                                <Input
                                    className="flex-1"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                />
                                <Button onClick={handleSendMessage}>
                                    Send
                                </Button>
                            </div>
                        </footer>
                    </section>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

function PencilIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    );
}

function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

