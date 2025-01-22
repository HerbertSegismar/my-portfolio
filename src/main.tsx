import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Footer from "./components/Footer.tsx";
import BgSetter from "./_components/BgSetter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-screen min-h-screen">
      <div className="absolute top-40 left-0">
        <BgSetter />
      </div>
      <App />
    </div>
    <Footer />
  </StrictMode>
);
