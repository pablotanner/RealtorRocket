import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {useNavigate} from "react-router-dom";
import {ArrowRightIcon} from "lucide-react";


const InfoCard = ({title, number, link}) => {
    const navigate = useNavigate()

    return (
        <Card className="basis-[200px] flex-grow min-w-fit shadow-sm">
            <CardHeader className="px-4 py-2 pb-0 flex flex-row justify-between items-center">
                <CardTitle className="text-md text-gray-600 font-400 whitespace-nowrap">
                    {title}
                </CardTitle>
                <div className="cursor-pointer rounded-full hover:bg-background-gray-darker p-2" onClick={() => navigate(link)}>
                    <ArrowRightIcon className="w-6 h-6 text-gray-600"/>
                </div>
            </CardHeader>
            <CardContent className="py-4 px-4 mb-4 text-3xl">
                {number}
            </CardContent>
        </Card>
    )
}

export default InfoCard