import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import AuthVerify from "./services/auth/AuthVerify.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginCard from "./components/auth/LoginCard.js";
import {Provider} from "react-redux";

import {store} from "./services/store/store.js";
import {SignUpCard} from "./components/auth/SignUpCard.tsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/nav/Navbar.jsx";
import {TooltipProvider} from "./components/ui/tooltip.tsx";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppContent/>
            </Router>
            <AuthVerify/>
        </Provider>
    )
}

const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

    return (
        <TooltipProvider>
            <ToastContainer/>
            {showNavbar && (<Navbar>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
                </Navbar>)}
            {!showNavbar && (
                <Routes>
                    <Route path="/login" element={<LoginCard/>} />
                    <Route path="/signup" element={<SignUpCard/>}/>
                </Routes>
                )}
        </TooltipProvider>

    )
}



export default App
