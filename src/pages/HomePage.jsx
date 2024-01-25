import {Button} from "../components/ui/button.tsx";
import {Input} from "../components/ui/input.tsx";
import {Label} from "../components/ui/label.tsx";
import {Separator} from "../components/ui/separator.tsx";
import { MdSearch } from "react-icons/md";


const HomePage = () => {
    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between mx-10 my-5">
                    <div >
                        Logo
                    </div>
                    <div>
                        <Button  size="lg">
                            Login
                        </Button>
                    </div>
                </nav>
            </header>
            <div className="relative isolate z-[1]">
                {/*Background Start*/}
                <div
                    className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl"
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
                <div className="flex flex-col items-center mt-28 gap-y-4 relative z-10">
                    <span className="text-2xl font-light text-center">
                        Rocket Realtor
                    </span>
                    <span className="text-6xl font-bold text-center">
                        Real Estate Investment Analysis
                    </span>
                    <div className="flex flex-row gap-x-2 mt-10 bg-white shadow-2xl pt-2 pb-4 px-8 pr-4 rounded-full">
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
                </div>

                <div className="flex justify-center">
                    Scroll
                </div>
        </div>
    )
}

export default HomePage

