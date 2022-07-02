import ReactDOM from "react-dom/client";
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,

} from "react-router-dom";

import App from "./app";
import UserApp from "./userApp";

// App
const appDiv = document.getElementById("app");
let root
if (appDiv.className == 'mainApp'){
    root = ReactDOM.createRoot(appDiv);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
            </Routes>
        </BrowserRouter>
    )
} else if (appDiv.className = 'userApp') {
    root = ReactDOM.createRoot(appDiv);
    root.render(<UserApp />)
}
