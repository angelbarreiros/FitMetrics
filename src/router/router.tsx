import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import AuthWrapper from "../components/AuthWrapper";


export const Router = () => {
    return (
        <BrowserRouter basename="/">
            <AuthWrapper>
                <Routes>
                    {AppRoutes.map((route, index) => (
                        <Route element={route.Auth} key={index}>
                            <Route element={route.Layout} key={index}>
                                {route.Routes.map((r, i) =>
                                    r.FeatureFlag.Active
                                        ? <Route key={i} path={r.Route} element={r.Component} index={r.IsIndex} />
                                        : r.FeatureFlag.ComingSoonPage
                                            ? <Route key={i} path={r.Route} element={r.FeatureFlag.ComingSoonPage} />
                                            : null
                                )}
                            </Route>
                        </Route>
                    ))}
                </Routes>
            </AuthWrapper>
        </BrowserRouter>
    )
}

export default Router;