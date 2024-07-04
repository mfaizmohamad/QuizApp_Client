import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import "./satoshi.css";
import "./data/network/interceptor";
import routing from "./routing/router";

// Create the router using the routing configuration
const router = createHashRouter(routing);

// Render the application
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
