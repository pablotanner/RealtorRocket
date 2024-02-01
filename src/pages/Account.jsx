import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs.tsx"
import EditProfile from "../components/profile/EditProfile.js";
import {useLocation, useNavigate} from "react-router-dom";
import EditSettings from "../components/profile/EditSettings.js";


const Account = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedTab = location.pathname === '/account' ? 'profile' : 'settings';


    return (
        <div >
            <Tabs value={selectedTab}>
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="profile" onClick={() => navigate("/account")}>Profile</TabsTrigger>
                    <TabsTrigger value="settings" onClick={() => navigate("/settings")}>Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <h1 className="text-xl md:text-3xl font-500">Profile</h1>
                    <p className="text-sm sm:text-md">Manage your Profile</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker my-2"/>
                    <EditProfile/>
                </TabsContent>
                <TabsContent value="settings">
                    <h1 className="text-xl md:text-3xl font-500">Settings</h1>
                    <p className="text-sm sm:text-md">Manage your Account Settings</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker my-2"/>
                    <EditSettings/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Account;