import { Link } from "react-router-dom"

export const UnAuthorize = () => {
    return (
        <div className="flex flex-col mx-auto items-center justify-center h-screen w-full">
            <h1 className="text-red-500">You are not authorized to access this page</h1>
            <Link className="text-blue-400" to="/" >Go Home</Link>
        </div>
    )
}
export default UnAuthorize;