import {useSelector} from "react-redux";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage, FormValue} from "../ui/form.tsx";
import {z} from "zod";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Textarea} from "../ui/textarea.tsx";
import {useUpdateUserMutation} from "../../services/api/userApi.js";
import {useEffect, useState} from "react";
import ProfileCard from "./ProfileCard.js";
import {dateParser, zodStringPipe} from "../../utils/formatters.js";
import {userSchema} from "../../utils/formSchemas.js";
import {RealEstateType} from "../../utils/magicNumbers.js";

const titles = ['-','Mr', 'Mrs', 'Ms', 'Dr', 'Prof'];

const EditProfile = ({user}) => {

    // Add a loading state to prevent the form from rendering before the user data is fetched
    const [isLoading, setIsLoading] = useState(!user);


    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();


    const profileForm = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            title: user.title,
            website: user.website,
            bio: user.bio,
            phone: user.phone,
            dob: user.dob,
            company: user.company,
            street: user.street,
            city: user.city,
            state: user.state,
            zip: user.zip,
            country: user.country,
        },
    })

    const formValues = useWatch({
        control: profileForm.control,
        // Watch all fields for changes
        name: Object.keys(profileForm.formState.defaultValues),
    })


    const mappedValues = Object.keys(formValues).map((key,index) => {
        return {
            [Object.keys(profileForm.formState.defaultValues)[index]]: formValues[key]
        }
    }).reduce((acc, curr) => {
        return {...acc, ...curr}
    }, {})


    const onSubmit = (zodValues) => {
        updateUser(zodValues)
    }

    if (isLoading) {
        <div>
            Loading...
        </div>
    }

    return (
        <div className="mt-2 flex flex-col md:flex-row gap-6">
            <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-[100%] ">
                    <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>Family Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row gap-x-2">
                        <FormField
                            control={profileForm.control}
                            name="title"
                            render={({field}) => (
                                <FormItem className="w-[50%]">
                                    <FormLabel>Title</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                titles.map((item, index) => {
                                                    return (
                                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileForm.control}
                            name="dob"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={profileForm.control}
                        name="company"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Your Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Company Name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea name="bio" className="resize-none" placeholder="Tell us about yourself" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="phone" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="website"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormGroup>
                        <FormField
                            control={profileForm.control}
                            name="street"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={profileForm.control}
                            name="zip"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>ZIP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </FormGroup>

                    <FormGroup>
                        <FormField
                            control={profileForm.control}
                            name="city"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={profileForm.control}
                            name="state"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </FormGroup>

                    <FormField
                        control={profileForm.control}
                        name="country"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="dark" isLoading={isUpdating}>
                        Update
                    </Button>
                </form>
            </Form>
            <ProfileCard {...mappedValues} />
        </div>
    )
}

export default EditProfile;