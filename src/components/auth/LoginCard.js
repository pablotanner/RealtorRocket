import {useEffect} from "react";
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
import {KeyRound} from "lucide-react";

const LoginCard = () => {

    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();


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
        login(zodValues).then((res) => {
            if (res.data) {
                navigate('/')
            }
        })
    }

    const DemoAccountButton = () => {
        return (
            <Button variant="gradient"
                    className="absolute top-5"
                    isLoading={isLoading}
                    type="button" onClick={
                () => onSubmit({email: "demo@account.com", password: "Demo123456"})
            }>
                <KeyRound className="w-5 h-5 mr-2"/>
                Use Demo Account
            </Button>
            )
    }


    return (
        <div className="flex justify-center items-center min-h-screen rounded-xl shadow-inner">
            <Card className="shadow-2xl  flex w-fit flex-col p-5">
                <CardHeader className="flex justify-center items-center py-10">
                    <AiFillRocket className="w-12 h-12"/>
                    <h1 className="text-3xl">Welcome Back!</h1>
                    <DemoAccountButton/>
                </CardHeader>
                    <CardContent className="w-[275px] md:w-[350px]">
                        <Form {...form}>
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
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormDescription hidden>Enter your password</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="link" type="button" onClick={() => navigate("/signup")}>
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