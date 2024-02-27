
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "./toast.tsx"
import { useToast } from "./use-toast.tsx"
import {AlertCircle, CheckCircle, CheckCircle2} from "lucide-react";

export function Toaster() {
    const { toasts } = useToast()


    const VariantColors = {
        success: "border-[#079455]",
        error: "border-[#D92D20]",
    }

    const TypeIcons = {
        success: <CheckCircle2 className="h-5 w-5 text-[#079455]" />,
        error: <AlertCircle className="h-5 w-5 text-[#D92D20]" />,
        warning: <AlertCircle className="h-5 w-5" />,
        info: <AlertCircle className="h-5 w-5" />,
    }

    const ToastIcon = ({variant}) => {
        const color = VariantColors[variant]

        return (
            <div className={`p-[2px] rounded-full border-2 ${color} border-opacity-20`}>
                <div className={`p-[2px] rounded-full border-2 ${color} border-opacity-40`}>
                    {TypeIcons[variant]}
                </div>
            </div>


        )
    }

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id}
                    className="flex items-start justify-start"
                           {...props}>
                        {
                            props?.variant === "success" || props?.variant === "error" ? (
                                    <ToastIcon  variant={props?.variant}/>
                                )
                                : null
                        }
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
