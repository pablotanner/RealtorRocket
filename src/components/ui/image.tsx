import React, {useState} from "react";
import {Skeleton} from "./skeleton.tsx";


const Image = React.forwardRef<React.ElementRef<"img">, React.ComponentPropsWithoutRef<"img">>(
    ({ className, ...props }, ref) => {

        const placeholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)

        const handleImageLoaded = () => setLoading(false);
        const handleImageError = () => {
            setLoading(false);
            setError(true);
        };

        return (
            <>
                {loading ? (
                    <>
                        <Skeleton className={className}/>
                        <img
                            onLoad={handleImageLoaded}
                            onError={handleImageError}
                            alt={props.alt || "image"}
                            {...props}
                            className="hidden"
                        />
                    </>
                )
                    :
                    (error ? (
                            <img alt="placeholder" ref={ref} className={className} {...props} src={placeholder} />
                        )
                        : (
                            <img
                                onLoad={handleImageLoaded}
                                onError={handleImageError}
                                ref={ref}
                                className={className}
                                alt={props.alt || "image"}
                                {...props}
                            />

                        ))
                }
            </>
        )
    }

)

Image.displayName = "Image"

export {Image};