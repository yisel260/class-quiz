import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import UserContext from "./UserContext";

const container = document.getElementById("root");
const root = createRoot(container);

// const context = useContext(UserContext)

root.render(
    // <UserContext.Provider value = {}>
        <App />
    // </UserContext.Provider>
    );
