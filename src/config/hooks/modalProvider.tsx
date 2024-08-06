import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, Button } from "antd";

interface ModalContextType {
    showModal: (title: string, text: string) => void;
    handleOk: () => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");
    const [modalTitle, setModalTitle] = useState("Title of the modal");

    const showModal = (title: string, text: string) => {
        setModalText(text);
        setModalTitle(title);
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, handleOk }}>
            {children}
            {open && (
                <Modal
                    title={modalTitle}
                    visible={open} // Changed 'open' to 'visible' for Ant Design Modal
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" type="primary" onClick={handleOk}>
                            OK
                        </Button>,
                    ]}
                >
                    <p>{modalText}</p>
                </Modal>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
