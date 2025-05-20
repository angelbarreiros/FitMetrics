import { X } from "lucide-react";
import React, { useState } from "react";

type ModalOpenerProps = {
    children: React.ReactNode;
    buttonLabel: string;
};

export const ModalOpener = ({ children, buttonLabel }: ModalOpenerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleOpen}
            >
                {buttonLabel}
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-text opacity-15"></div>
                    <div className="relative bg-primary rounded-lg p-6 min-w-[300px] min-h-[150px] shadow-lg opacity-100">
                        <button
                            className="bg-primary absolute top-2 right-2 text-2xl text-text hover:text-secundary"
                            onClick={handleClose}
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalOpener;
