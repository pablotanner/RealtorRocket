import {Button} from "../components/ui/button.tsx";
import {Input} from "../components/ui/input.tsx";
import {Label} from "../components/ui/label.tsx";
import {Separator} from "../components/ui/separator.tsx";
import { MdSearch } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "../components/ui/card.tsx";
import { GiRocketThruster } from "react-icons/gi";


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
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between mx-10 my-5">
                    <div>
                        <GiRocketThruster  className="cursor-pointer w-12 h-12 hover:fill-primary"/>
                    </div>
                    <div>
                        <Button  size="lg">
                            Login
                        </Button>
                    </div>
                </nav>
            </header>
            <div className="relative isolate z-1">
                {/*Background Start*/}
                <div
                    className="absolute inset-x-0 -top-72 transform-gpu overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(100%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            {/*Background End*/}
                <div className="flex flex-col items-center mt-64 gap-y-4 relative z-10">
                    <span className="text-2xl font-light text-center">
                        Rocket Realtor
                    </span>
                    <span className="text-6xl font-bold text-center">
                        Real Estate Investment Analysis
                    </span>
                    <p className="text-gray-700">
                        Enter some information below and get started!
                    </p>
                    <div className="flex flex-row gap-x-2 bg-white shadow-2xl pt-2 pb-4 px-8 pr-4 mt-6 rounded-full">
                        <div className="grid w-full max-w-sm items-center">
                            <Label htmlFor="email">City</Label>
                            <Input type="text" id="city" placeholder="Enter City" />
                        </div>
                        <Separator orientation="vertical"/>
                        <div className="grid w-full max-w-sm items-center">
                            <Label htmlFor="email">ZIP Code</Label>
                            <Input type="text" id="zip" placeholder="Enter ZIP Code" />
                        </div>
                        <div className="grid items-center mt-5">
                            <Button size="icon">
                                <MdSearch className="h-6 w-6"/>
                            </Button>
                        </div>
                    </div>

                    <Card className="bg-gradient-to-r from-purple-300 to-cyan-100 w-[80%] border-0 mt-36 rounded-2xl">
                        <CardContent className="columns-3 py-2 px-3">
                            <Card>
                                <CardHeader className="font-light">
                                    HOW IT WORKS
                                    <h4 className="text-2xl font-bold text-gray-700">Analysis</h4>
                                </CardHeader>
                                <CardContent className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus ipsum, tincidunt eget ornare quis, commodo gravida odio. Nullam sit amet nulla sit amet velit placerat porttitor tempor at nisl. Suspendisse potenti. Phasellus luctus odio eget est ornare, at lobortis metus cursus. Praesent commodo commodo arcu, vel varius sem tincidunt at. Aenean luctus velit a suscipit efficitur. Duis sed tincidunt enim, ac scelerisque mauris. Quisque at interdum turpis. Curabitur suscipit consequat nisi eget hendrerit. Praesent eget lectus efficitur, suscipit elit eget, blandit eros. Mauris in neque in est auctor pellentesque. Sed at eros eget massa sagittis sollicitudin quis in velit. Nulla consectetur ultricies ornare.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="font-light">
                                    BENEFITS
                                    <h4 className="text-2xl font-bold text-gray-700">Insights</h4>
                                </CardHeader>
                                <CardContent className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus ipsum, tincidunt eget ornare quis, commodo gravida odio. Nullam sit amet nulla sit amet velit placerat porttitor tempor at nisl. Suspendisse potenti. Phasellus luctus odio eget est ornare, at lobortis metus cursus. Praesent commodo commodo arcu, vel varius sem tincidunt at. Aenean luctus velit a suscipit efficitur. Duis sed tincidunt enim, ac scelerisque mauris. Quisque at interdum turpis. Curabitur suscipit consequat nisi eget hendrerit. Praesent eget lectus efficitur, suscipit elit eget, blandit eros. Mauris in neque in est auctor pellentesque. Sed at eros eget massa sagittis sollicitudin quis in velit. Nulla consectetur ultricies ornare.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="font-light">
                                    OUR PLANS
                                    <h4 className="text-2xl font-bold text-gray-700">Pricing</h4>
                                </CardHeader>
                                <CardContent className="text-gray-600">
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

