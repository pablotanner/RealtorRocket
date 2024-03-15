import React from "react";
import ErrorMessage from "../components/notifications/ErrorAlert.js";
import {useSelector} from "react-redux";


const PageWrapper = (props) => {
    const propertySelection = useSelector((state) => state.userSlice.selectedProperty)

    if (!props?.query) { return props?.children || null}

    const result = props?.query();

    const [data, { isLoading, isSuccess, error}] = [result.data, { isLoading: result.isLoading, isSuccess: result.isSuccess, error: result.error}];


    if (isLoading) {
        return (
            <div className='flex space-x-2 ml-4 mt-4 bg-background-light h-screen'>
                <span className='sr-only'>Loading...</span>
                <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-2 w-2 bg-primary rounded-full animate-bounce'></div>
            </div>
        )
    }
    else if (isSuccess){
        return (
            <>
                {React.Children.map(props.children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { data: data, propertySelection: propertySelection });
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