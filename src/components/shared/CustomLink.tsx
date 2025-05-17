import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";

interface CustomLinkProps {
    text: string;
    href: string;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    RBAC: string[]
    isDisabled?: boolean;
}
export const CustomLink = ({ text, href, onClick, RBAC, isDisabled }: CustomLinkProps) => {
    const isAuthenticated = userStore(state => state.user.isAuthenticated)
    if (isDisabled) {
        return <Link onClick={onClick} to={href} className="text-gray-500 cursor-not-allowed">{text}</Link>
    }
    if (RBAC.length > 0 && !isAuthenticated) {
        return <></>

    }
    return <>
        <Link onClick={onClick} to={href}>{text}</Link>
    </>

}
export default CustomLink;