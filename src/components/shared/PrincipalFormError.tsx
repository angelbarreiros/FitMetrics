import React from 'react';

interface PrincipalFormErrorProps {
    errors: string | string[] | undefined;
    className?: string;
}

const PrincipalFormError: React.FC<PrincipalFormErrorProps> = ({ errors, className }) => {
    if (!errors || (Array.isArray(errors) && errors.length === 0)) {
        return null;
    }

    const errorList = Array.isArray(errors) ? errors : [errors];

    return (
        <div className={`text-error text-sm mt-2 ${className ?? ''}`} role="alert" aria-live="assertive">
            {errorList.length === 1 ? (
                <span>{errorList[0]}</span>
            ) : (
                <ul className="list-disc list-inside">
                    {errorList.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PrincipalFormError;