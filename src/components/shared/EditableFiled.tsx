import React, { useState, useRef } from "react";
import { Pencil, X } from "lucide-react";

interface EditableFieldProps {
    label: string;
    type: string;
    value: string;
    getValue: (newValue: string) => void;
    name?: string;
    placeholder?: string;
    error: string
}

export const EditableField = ({ label, value, getValue, type, name, placeholder, error }: EditableFieldProps) => {
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
        getValue(e.target.value);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-md text-secundary/70">
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
                    className={`flex-1 px-4 py-2 text-secondary text-md rounded-default transition 
                            ${editing
                            ? "border border-primary bg-white outline-none focus:ring-2 focus:ring-primary"
                            : "border border-transparent bg-transparent"
                        }`
                    }
                />

                {error && (
                    <span className="text-error text-sm">
                        {error}
                    </span>
                )}
                {editing ? (
                    <button
                        type="button"
                        aria-label="Cancel editing"
                        onClick={handleCancelClick}
                        className="bg-none border-none cursor-pointer  text-primary"
                    >
                        <X className="w-6 h-6" />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="Edit field"
                        onClick={handleEditClick}
                        className="bg-none border-none cursor-pointer text-primary"
                    >
                        <Pencil className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditableField;
