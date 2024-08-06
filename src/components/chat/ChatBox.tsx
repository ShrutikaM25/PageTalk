import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "antd";

const { TextArea } = Input;

interface ChatBoxProps {
    onSendMessage: (message: string) => void;
}

const Component: React.FC<ChatBoxProps> = ({ onSendMessage }) => {
    const [newMessage, setNewMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };
    return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 items-center flex flex-row gap-5">
            <TextArea
                showCount
                maxLength={100}
                style={{ height: 80, resize: "none" }}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message"
            />
            <Button color="primary" variant="solid" onClick={handleSendMessage}>
                <span className="text-white">Send</span>
            </Button>
        </div>
    );
};

export default Component;

/*

value={newMessage}
onChange={(e) => setNewMessage(e.target.value)}

*/