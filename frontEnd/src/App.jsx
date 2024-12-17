import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./assets/Components/Auth";
import { ErrorPage } from "./assets/Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />, // Optional error handling
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
