import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs.tsx"
import EditProfile from "../components/profile/EditProfile.js";


const Account = () => {
    return (
        <div >
            <Tabs defaultValue="profile" className="max-w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="w-[30rem]">
                    <h1 className="text-xl md:text-3xl font-500">Profile</h1>
                    <p className="text-md">Manage your Profile</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker"/>
                    <EditProfile/>
                </TabsContent>
                <TabsContent value="settings">
                    <h1 className="text-xl md:text-3xl font-500">Settings</h1>
                    <p className="text-md">Manage your Account Settings</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker"/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Account;