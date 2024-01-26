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
                <div className="flex flex-col gap-y-4 justify-center leading-none">
                    <span className="text-[5vw] md:text-3xl lg:text-4xl font-400 text-off-black">
                        RealtorRocket<br/>
                        <span className="font-500 text-[7vw] md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-dark whitespace-normal md:whitespace-nowrap">
                            Rocket Fuel for Realtors
                        </span>
                    </span>
                    <p className="text-[4vw] md:text-lg leading-none text-primary-light">
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
                       <span className="text-[3vw] md:text-lg whitespace-nowrap">Registered Users</span>
                   </span>

                    <span className="h-fit grid w-fit">
                       <span className="text-[4vw] md:text-3xl lg:text-4xl text-primary-dark">521</span>
                       <span className="text-[3vw] md:text-lg ">Properties</span>
                   </span>

                    <span className="hidden md:visible md:grid h-fit w-fit">
                       <span className="text-3xl lg:text-4xl text-primary-dark">$20'000'000+</span>
                       <span className="text-lg ">Total Property Worth</span>
                   </span>

                </div>
            </div>


        <div className="gap-y-10 m-3 rounded-xl bg-primary-darker/90 text-white shadow-inner p-10">
            <div className="flex flex-col">
                <span className="text-primary-light">
                    ABOUT
                </span>
                <span className="text-4xl">
                    What we do
                </span>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row gap-6 lg:gap-6 relative justify-center">
                <img
                    src='/public/mock-dashboard-placeholder.jpg'
                    className=" h-full w-full object-cover object-center rounded-xl max-w-[800px]"
                />
                <Card className="shadow-2xl  max-w-[800px] max-h-[600px] overflow-ellipsis overflow-auto">
                    <CardHeader className="text-2xl lg:text-xl">
                        The new way to manage your real estate business
                    </CardHeader>
                    <CardContent>
                        At volutpat diam ut venenatis. Massa tincidunt dui ut ornare lectus. Molestie a iaculis at erat pellentesque adipiscing. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Morbi enim nunc faucibus a pellentesque sit.
                    </CardContent>
                </Card>
                    
            </div>
        </div>

            <div className="gap-y-10 m-3 rounded-xl bg-primary-darker text-white shadow-inner p-10">
                <div className="flex flex-col mb-4">
                    <span className="text-primary-light">
                        HOW IT WORKS
                    </span>
                    <span className="text-4xl">
                        It's easy
                </span>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <Card className="shadow-2xl">
                        <CardHeader>
                            <span className="w-12 h-12 rounded-full border-b-gray-400 border-2 flex justify-center items-center text-center text-gray-500">
                                1
                            </span>
                        </CardHeader>
                        <CardContent>
                            At volutpat diam ut venenatis. Massa tincidunt dui ut ornare lectus. Molestie a iaculis at erat pellentesque adipiscing. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Morbi enim nunc faucibus a pellentesque sit.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <span className="w-12 h-12 rounded-full border-l-gray-400 border-b-gray-400 border-2 flex justify-center items-center text-center text-gray-500">
                                2
                            </span>
                        </CardHeader>
                        <CardContent>
                            Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Massa sapien faucibus et molestie. Pulvinar sapien et ligula ullamcorper malesuada. Odio tempor orci dapibus ultrices in iaculis nunc sed. Nam at lectus urna duis convallis convallis tellus id interdum. Malesuada pellentesque elit eget gravida cum sociis.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <span className="w-12 h-12 rounded-full border-gray-400 border-2 flex justify-center items-center text-center text-gray-500">
                                3
                            </span>
                        </CardHeader>
                        <CardContent>
                            Malesuada pellentesque elit eget gravida cum sociis natoque. Arcu dictum varius duis at consectetur lorem donec. Etiam sit amet nisl purus in. Arcu non sodales neque sodales ut etiam sit amet nisl. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam
                        </CardContent>
                    </Card>
                </div>

            </div>

            <footer className="gap-y-10 m-3 rounded-xl bg-primary-darkest shadow-inner p-5">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <a href="#" className="flex items-center">
                                <GiRocketThruster className="fill-primary w-8 h-8 min-w-8 min-h-8 me-1 md:me-3"/>
                                <span
                                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Realtor Rocket</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Info</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow
                                    us</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#"
                                           className="hover:underline ">Github</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Instagram</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8"/>
                    <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a
              href="#" className="hover:underline">RealtorRocket</a>. All Rights Reserved.
          </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 8 19">
                                    <path fillRule="evenodd"
                                          d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 17">
                                    <path fillRule="evenodd"
                                          d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>


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

