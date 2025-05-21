import { NAuth, PlainAuth } from "../auth/Auth";
import { AppLayout } from "../layouts/PcApp/PcAppLayout";
import { NonLayout } from "../layouts/types";
import NotFoundPage from "../pages/404";
import FacilitiesPage from "../pages/sideBar/facilities";
import { LoginPage } from "../pages/login";
import UnAuthorize from "../pages/unauthorize";
import { HOME_ROUTE, type LayoutRoutes } from "./routerTypes";
import DevicesPage from "../pages/sideBar/devices";
import QrFeedbackPage from "../pages/sideBar/qrFeedback";
import AnalyticsPage from "../pages/sideBar/analytics";
import AlertsPage from "../pages/sideBar/alerts";
import CalendarPage from "../pages/sideBar/calendar";
import AgentsPage from "../pages/sideBar/agents";
import HelpPage from "../pages/footerBar/help";
import AccountPage from "../pages/footerBar/account";
import NoConexion from "../pages/noConexion";

const login = {
    Route: "/login",
    Component: <LoginPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const unauthorized = {
    Route: "/unauthorized",
    Component: <UnAuthorize />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const home = {
    Route: HOME_ROUTE,
    Component: <FacilitiesPage />,
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
const devices = {
    Route: "/devices",
    Component: <DevicesPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const userFeedback = {
    Route: "/userFeedback",
    Component: <QrFeedbackPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const analytics = {
    Route: "/analytics",
    Component: <AnalyticsPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,

    }
}
const alerts = {
    Route: "/alerts",
    Component: <AlertsPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const calendar = {
    Route: "/calendar",
    Component: <CalendarPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const agents = {
    Route: "/agents",
    Component: <AgentsPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const help = {
    Route: "/help",
    Component: <HelpPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const account = {
    Route: "/account",
    Component: <AccountPage />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
const noConexion = {
    Route: "/noConexion",
    Component: <NoConexion />,
    IsIndex: false,
    FeatureFlag: {
        Active: true,
    }
}
export const AppRoutes: LayoutRoutes[] = [
    {
        Layout: NonLayout,
        Auth: NAuth,
        Routes: [
            login,
            notFound,
            unauthorized,
            noConexion
        ],
    },
    {
        Layout: AppLayout,
        Auth: PlainAuth,
        Routes: [
            home,
            devices,
            userFeedback,
            analytics,
            alerts,
            calendar,
            agents,
            help,
            account,

        ],
    }

]


