import { Navigate, useRoutes } from "react-router-dom";

// layouts
import HomeLayout from "./layouts/home/HomeLayout";
import SimpleLayout from "./layouts/simple";
// Pages
import Page404 from "./pages/Page404";
import HomeAppPage from "./pages/HomeAppPage";
import Products from "./pages/ProductsPage";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: "/home",
            element: <HomeLayout />,
            children: [
                { element: <Navigate to="/Home/app" />, index: true },
                { path: "app", element: <HomeAppPage /> },
                {
                    path: "products",
                    element: <Products />,
                    // children: [
                    //     { element: <Navigate to={path} />, index: true },
                    // ],
                },
            ],
        },
        {
            path: "*",
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to="/home" />, index: true },
                { path: "404", element: <Page404 /> },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
    ]);

    return routes;
}
