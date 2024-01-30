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
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="w-full md:w-[30rem]">
                    <h1 className="text-xl md:text-3xl font-500">Profile</h1>
                    <p className="text-sm sm:text-md">Manage your Profile</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker my-2"/>
                    <EditProfile/>
                </TabsContent>
                <TabsContent value="settings">
                    <h1 className="text-xl md:text-3xl font-500">Settings</h1>
                    <p className="text-sm sm:text-md">Manage your Account Settings</p>
                    <div className="w-[100%] relative h-[1px] bg-background-gray-darker my-2"/>
                    TODO
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Account;