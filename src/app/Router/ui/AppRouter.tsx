import  { useCallback } from 'react';
import { Route, Routes } from "react-router-dom";

import { AppRouteProps, routerConfig } from "../Config/Config";

const AppRouter = () => {
    const render = useCallback((route : AppRouteProps, id: number) => {
        return (
            <Route
                path={route.path}
                element={route.element}
                key={id}
            />
        );
    },[]);

    return (
        <Routes>
            {Object.values(routerConfig).map(render)}
        </Routes>
    );
};

export default AppRouter;