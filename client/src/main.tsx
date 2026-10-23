import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { startSmoothScroll } from "./components/tide/motion";

startSmoothScroll();

createRoot(document.getElementById("root")!).render(<App />);
