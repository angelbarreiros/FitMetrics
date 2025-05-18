import { NonLayout } from "../layouts/types";
import NotFoundPage from "../pages/404";
import { LoginPage } from "../pages/login";

type Flag = {
    Active: boolean
    ComingSoonPage?: React.ReactElement;
}
interface Route {
    Route: string;
    Component: React.ReactElement;
    IsIndex: boolean;
    FeatureFlag: Flag;

}
interface LayoutRoutes {
    Routes: Route[],
    Auth: React.ReactElement;
    Layout?: React.ReactElement;

}
const login = {
    Route: "/login",
    Component: <LoginPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const home = {
    Route: "/",
    Component: <h1>ESTO ES MAIN</h1>,
    IsIndex: true,
    FeatureFlag: {
        Active: true,
    }
}
const notFound = {
    Route: "*",
    Component: <NotFoundPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}





export const AppRoutes: LayoutRoutes[] = [
    {
        Layout: NonLayout,
        Auth: NonLayout,
        Routes: [
            login,
            notFound,
            home
        ],
    }
]


