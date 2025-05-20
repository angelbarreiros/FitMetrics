export const HOME_ROUTE = import.meta.env.VITE_HOME_ROUTE as string
export const UNAUTHENTICATED_ROUTES = ["/login"];
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
export interface LayoutRoutes {
    Routes: Route[],
    Auth: React.ReactElement;
    Layout?: React.ReactElement;

}