import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";


// Create a container element and append it to the body
const container = document.createElement("div");
container.id = "bhashini-popup-container";
document.body.appendChild(container);

// Create a style element and add the necessary styles
const styleElement = document.createElement("style");
styleElement.innerHTML = `
@keyframes rotatet {
  to {
    transform: rotate(360deg);
  }
}
`;

document.head.appendChild(styleElement);

const rootElement = document.getElementById("bhashini-popup-container");
const root = createRoot(rootElement);

// Render the app using ReactDOM.render (for React versions prior to 18)
// root.render(<App />, document.getElementById("bhashini-popup-container"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
