import { LucideUndo2, Pencil } from "lucide-react";
import { useRef, useState } from "react";

interface PasswordModifierProps {
    oldPwd: string;
    setOldPwd: (value: string) => void;
    newPwd: string;
    setNewPwd: (value: string) => void;
    confirmNewPwd: string;
    setConfirmNewPwd: (value: string) => void;
    errors: {
        oldPwd?: string;
        newPwd?: string;
        confirmNewPwd?: string;
    };
}

const PasswordModifier = ({
    setOldPwd,
    oldPwd,
    newPwd,
    setNewPwd,
    confirmNewPwd,
    setConfirmNewPwd,
    errors,
}: PasswordModifierProps) => {
    const [isEditing, setIsEditing] = useState(false);

    // Internal state for the fields
    const [internalOldPwd, setInternalOldPwd] = useState("");
    const [internalNewPwd, setInternalNewPwd] = useState("");
    const [internalConfirmNewPwd, setInternalConfirmNewPwd] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        setInternalOldPwd(oldPwd || "");
        setInternalNewPwd(newPwd || "");
        setInternalConfirmNewPwd(confirmNewPwd || "");
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setInternalOldPwd("");
        setInternalNewPwd("");
        setInternalConfirmNewPwd("");

        setOldPwd("");
        setNewPwd("");
        setConfirmNewPwd("");
    };


    return (
        <div className="flex flex-col gap-4 w-full ">
            {!isEditing ? (
                <div className="flex flex-col gap-2">
                    <label className="text-md text-secundary/70">Password:</label>
                    <div className="flex items-center gap-2">
                        <span className="flex-1 px-4 py-2 bg-gray-50 rounded-default border border-gray-200 text-secondary text-md">
                            ********
                        </span>
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Pencil className="w-6 h-6 text-primary" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-gray-700">Old Password</label>
                        <div className="flex w-full gap-2">
                            <input
                                ref={inputRef}
                                type="password"
                                value={internalOldPwd}
                                onChange={(e) => { setInternalOldPwd(e.target.value); setOldPwd(e.target.value) }}
                                className={`flex-1 px-4 py-2 text-secondary text-md rounded-default transition 
                                    border border-primary bg-white outline-none focus:ring-2 focus:ring-primary`}
                            />
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                            >
                                <LucideUndo2 className="w-6 h-6 text-primary" />
                            </button>

                        </div>
                        {errors.oldPwd && (
                            <p className="text-red-500 text-sm mt-1">{errors.oldPwd}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={internalNewPwd}
                            onChange={(e) => { setInternalNewPwd(e.target.value); setNewPwd(e.target.value) }}
                            className="flex-1 px-4 py-2 text-secondary text-md rounded-default transition border border-primary bg-white outline-none focus:ring-2 focus:ring-primary "
                        />
                        {errors.newPwd && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPwd}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={internalConfirmNewPwd}
                            onChange={(e) => { setInternalConfirmNewPwd(e.target.value); setConfirmNewPwd(e.target.value) }}
                            className="flex-1 px-4 py-2 text-secondary text-md rounded-default transition border border-primary bg-white outline-none focus:ring-2 focus:ring-primary "
                        />
                        {errors.confirmNewPwd && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmNewPwd}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PasswordModifier;