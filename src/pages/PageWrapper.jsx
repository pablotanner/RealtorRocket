import React from "react";
import ErrorMessage from "../components/notifications/ErrorAlert.js";


const PageWrapper = (props) => {

    if (!props?.query) { return props?.children || null}

    const result = props?.query();

    const [data, { isLoading, isSuccess, error}] = [result.data, { isLoading: result.isLoading, isSuccess: result.isSuccess, error: result.error}];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
            </div>
        )
    }
    else if (isSuccess){
        return (
            <>
                {React.Children.map(props.children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { data: data });
                    }
                    return child;
                })}
            </>
        )
    }
    else {
        return (<ErrorMessage error={error}/>)
    }

}

export default PageWrapper