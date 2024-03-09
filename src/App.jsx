import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import AuthVerify from "./services/auth/AuthVerify.js";
import LoginCard from "./components/auth/LoginCard.js";
import {Provider, useSelector} from "react-redux";
import {store} from "./services/store/store.js";
import {SignUpCard} from "./components/auth/SignUpCard.tsx";
import Navbar from "./components/nav/Navbar.jsx";
import {TooltipProvider} from "./components/ui/tooltip.tsx";
import {
    HomePage,
    FinancialsPage,
    PropertiesPage,
    PropertyDetailPage,
    RentalDetailPage,
    RentalsPage,
    TenantsPage,
    CalendarPage,
    TenantProfilePage,
    ExplorerPage,
    PropertyCreationPage,
    TenantCreationPage,
    AccountPage,
    MessagesPage, MaintenancePage
} from "./pages/WrappedPages.js";
import {useSocket} from "./services/hooks/useSocket.js";
import SocketContext from "./services/contexts/SocketContext.js";
import {ThemeProvider} from "./services/contexts/ThemeContext.tsx";






function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Provider store={store}>
                <Router>
                    <AppContent/>
                </Router>
                <AuthVerify/>
            </Provider>
        </ThemeProvider>

    )
}

const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

    const token = useSelector(state => state.authSlice.accessToken)
    const socket = useSocket(token);

    return (
        <SocketContext.Provider value={socket}>
            <TooltipProvider>
                {showNavbar && (<Navbar>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="*" element={<NotFound/>} />
                        <Route path="/account"  element={<AccountPage/>} />
                        <Route path="/settings"  element={<AccountPage/>} />
                        <Route path="/properties/create" element={<PropertyCreationPage/>} />
                        <Route path="/properties/:id" element={<PropertyDetailPage/>} />
                        <Route path="/properties" element={<PropertiesPage/>} />
                        <Route path="/tenants" element={<TenantsPage/>} />
                        <Route path="/tenants/create" element={<TenantCreationPage/>} />
                        <Route path="/tenants/:id" element={<TenantProfilePage/>} />
                        <Route path="/rentals" element={<RentalsPage/>}/>
                        <Route path="/rentals/:id" element={<RentalDetailPage/>} />
                        <Route path="/financials" element={<FinancialsPage/>} />
                        <Route path="/calendar" element={<CalendarPage/>}/>
                        <Route path="/explorer" element={<ExplorerPage/>}/>
                        <Route path="/messages" element={<MessagesPage/>}/>
                        <Route path="/maintenance" element={<MaintenancePage/>}/>
                    </Routes>
                </Navbar>)}
                {!showNavbar && (
                    <Routes>
                        <Route path="/login" element={<LoginCard/>} />
                        <Route path="/signup" element={<SignUpCard/>}/>
                    </Routes>
                )}
            </TooltipProvider>
        </SocketContext.Provider>
    )
}



export default App
