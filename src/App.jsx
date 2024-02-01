import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import AuthVerify from "./services/auth/AuthVerify.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginCard from "./components/auth/LoginCard.js";
import {Provider} from "react-redux";

import {store} from "./services/store/store.js";
import {SignUpCard} from "./components/auth/SignUpCard.tsx";
import Navbar from "./components/nav/Navbar.jsx";
import {TooltipProvider} from "./components/ui/tooltip.tsx";
import Account from "./pages/Account.jsx";
import {HomePage, PropertiesPage, PropertyDetailPage, TenantsPage} from "./pages/WrappedPages.js";


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
                <Route path="/" element={<HomePage/>} />
                <Route path="*" element={<NotFound/>} />
                <Route path="/account"  element={<Account/>} />
                <Route path="/settings"  element={<Account/>} />
                <Route path="/properties/:id" element={<PropertyDetailPage/>} />
                <Route path="/properties" element={<PropertiesPage/>} />
                <Route path="/tenants" element={<TenantsPage/>} />
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
