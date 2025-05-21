import { Search } from "lucide-react";

type EmptyStateMessageProps = {
    title: string;
    buttonLabel: string;
};

export const NoItemsFound = ({ title, buttonLabel }: EmptyStateMessageProps) => {
    return (
        <div className="text-center py-16 bg-secundary rounded-default border-1 border-borderLine my-4">
            <div className="mx-auto w-16 h-16 bg-third rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-text" />
            </div>
            <p className="bg-thirdtext-text-secundary font-semibold">{title}</p>
            <p className="text-text-secundary/50 text-sm mt-1">
                Click <span className="font-semibold text-text-secundary">{buttonLabel}</span> to create one.
            </p>
        </div>
    );
};
export default NoItemsFound;
