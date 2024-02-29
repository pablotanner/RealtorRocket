import {useState} from "react";
import EditSettings from "../../components/profile/EditSettings.js";
import EditProfile from "../../components/profile/EditProfile.js";
import {Tabs, TabsContent, TabsItem, TabsList} from "../../components/ui/tabs-new.tsx";
import {useNavigate} from "react-router-dom";


const Account = (props) => {
    const navigate = useNavigate();
    const user = props?.data?.data;
    const selectedTab = location.pathname === '/account' ? 'account' : 'settings';


    const tabs = [
        {
            id: "account",
            title: "Profile",
            content: (
                <EditProfile user={user}/>
            )
        },
        {
            id: "settings",
            title: "Settings",
            content: (
                <EditSettings user={user}/>
            )
        }
    ]

    return (
        <div>
            <Tabs value={selectedTab}>
                <TabsList>
                    {tabs.map((tab, index) => (
                        <TabsItem
                            key={index}
                            value={tab.id}
                            onClick={() => navigate(`/${tab.id}`)}

                        >{tab.title}</TabsItem>
                    ))}
                </TabsList>
                {tabs.map((tab, index) => (
                    <TabsContent key={index} value={tab.id}>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default Account;