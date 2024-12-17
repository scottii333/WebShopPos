import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./assets/Components/Auth";
import { ErrorPage } from "./assets/Components/ErrorPage";
import { DashBoard } from "./assets/Admin/DashBoard";
import { Setting } from "./assets/Admin/Setting";
import { Inventory } from "./assets/Admin/Inventory";
import { Report } from "./assets/Admin/Report";
import { Sales } from "./assets/Admin/Sales";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />, // Optional error handling
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    errorElement: <ErrorPage />, // Optional error handling
  },
  {
    path: "/setting",
    element: <Setting />,
    errorElement: <ErrorPage />, // Optional error handling
  },

  {
    path: "/inventory",
    element: <Inventory />,
    errorElement: <ErrorPage />, // Optional
  },
  {
    path: "/report",
    element: <Report />,
    errorElement: <ErrorPage />, // Optional
  },
  {
    path: "/sales",
    element: <Sales />,
    errorElement: <ErrorPage />, // Optional
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
