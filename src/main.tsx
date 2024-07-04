import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import "./data/network/interceptor";
import routing from "./routing/router";


const router = createHashRouter(routing);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
