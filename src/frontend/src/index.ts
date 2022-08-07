import ReactDOM from "react-dom/client";
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    HashRouter,
    Link,
    useParams,

} from "react-router-dom";

import App from "./app";
import UserApp from "./userApp";
import { AboutPage } from "./aboutPage";
// App
const appDiv = document.getElementById("app");
// let { user_id } = useParams();

let root = ReactDOM.createRoot(appDiv);
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/user/:user_id" element={<UserApp />}></Route>
            <Route path="/help" element={<AboutPage />}></Route>
        </Routes>
    </HashRouter>
)

