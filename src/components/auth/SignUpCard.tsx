import {useLoginMutation, useRegisterMutation} from "../../services/api/authApi.js";

import {Card, CardContent, CardHeader} from "../ui/card.tsx";
import {AiFillRocket} from "react-icons/ai";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {Input} from "../ui/input.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";

export const SignUpCard = () => {
    const navigate = useNavigate();
    const [register, {isLoading}] = useRegisterMutation();

    const [login, {isLoading: loginIsLoading }] = useLoginMutation();


    const signUpFormSchema = z.object({
        email: z.string().email( {message: 'Please enter a valid email address'}),
        password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
        first_name: z.string().min(1, {message: 'Please enter your first name'}),
        last_name: z.string().min(1, {message: 'Please enter your last name'}),
    }).superRefine(({ password }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            const ch = password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            //countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
                code: "custom",
                path: ["password"],
                //message: "Password does not meet complexity requirements",
                message: "Please use at least one uppercase, one lowercase letter and one number",
            });
        }
    });

    const form = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        }
    })

    function onSubmit(data) {
        register(data).then((res: any) => {
            if (res.data) {
                login({email: form.getValues('email'), password: form.getValues('password')}).then((res: any) => {
                    if (res.data) {
                        navigate("/")
                    }
                    else {
                        console.log("Login Error: ", res.error)
                    }
                })
            }
            else {
                console.log("Sign Up Error: ", res.error)
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen rounded-xl shadow-inner">
            <Card className=" shadow-2xl flex w-fit flex-col p-5">
                <CardHeader className="flex justify-center items-center py-10">
                    <AiFillRocket className="w-12 h-12"/>
                    <h1 className="text-3xl">Welcome!</h1>
                    <p className="text-muted-foreground">
                        Please enter your details to sign up.
                    </p>
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
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                        <FormDescription hidden>Enter your email address</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormDescription hidden>Enter your email address</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Family Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
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
                            <Button variant="link"  type="button" onClick={() => navigate("/login")}>
                                Already have an account? Log in
                            </Button>

                            <Button type="submit" variant="dark" isLoading={isLoading || loginIsLoading}>
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )

}
