import { ArrowRight, Plus, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type SimpleAdderProps = {
    onAdd: (name: string) => Promise<void>;
    error?: string;
    placeholder?: string;
};

export const SimpleAdder = ({ onAdd, error, placeholder }: SimpleAdderProps) => {
    const [showInput, setShowInput] = useState(false);
    const [newFranchiseName, setNewFranchiseName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddFranchise = async (e: FormEvent) => {
        e.preventDefault();
        if (!newFranchiseName) return;

        setIsAdding(true);
        try {
            await onAdd(newFranchiseName);
            setNewFranchiseName("");
            setShowInput(false);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddButton = () => {
        setShowInput(true);
    };

    const cancelAdd = () => {
        setShowInput(false);
        setNewFranchiseName("");
    };

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    return (
        <div className="flex  gap-2">
            <div className="flex items-center">
                {showInput ? (
                    <form
                        onSubmit={handleAddFranchise}
                        className="flex items-center gap-2 bg-transparent rounded-default"
                    >
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={newFranchiseName}
                            required
                            maxLength={40}
                            onChange={(e) => setNewFranchiseName(e.target.value)}
                            className="border border-primary text-text rounded-default px-4 py-2 w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-primary "
                            ref={inputRef}
                        />

                        <button
                            type="submit"
                            disabled={isAdding}
                            className="flex items-center bg-primary text-text p-2  rounded-default hover:bg-primary/50 transition-colors duration-300 "
                        >
                            {isAdding ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <ArrowRight className="h-6 w-6" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={cancelAdd}
                            className="text-text bg-primary p-2 rounded-default hover:bg-primary/50 transition-colors duration-300"
                        >
                            <XCircle className="h-6 w-6" />
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={handleAddButton}
                        disabled={isAdding}
                        className="bg-primary text-text  py-2 px-4 rounded-default flex gap-2 items-center transition-all duration-300 hover:bg-primary/50 "
                    >
                        <Plus className="h-6 w-6" />
                        Add Facility
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 rounded-default px-6 py-3 border-b border-red-100 flex items-center">
                    <span className="text-sm">{error}</span>
                </div>
            )}
        </div>
    );
};
