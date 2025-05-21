import { LucideUndo2, Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface EditableFieldProps {
    label: string;
    type: string;
    value: string;
    stopEditing?: boolean;
    getValue: (newValue: string) => void;
    name?: string;
    placeholder?: string;
    error: string
}

export const EditableField = ({ label, value, getValue, stopEditing, type, name, placeholder, error }: EditableFieldProps) => {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { setEditing(false) }, [stopEditing]);

    const handleEditClick = () => {
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleCancelClick = () => {
        setInputValue(value);
        setEditing(false);
        getValue(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        getValue(e.target.value);
    };


    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-md text-text-secundary/80">
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
                    className={`flex-1 px-4 py-2  text-text-secundary text-md rounded-default
                            ${editing
                            ? "border border-primary  outline-none focus:ring-2 focus:ring-primary"
                            : "bg-trhid  border border-gray-200"
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
                        <LucideUndo2 className="w-6 h-6" />
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
