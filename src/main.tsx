import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery";
import App from "./App";
import "./index.css";
// Import i18n config
import "./lib/i18n";

// Loading component to show while translations are being loaded
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-12 w-12 rounded-full bg-blue-200 dark:bg-blue-800 mb-4"></div>
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
