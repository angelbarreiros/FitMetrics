import { X, type LucideIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalOpenerProps = {
    children: React.ReactNode | ((closeModal: () => void) => React.ReactNode);
    buttonLabel: string;
    Icon: LucideIcon
};

export const ModalOpener = ({ children, buttonLabel, Icon }: ModalOpenerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            // Find the first input element inside the modal
            const input = modalRef.current.querySelector<HTMLElement>(
                'input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            input?.focus();
        }
    }, [isOpen]);

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div
                ref={modalRef}
                className="relative bg-primary text-white rounded-lg p-6 min-w-[300px] min-h-[150px] shadow-lg z-10"
            >
                <button
                    className="absolute top-2 right-2 text-white hover:text-secundary"
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>
                {typeof children === 'function' ? children(handleClose) : children}
            </div>
        </div>
    );

    return (
        <>
            <button
                className="bg-primary text-text px-4 py-2 rounded-default flex "
                onClick={handleOpen}
            >
                <Icon className="w-6 h-6" />
                {buttonLabel}
            </button>
            {isOpen && typeof window !== "undefined" &&
                createPortal(
                    modalContent,
                    document.body
                )
            }
        </>
    );
};

export default ModalOpener;