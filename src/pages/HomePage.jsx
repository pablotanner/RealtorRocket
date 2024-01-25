in import {Button} from "../components/ui/button.tsx";

import { FaChevronDown } from "react-icons/fa6";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "../components/ui/card.tsx";
import { GiRocketThruster } from "react-icons/gi";
import {Alert, AlertDescription, AlertTitle} from "../components/ui/alert.tsx";
import { LuConstruction } from "react-icons/lu";
import {IoPlayCircleOutline} from "react-icons/io5";


const HomePage = () => {
    const [isVisible, setIsVisible] = useState(true);

    const checkScroll = () => {
        if (window.scrollY > 0) {
            setIsVisible(false);
        }
        else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    return (
        <div className="bg-gradient-to-tl from-[#4a044e] from-20% via-[#2e1065] via-40% to-[#064e3b] to-90% grid gap-y-10 absolute">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between mx-10 my-5">
                    {/*<NavBar/>*/}
                    <div>
                        <GiRocketThruster className="cursor-pointer fill-white w-12 h-12 hover:fill-primary"/>
                    </div>
                    <div>
                        <Button  size="lg" variant="gradient">
                            Get Started
                        </Button>
                    </div>
                </nav>
            </header>
            <div className="flex flex-col gap-y-4 pt-52 px-20 relative z-10">
                    <span className="text-6xl font-700 text-secondary">
                        RealtorRocket <br/>
                        <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Rocket Fuel for Realtors</span>
                    </span>
                    <p className="text-secondary">
                        Where Data Meets Real Estate Expertise
                    </p>
                    <div className="flex gap-x-4">
                        <Button variant="gradient" size="lg">
                            Get Started
                        </Button>
                        <Button variant="outline" size="lg">
                            View Demo <IoPlayCircleOutline className="ml-1 w-4 h-4"/>
                        </Button>
                    </div>
            </div>

           <div className="columns-2 px-20 py-7 text-white bg-transparent font-500 border-y-white border-y-2">
               <h1 className="text-3xl">
                   Helping Realtors <br/> Everywhere
               </h1>

               <div className="col-span-2 gap-20">
                   <span className="h-fit flex flex-col">
                       <span className="text-3xl">2k+</span>
                       <span className="text-primary">Registered Users</span>
                   </span>

                   <span className="h-fit flex flex-col">
                       <span className="text-3xl">521</span>
                       <span className="text-primary">Properties</span>
                   </span>

                   <span className="h-fit flex flex-col">
                       <span className="text-3xl">$20'000'000+</span>
                       <span className="text-primary">Total Property Worth</span>
                   </span>
               </div>

           </div>

            <div className="pt-20 sm:px-20 px-0">
                <Card className="bg-gradient-to-r from-primary to-primary-dark border-0 rounded-2xl">
                    <CardContent className="columns-3 py-2 px-3">
                        <Card >
                            <CardHeader className="font-300">
                                HOW IT WORKS
                                <h4 className="text-2xl font-700 text-gray-700">Analysis</h4>
                            </CardHeader>
                            <CardContent className="text-gray-600  text-xs md:text-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus ipsum, tincidunt eget ornare quis, commodo gravida odio. Nullam sit amet nulla sit amet velit placerat porttitor tempor at nisl. Suspendisse potenti. Phasellus luctus odio eget est ornare, at lobortis metus cursus. Praesent commodo commodo arcu, vel varius sem tincidunt at. Aenean luctus velit a suscipit efficitur. Duis sed tincidunt enim, ac scelerisque mauris. Quisque at interdum turpis. Curabitur suscipit consequat nisi eget hendrerit. Praesent eget lectus efficitur, suscipit elit eget, blandit eros. Mauris in neque in est auctor pellentesque. Sed at eros eget massa sagittis sollicitudin quis in velit. Nulla consectetur ultricies ornare.
                            </CardContent>
                        </Card>
                        <Card >
                            <CardHeader className="font-300">
                                BENEFITS
                                <h4 className="text-2xl font-700 text-gray-700">Insights</h4>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-xs md:text-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus ipsum, tincidunt eget ornare quis, commodo gravida odio. Nullam sit amet nulla sit amet velit placerat porttitor tempor at nisl. Suspendisse potenti. Phasellus luctus odio eget est ornare, at lobortis metus cursus. Praesent commodo commodo arcu, vel varius sem tincidunt at. Aenean luctus velit a suscipit efficitur. Duis sed tincidunt enim, ac scelerisque mauris. Quisque at interdum turpis. Curabitur suscipit consequat nisi eget hendrerit. Praesent eget lectus efficitur, suscipit elit eget, blandit eros. Mauris in neque in est auctor pellentesque. Sed at eros eget massa sagittis sollicitudin quis in velit. Nulla consectetur ultricies ornare.
                            </CardContent>
                        </Card>
                        <Card >
                            <CardHeader className="font-300">
                                OUR PLANS
                                <h4 className="text-2xl font-700 text-gray-700">Pricing</h4>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-xs md:text-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus ipsum, tincidunt eget ornare quis, commodo gravida odio. Nullam sit amet nulla sit amet velit placerat porttitor tempor at nisl. Suspendisse potenti. Phasellus luctus odio eget est ornare, at lobortis metus cursus. Praesent commodo commodo arcu, vel varius sem tincidunt at. Aenean luctus velit a suscipit efficitur. Duis sed tincidunt enim, ac scelerisque mauris. Quisque at interdum turpis. Curabitur suscipit consequat nisi eget hendrerit. Praesent eget lectus efficitur, suscipit elit eget, blandit eros. Mauris in neque in est auctor pellentesque. Sed at eros eget massa sagittis sollicitudin quis in velit. Nulla consectetur ultricies ornare.
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>



            {/*Scroll Indicator*/}
            {isVisible && (
                <div className="animate-bounce text-lg fixed inset-x-0 bottom-14 flex flex-col justify-center items-center text-gray-700 z-10 ">
                    Scroll
                    <FaChevronDown/>
                </div>
                )}

        </div>
    )
}

export default HomePage

