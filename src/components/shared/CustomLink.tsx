import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";

interface CustomLinkProps {
    title?: string;
    to: string;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    RBAC: string[];
    isDisabled?: boolean;
    children?: ReactNode;
    className?: string;
}
export const CustomLink = ({ to, onClick, RBAC, isDisabled, title, children, className }: CustomLinkProps) => {
    const isAuthenticated = userStore(state => state.user.isAuthenticated);
    if (isDisabled) {
        return (
            <Link onClick={onClick ?? (() => { })} to={to} className="text-gray-500 cursor-not-allowed">
                {children}
            </Link>
        );
    }
    if (RBAC.length > 0 && isAuthenticated) {
        return <></>;
    }
    return (
        <Link title={title} onClick={onClick ?? (() => { })} to={to} className={className}>
            {children}
        </Link>
    );
};
export default CustomLink;