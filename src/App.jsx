import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </Router>
    )
}

export default App
