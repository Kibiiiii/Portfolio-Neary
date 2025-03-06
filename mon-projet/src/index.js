import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Assure-toi que ce fichier existe

const root = document.getElementById("root"); // Vérifie que cet ID existe dans index.html

if (root) {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("L'élément #root est introuvable dans index.html !");
}

