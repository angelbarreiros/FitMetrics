import { WifiOff } from 'lucide-react';
import { HOME_ROUTE } from '../router/routerTypes';


export const NoConexion = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-secundary text-primary">
            <WifiOff size={96} stroke="#e74c3c" />
            <h1 className="mt-6 text-2xl font-bold">No Internet Connection</h1>
            <p className="mt-2 text-gray-600">Please check your network settings and try again.</p>
            <button
                onClick={() => window.location.href = HOME_ROUTE}
                className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
            >
                Retry
            </button>
        </div>
    );
};
export default NoConexion;
