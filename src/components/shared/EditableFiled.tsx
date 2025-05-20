import React, { useState, useRef } from "react";
import { Pencil, X } from "lucide-react";

interface EditableFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (newValue: string) => void;
    name?: string;
    placeholder?: string;
}

export const EditableField = ({ label, value, onChange, type, name, placeholder }: EditableFieldProps) => {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleCancelClick = () => {
        setInputValue(value);
        setEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-xl text-primary/70">
                {label}:
            </label>
            <div className="flex items-center gap-2">
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type={type}
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={!editing}
                    placeholder={placeholder}
                    className={`flex-1 px-4 py-2 text-primary text-md border border-secundary rounded-default transition 
                        ${editing ? " bg-white outline-0" : " bg-transparent outline-none"}
                        `}
                />
                {editing ? (
                    <button
                        type="button"
                        aria-label="Cancel editing"
                        onClick={handleCancelClick}
                        className="bg-none border-none cursor-pointer  text-primary"
                    >
                        <X size={18} />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="Edit field"
                        onClick={handleEditClick}
                        className="bg-none border-none cursor-pointer  text-primary"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditableField;
