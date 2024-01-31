
import {Alert, AlertTitle, AlertDescription} from "../ui/alert.tsx";
import {XOctagon} from "lucide-react";

const ErrorMessage = ({ error }) => {

    let message = "An error occurred";

    if (error && (error?.status === 401 || error?.status === 403)) {
        message = "You are not authorized to perform this action";
    }

    if (error && error?.data && error?.data?.message) {
        message = error?.data?.message;
    }

    return (
        <Alert variant="destructive">
            <XOctagon className="w-4 h-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}

export default ErrorMessage;