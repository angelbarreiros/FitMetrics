

interface PrincipalButtonProps {
    text: string;
}

export const PrincipalSubmitButton = ({ text }: PrincipalButtonProps) => {
    return (
        <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-default bg-primary text-text"
        >
            {text}
        </button>
    )
};