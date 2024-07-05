import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import "./satoshi.css";
import "./data/network/interceptor";
import routing from "./routing/router";
import ContextProvider from "./gemini/context/Context";

// Create the router using the routing configuration
const router = createHashRouter(routing);

// Render the application
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
