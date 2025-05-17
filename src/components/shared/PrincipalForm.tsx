import type { FormEvent, ReactNode } from "react";


interface PrincipalFormProps {
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const PrincipalForm = ({ children, onSubmit }: PrincipalFormProps) => {
    return (
        <form className="space-y-6" onSubmit={onSubmit} >
            {children}
        </form>
    );
};

export default PrincipalForm;