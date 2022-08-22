import ReactDOM from "react-dom/client"
import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    HashRouter,
    Link,
    useParams,
} from "react-router-dom"

import App from "./pages/app"
import UserApp from "./pages/userApp"
import { AboutPage } from "./pages/aboutPage"
// App
const appDiv = document.getElementById("app")

let root = ReactDOM.createRoot(appDiv)
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/user/:user_id" element={<UserApp />}></Route>
            <Route path="/help" element={<AboutPage />}></Route>
        </Routes>
    </HashRouter>
)
