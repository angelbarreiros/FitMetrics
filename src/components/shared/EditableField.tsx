import React, { useState } from "react";

interface EditableFieldProps {
    type: string;
    value: string;
    editable: boolean;
    endEditable: () => void
    getValue: (newValue: string) => void;
    name?: string;
    placeholder?: string;

}

export const SimpleEditableField = ({ value, getValue, endEditable, editable, type, name, placeholder, }: EditableFieldProps) => {
    const [internalValue, setInternalValue] = useState(value);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        getValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            getValue(internalValue);
            endEditable();
        }
    };

    return (
        <div className="flex flex-col gap-1 text-center ">
            {editable ? (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={internalValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full border-2 text-center border-primary rounded-default p-1 outline-none focus:ring-2 focus:ring-primary text-md text-text-secundary"
                />
            ) : (
                <span className="block text-text-secundary text-md truncate">
                    {value.trim() !== "" ? value : `No ${name}`}
                </span>
            )}
        </div>
    );
}


export default SimpleEditableField;
