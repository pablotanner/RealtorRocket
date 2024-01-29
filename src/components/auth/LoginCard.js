import {useEffect} from "react";
import {toast} from "react-toastify";
import {useLoginMutation} from "../../services/api/authApi.js";

import {Card, CardContent, CardHeader} from "../ui/card.tsx";
import {AiFillRocket} from "react-icons/ai";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";


import {z} from "zod";
import {useForm} from "react-hook-form";
import {Input} from "../ui/input.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";

const LoginCard = () => {

    const navigate = useNavigate();

    const [login, {isError, isLoading, error, isSuccess }] = useLoginMutation();


    const loginFormSchema = z.object({
        email: z.string().email( {message: 'Please enter a valid email address'}),
        password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
    })

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    function onSubmit(zodValues) {
        login(zodValues)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.info('Logged in successfully')
            navigate('/dashboard')
        }
        else if (isError) {
            toast.error(error?.data?.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading])


    return (
        <div className="flex justify-center items-center min-h-screen bg-white rounded-xl shadow-inner">
            <Card className="bg-white border-input shadow-2xl text-off-black flex w-fit flex-col p-5">
                <CardHeader className="flex justify-center items-center py-10">
                    <AiFillRocket className="w-12 h-12"/>
                    <h1 className="text-3xl">Welcome Back!</h1>
                </CardHeader>
                    <CardContent className="w-[275px] md:w-[350px]">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-[100%] ">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem >
                                            <FormLabel>E-Mail</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your@email.com" {...field} />
                                            </FormControl>
                                            <FormDescription hidden>Enter your email address</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription hidden>Enter your password</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="link" onClick={() => navigate("/signup")}>
                                    Don't have an account? Sign up
                                </Button>
                                <Button type="submit" variant="dark" isLoading={isLoading}>
                                    Login
                                </Button>
                            </form>
                        </Form>

                    </CardContent>

            </Card>
        </div>
    )
}

export default LoginCard;