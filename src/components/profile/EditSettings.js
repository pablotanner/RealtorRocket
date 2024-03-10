import {Button} from "../ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSelector} from "react-redux";
import {useDeleteUserMutation, useUpdateUserMutation} from "../../services/api/userApi.js";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog.tsx";
import {Input} from "../ui/input.tsx";
import {Label} from "../ui/label.tsx";
import {ComputerIcon, Moon, Sun} from "lucide-react";
import {useTheme} from "../../services/contexts/ThemeContext.tsx";
import {cn} from "../../utils.ts";

const currencies = [
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
]

const EditSettings = () => {
    const userData = useSelector(state => state.authSlice.userInfo);

    const { setTheme } = useTheme()

    // Get current theme
    const currentTheme = localStorage.getItem("vite-ui-theme");

    const [updateSettings, {isLoading, isError, error, isSuccess}] = useUpdateUserMutation();

    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation();

    const settingsFormSchema = z.object({
        currencyCode: z.string().or(z.null()).or(z.undefined()),
    })

    const settingsForm = useForm({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            currencyCode: userData.currencyCode,
            deleteConfirmation: "",
        },
    })

    const deleteConfirmation = settingsForm.watch("deleteConfirmation"); // Add this line


    function onSubmit(data) {
        updateSettings(data);
    }


    const themes = [
        {
            label: "Light",
            icon: <Sun/>,
            value: "light"
        },
        {
            label: "Dark",
            icon: <Moon/>,
            value: "dark"
        },
        {
            label: "System",
            icon: <ComputerIcon/>,
            value: "system"
        }
    ]

    return (
        <div className="mt-2 w-[100%]">
            <div>
                <p className="text-muted-foreground text-sm">
                    Appearance
                </p>

                <div className="flex flex-row gap-4 p-1">


                    {themes.map((theme, index) => {

                        if (theme.value === "system") {
                            return (
                                <div key={index} className="flex flex-col gap-2">
                                    <div
                                        className={cn("w-16 h-16 cursor-pointer flex outline-4 outline-foreground hover:outline rounded-lg",  currentTheme === theme.value && " outline rounded-lg ")}
                                        onClick={() => setTheme(theme.value)}
                                    >
                                        <div className="h-full w-full bg-gray-50 rounded-l-lg p-1 border-2 border-gray-50 border-r-0">
                                            <p className="font-500 text-lg text-black">
                                                Aa
                                            </p>
                                        </div>
                                        <div className="h-full w-full bg-gray-800 rounded-r-lg p-1 border-2 border-black border-l-0">
                                            <p className="font-500 text-lg text-white">
                                                Aa
                                            </p>
                                        </div>


                                    </div>
                                    <p className="text-foreground font-500">
                                        {theme.label}
                                    </p>
                                </div>
                            )
                        }

                        return (
                            (
                                <div key={index} className="flex flex-col gap-2">
                                    <div
                                        className={cn("p-2 cursor-pointer rounded-lg w-16 h-16 border-2 outline-4 outline-foreground hover:outline", theme.value === "light" && "bg-gray-50 border-gray-100 text-black", theme.value === "dark" && "bg-gray-900 text-white border-gray-800", currentTheme === theme.value && " outline")}
                                        onClick={() => setTheme(theme.value)}
                                    >

                                        <p className="font-500 text-lg">
                                            Aa
                                        </p>

                                    </div>
                                    <p className="text-foreground font-500">
                                        {theme.label}
                                    </p>
                                </div>

                            )
                        )
                    })}
                </div>
            </div>

            <div className="w-full h-[2px] bg-border my-4"/>

            <Form {...settingsForm}>
                <form onSubmit={settingsForm.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-[100%] ">
                    <FormField
                        control={settingsForm.control}
                        name="currencyCode"
                        render={({field}) => (
                            <FormItem className="min-w-fit w-[20%]">
                                <FormLabel>Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-10">
                                        {currencies.map((item, index) => (
                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="dark" className="min-w-[200px] w-[20%]" isLoading={isLoading}>
                        Save
                    </Button>
                </form>
            </Form>

            <AlertDialog>
                <AlertDialogTrigger className="mt-24">
                    <Button variant="link" className="pl-0 text-red-600 z-0">
                        Delete Account
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        <Label>Type 'DELETE' below to continue.</Label>
                        <Input {...settingsForm.register("deleteConfirmation")}/>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-400 text-white"
                            disabled={deleteConfirmation !== "DELETE"}
                            isLoading={isDeleting}
                            onClick={() => deleteUser()}
                        >
                            {isDeleting ? "Deleting..." : "Delete My Account"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )

}

export default EditSettings;