import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Logs the error for debugging

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="text-lg mt-4">Something went wrong.</p>
      <p className="mt-2 text-gray-400">
        {error.statusText || error.message || "An unexpected error occurred."}
      </p>
      <a
        href="/"
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Go Back to Home
      </a>
    </div>
  );
};
