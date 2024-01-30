import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import AuthVerify from "./services/auth/AuthVerify.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginCard from "./components/auth/LoginCard.js";
import {Provider} from "react-redux";

import {store} from "./services/store/store.js";
import {SignUpCard} from "./components/auth/SignUpCard.tsx";
import Home from "./pages/Home.js";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AuthVerify/>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<LoginCard/>} />
                    <Route path="/signup" element={<SignUpCard/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
