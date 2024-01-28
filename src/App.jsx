import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AuthVerify from "./services/auth/AuthVerify.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginCard from "./components/auth/LoginCard.js";


function App() {
    return (
        <>
            <Router>
                <AuthVerify/>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<LoginCard/>} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
