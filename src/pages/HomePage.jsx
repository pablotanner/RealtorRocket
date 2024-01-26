import {Button} from "../components/ui/button.tsx";

import { FaChevronDown } from "react-icons/fa6";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "../components/ui/card.tsx";
import { GiRocketThruster } from "react-icons/gi";
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
        <>
        <div className="gap-y-10 m-3 rounded-xl bg-background-blue shadow-inner">
            <header className="z-50 pt-2">
                <nav className="flex items-center my-5 mx-5 md:mx-10 justify-between gap-x-2">
                    {/*<NavBar/>*/}
                    <div className="flex items-center gap-x-1">
                        <GiRocketThruster className="cursor-pointer fill-primary-dark w-12 h-12 hover:fill-primary"/>
                        <span className="hidden visible text-xl text-black font-500 ">
                            RealtorRocket
                        </span>
                    </div>
                    <div>
                        <Button  size="lg" variant="gradient">
                            Get Started
                        </Button>
                    </div>
                </nav>
            </header>

            <div className="flex flex-wrap md:flex-nowrap px-6 md:px-8">
                <div className="flex flex-col gap-y-4 justify-center">
                    <span className="text-[5vw] md:text-3xl lg:text-4xl font-400 text-off-black">
                        RealtorRocket<br/>
                        <span className="font-500 text-[7vw] md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-dark whitespace-normal md:whitespace-nowrap">
                            Rocket Fuel for Realtors
                        </span>
                    </span>
                    <p className="text-primary-light">
                        Where Data Meets Real Estate Expertise
                    </p>
                    <div className="flex justify-evenly md:justify-normal gap-x-2 md:gap-x-6 max-w-fit">
                        <Button variant="gradient" size="lg">
                            Get Started
                        </Button>
                        <Button variant="outline-primary" size="lg">
                            View Demo <IoPlayCircleOutline className="ml-1 w-4 h-4"/>
                        </Button>
                    </div>
                </div>

                <div className="">
                    <img src="/public/real-estate.png" alt="real-estate" className="select-none w-full h-full object-cover object-center pointer-events-none"/>
                </div>
            </div>
        </div>

            <div className="gap-y-10 m-3 rounded-xl bg-background-blue shadow-inner">
                <div className="flex px-4 md:px-10 lg:px-16 py-4 md:py-7 mt-4 gap-x-4 md:gap-x-10 text-off-black font-500 border-y-primary border-y-0 justify-between overflow-hidden w-[100%]">
                    <h1 className="text-[4vw] md:text-3xl w-fit whitespace-nowrap">
                        Helping Realtors <br/> Everywhere
                    </h1>

                    <span className="h-fit grid w-fit">
                       <span className="text-[4vw] md:text-3xl lg:text-4xl text-primary-dark">2k+</span>
                       <span className="text-[4vw] md:text-lg whitespace-nowrap">Registered Users</span>
                   </span>

                    <span className="h-fit grid w-fit">
                       <span className="text-[4vw] md:text-3xl lg:text-4xl text-primary-dark">521</span>
                       <span className="text-[4vw] md:text-lg ">Properties</span>
                   </span>

                    <span className="hidden md:visible md:grid h-fit w-fit">
                       <span className="text-3xl lg:text-4xl text-primary-dark">$20'000'000+</span>
                       <span className="text-lg ">Total Property Worth</span>
                   </span>

                </div>
            </div>



            <div className="p-5 mt-20 rounded-3xl bg-white">

            </div>



            {/*Scroll Indicator*/}
            {isVisible && (
                <div className="animate-bounce text-lg fixed inset-x-0 bottom-28 md:bottom-14 flex flex-col justify-center items-center text-off-black z-10">
                    Scroll
                    <FaChevronDown/>
                </div>
                )}
        </>
    )
}

export default HomePage

