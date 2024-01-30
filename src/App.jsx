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
import NewNav from "./components/nav/NewNav.jsx";
import {TooltipProvider} from "./components/ui/tooltip.tsx";

const items = [
    {
        title: 'Home',
        url: '/',
        label: 'Home',
        icon: 'fas fa-home'
    },
    {
        title: 'Properties',
        url: '/properties',
        label: 'Properties',
        icon: 'fas fa-building'
    },
    {
        title: 'Financials',
        url: '/financials',
        label: 'Financials',
        icon: 'fas fa-dollar-sign'
    },
    {
        title: 'Notifications',
        url: '/notifications',
        label: 'Notifications',
        icon: 'fas fa-bell'
    }
]

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AuthVerify/>
                <TooltipProvider>
                <ToastContainer/>
                <NewNav  isCollapsed={true} items={items}/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<LoginCard/>} />
                    <Route path="/signup" element={<SignUpCard/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
                </TooltipProvider>
            </Router>
        </Provider>
    )
}

export default App
