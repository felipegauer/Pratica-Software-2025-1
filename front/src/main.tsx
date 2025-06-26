import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProfessorProvider } from "./context/ProfessorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfessorProvider>
      <App />
    </ProfessorProvider>
  </StrictMode>
);
