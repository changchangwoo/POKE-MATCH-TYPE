import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global } from "@emotion/react";
import { globalStyles } from "./styles/globalStyles.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Global styles={globalStyles}/>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </BrowserRouter>
);
