import React, {useEffect, useState} from "react";
import {
    AlertTriangle, Archive,
    ArrowLeft,
    ArrowRight, BadgeCheck,
    BuildingIcon,
    Check, CheckCircle2,
    CrossIcon, DoorClosed,
    Home,
    Image,
    Info,
    ListIcon,
    MapPin, Plus,
    SquareIcon,
    SquareStack, UserSearch, XIcon
} from "lucide-react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {propertySchema, tenantSchema} from "../../utils/formSchemas.js";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormGroup,
    FormItem,
    FormLabel,
    FormMessage,
    FormValue
} from "../../components/ui/form.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";
import {
    CivilStatus,
    getRealEstateIcon,
    LeaseStatus,
    ListingStatus,
    PaymentFrequency
} from "../../utils/magicNumbers.js";
import {RealEstateType} from "../../utils/magicNumbers.js";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../../components/ui/carousel.tsx";
import {Button} from "../../components/ui/button.tsx";
import {useCreatePropertyMutation} from "../../services/api/propertyApi.js";
import {useNavigate} from "react-router-dom";
import {addDays} from "date-fns";
import LeaseSelection from "../../components/comboboxes/LeaseSelection.js";
import {useSelector} from "react-redux";
import {selectAllLeases, selectAllUnits} from "../../services/slices/objectSlice.js";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {Alert, AlertDescription, AlertTitle} from "../../components/ui/alert.tsx";
import RentalSelection from "../../components/comboboxes/RentalSelection.js";
import {useCreateTenantMutation} from "../../services/api/tenantApi.js";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../components/ui/tooltip.tsx";
import {BiQuestionMark} from "react-icons/bi";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {Progress} from "../../components/ui/multi-step.js";


const TenantCreation = () => {

    const navigate = useNavigate();

    const leases = useSelector(state =>  selectAllLeases(state))

    const units = useSelector(state => selectAllUnits(state))

    const [createTenant, {isLoading: isCreating}] = useCreateTenantMutation()

    const [tab, setTab] = useState(1)

    const [leaseOption, setLeaseOption] = useState("new")



    const leaseOptions = [
        {
            title: "New Lease",
            description: "Select this option if you want to create a new lease for the tenant",
            icon: <Plus className="w-6 h-6" />,
            value: "new"
        },
        {
            title: "Existing Lease",
            description: "Select this option if you want to assign an existing lease to the tenant",
            icon: <Archive className="w-6 h-6" />,
            value: "existing"
        }]



    const tenantForm = useForm(({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            civilStatus: "",
            occupation: "",
            income: "",
            creditScore: "",
            leases: [
                {
                    startDate: "",
                    endDate: "",
                    rentalPrice: "",
                    paymentFrequency: "MONTHLY",
                    status: "ACTIVE",
                    notes: "",
                    unitId: ""
                }
            ],
            leaseId: "",
            unitId: ""
        },
    }))

    const [tabStates, setTabStates] = useState([
        {
            title: "Tenant Information",
           // description: "Provide information about the tenant",
            status: "incomplete",
            //icon: <UserSearch />
        },
        {
            title: "Lease Assignment",
            //description: "Assign a lease to the tenant",
            status: "incomplete",
            //icon: <ListIcon />
        },
        {
            title: "Unit Assignment",
            //description: "Assign the tenant to a unit",
            status: "incomplete",
            //icon: <DoorClosed />
        },
        {
            title: "Confirmation",
            //description: "Review and confirm",
            status: "incomplete",
            //icon: <CheckCircle2 />
        }
    ])

    const LeaseWarning = () => {
        const leaseId = tenantForm.getValues("leaseId")
        if (leaseId === "" || leaseId === null || leaseId === undefined) return null
        const lease = leases?.find(lease => lease.id === leaseId)

        if (lease.tenant) {
            return (
                <Alert variant="destructive">
                    <AlertTriangle  className="h-5 w-5"/>
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        This lease is already assigned to a tenant. If you proceed, the lease will be reassigned to the new tenant.
                    </AlertDescription>
                </Alert>
            )
        }
    }

    const UnitWarning = () => {
        const unitId = tenantForm.getValues("unitId")
        if (unitId === "" || unitId === null || unitId === undefined) return null
        const unit = units?.find(unit => unit.id === unitId)

        if (unit?.tenantId) {
            return (
                <Alert variant="destructive">
                    <AlertTriangle  className="h-5 w-5"/>
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        This unit is already assigned to a tenant. If you proceed, the unit will be reassigned to the new tenant.
                    </AlertDescription>
                </Alert>
            )
        }
    }

    const selectedUnit = units.find(unit => unit.id === tenantForm.getValues("unitId"))



    function setTabStatus(index, status){
        const newTabStates = [...tabStates]
        newTabStates[index - 1].status = status
        setTabStates(newTabStates)
    }

    // Watch for changes in the form


    const formValues = useWatch({
            control: tenantForm.control,
            name: ["firstName", "lastName", "email", "phone", "occupation", "civilStatus", "income", "leases[0].startDate", "leases[0].endDate", "leases[0].rentalPrice", "leases[0].paymentFrequency", "leases[0].status"]

    }
    )



    useEffect(() => {
        //if (tenantForm.formState.isValid && tenantForm.getValues("unitId") !== ""){
        if (tenantForm.formState.isValid){
            setTabStatus(3, "complete")
        }
        else{
            setTabStatus(3, "incomplete")
            setTabStatus(4, "incomplete")
        }
        if (tenantForm.formState.isValid) {
            setTabStatus(2, "complete")
        }
        else {
            setTabStatus(2, "incomplete")
            setTabStatus(3, "incomplete")
            setTabStatus(4, "incomplete")
        }

        // If first tab is valid, set it to complete
        if (tenantForm.formState.isValid || (!(tenantForm.getValues("firstName") === "") && !(tenantForm.getValues("lastName") === ""))) {
            setTabStatus(1, "complete")
        }
        else {
            // otherwise disable all
            setTabStatus(1, "incomplete")
            setTabStatus(2, "incomplete")
            setTabStatus(3, "incomplete")
            setTabStatus(4, "incomplete")
        }

        if (leaseOption === "existing" && tenantForm.getValues("leaseId") === ""){
            setTabStatus(2, "incomplete")
            setTabStatus(3, "incomplete")
            setTabStatus(4, "incomplete")
        }

    }, [formValues, tenantForm.formState.isValid, tenantForm.getValues("unitId"), leaseOption])


    const leaseStartDate = useWatch({
        control: tenantForm.control,
        name: "leases[0].startDate"
    })

    const leaseEndDate = useWatch({
        control: tenantForm.control,
        name: "leases[0].endDate"
    })


    useEffect(() => {
        tenantForm.trigger(["leases[0].startDate"])
    }, [leaseStartDate]);

    useEffect(() => {
        tenantForm.trigger(["leases[0].endDate"])
    }, [leaseEndDate]);


    const onSubmit = (data) => {
        const body = {...data}
        const leaseId = body.leaseId

        if (leaseOption === "new") {
            body.lease = body.leases[0]
        }

        delete body.leaseId
        delete body.leases

        createTenant({bodyData: body, leaseId: leaseId}).then((res) => {
            if (res.error) console.log(res.error);
            else {
                navigate("/tenants/" + res?.data?.data?.id)
            }

        })
    }



    const StepTab = ({title, status, index}) => {
        let isDisabled = index !== 1 && tabStates[index - 2].status !== "complete"


        return (
            <div
                data-disabled={isDisabled}
                data-selected={tab === index}
                className="p-4 border-b-2 border-border select-none flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start w-full hover:border-primary cursor-pointer data-[selected='true']:border-primary data-[disabled='true']:opacity-50 data-[disabled='true']:cursor-not-allowed data-[disabled='true']:hover:border-secondary"
                onClick={() => {
                    if (isDisabled) return
                    setTab(index);
                    tenantForm.clearErrors();
                }}
            >
                <div
                    data-complete={status==="complete"}
                    data-selected={tab === index}
                    data-previous={tab > index}
                    className="p-2 md:p-4 flex w-8 h-8 md:w-14 md:h-14 items-center justify-center text-md md:text-xl border border-border text-gray-400 rounded-lg data-[previous='true']:bg-secondary data-[selected='true']:bg-primary data-[selected='true']:text-white">
                    {index}
                </div>

                <div
                    data-selected={tab === index}
                    className="text-foreground font-500 text-xs md:text-sm text-center data-[selected='true']:text-primary">
                    {title}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 relative mb-16">
            <h1>
                Create Tenant
            </h1>

            <div className="flex flex-row justify-between overflow-auto mb-4">
                {tabStates.map((tab, index) => {
                    return (
                        <StepTab title={tab.title} status={tab.status} index={index + 1} key={index}/>
                    )
                })}
            </div>

            <div
                data-selected={tab === 1}
                className=" data-[selected='false']:hidden">
                <Form {...tenantForm}>
                    <form  onSubmit={tenantForm.handleSubmit(onSubmit)} className="flex flex-col flex-wrap gap-4">

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <Info/>
                                Tenant Information
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">

                                <FormGroup useFlex>
                                    <FormField
                                        control={tenantForm.control}
                                        name="firstName"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>First Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={tenantForm.control}
                                        name="lastName"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>Last Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </FormGroup>

                                <div className="w-full h-[1px] mt-1 bg-secondary"/>


                                <FormGroup useFlex>
                                    <FormField
                                        control={tenantForm.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>E-Mail</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@doe.com" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={tenantForm.control}
                                        name="phone"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" type="phone" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </FormGroup>

                                <div className="w-full h-[1px] mt-1 bg-secondary"/>

                                <FormGroup useFlex>
                                    <FormField
                                        control={tenantForm.control}
                                        name="occupation"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>Occupation</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nurse" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={tenantForm.control}
                                        name="income"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>Income</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" type="currency" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </FormGroup>

                                <FormField
                                    control={tenantForm.control}
                                    name="civilStatus"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Civil Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                       {
                                                           Object.keys(CivilStatus).map((status, index) => {
                                                               return (
                                                                   <SelectItem key={index} value={status}>{CivilStatus[status]}</SelectItem>
                                                               )
                                                           })
                                                       }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                        </Card>

                    </form>
                </Form>

            </div>


            <div
                data-selected={tab === 2}
                className=" data-[selected='false']:hidden">


                <Form {...tenantForm}>
                    <form
                          className="flex flex-col flex-wrap gap-4 overflow-auto">

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <ListIcon/>
                                Lease Assignment
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col sm:flex-row gap-4">

                                {leaseOptions.map((option, index) => {
                                    return (
                                        <div
                                            key={index}
                                            data-active={option.value === leaseOption}
                                            className="rounded-lg flex-shrink relative border-border border-2 shadow-md p-4 flex items-center justify-center cursor-pointer data-[active=true]:bg-gradient-to-br from-primary-accent to-background-light data-[active=true]:text-primary data-[active=true]:border-primary"
                                            onClick={() => {
                                                if (leaseOption === option.value) return

                                                setLeaseOption(option.value);
                                                tenantForm.setValue("leaseId", "");
                                                tenantForm.trigger(["leaseId"])



                                            }
                                        }
                                        >
                                            <div className="text-xl font-600 flex flex-col gap-3">
                                                <div className="p-2 bg-background-light border border-border rounded-lg w-fit shadow-sm">
                                                    {option.icon}
                                                </div>

                                                {option.title}
                                                <p
                                                    data-active={option.value === leaseOption}
                                                    className="text-xs md:text-sm lg:text-md font-400 data-[active='true']:text-primary/80"
                                                >
                                                    {option.description}
                                                </p>

                                                <div className="absolute -top-3 border-2 border-background-light -right-3 p-1 bg-primary rounded-full"
                                                     hidden={leaseOption !== option.value}>
                                                    <Check className="text-white w-4 h-4"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                            </CardContent>
                        </Card>


                        <Card className="">
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                {
                                    leaseOption === "new" ? <Plus className="w-6 h-6" /> : <Archive className="w-6 h-6" />
                                }

                                {
                                    leaseOption === "new" ? "New Lease" : "Existing Lease"
                                }

                            </CardHeader>
                            <CardContent className="flex flex-col gap-4 p-4">

                                {
                                    leaseOption === "new" ? (
                                        <p className="">
                                            If you want to automatically generate planned payments for the lease, please select the payment frequency, rental price, and set the lease status to active.
                                        </p> )
                                        :
                                        (
                                            <div className="flex flex-col gap-4">
                                                Please select an existing lease to assign to the tenant.

                                                <LeaseSelection selected={tenantForm.getValues("leaseId")} onSelect={(id) => {
                                                    if (id === "" || id === null || id === undefined){
                                                        tenantForm.setValue("leases[0].startDate", "")
                                                        tenantForm.setValue("leases[0].endDate", "")
                                                        tenantForm.setValue("leases[0].rentalPrice", "")
                                                        tenantForm.setValue("leases[0].paymentFrequency", "MONTHLY")
                                                        tenantForm.setValue("leases[0].status", "ACTIVE")
                                                        tenantForm.setValue("leases[0].notes", "")
                                                        tenantForm.setValue("leases[0].unitId", "")
                                                        tenantForm.setValue("unitId", "")
                                                        tenantForm.setValue("leaseId", "")
                                                        tenantForm.trigger()
                                                        return
                                                    }
                                                    const lease = leases.find(lease => lease.id === id)
                                                    tenantForm.setValue("leaseId", lease.id)
                                                    tenantForm.setValue("leases[0].startDate", lease.startDate)
                                                    tenantForm.setValue("leases[0].endDate", lease.endDate)
                                                    tenantForm.setValue("leases[0].rentalPrice", lease.rentalPrice)
                                                    tenantForm.setValue("leases[0].paymentFrequency", lease.paymentFrequency)
                                                    tenantForm.setValue("leases[0].status", lease.status)
                                                    tenantForm.setValue("leases[0].notes", lease.notes)
                                                    tenantForm.setValue("leases[0].unitId", lease.unitId)
                                                    tenantForm.setValue("unitId", lease.unitId)
                                                    tenantForm.trigger()
                                                }} leases={leases} />


                                                <LeaseWarning/>
                                            </div>

                                        )
                                }

                                {
                                    leaseOption === "new" || (leaseOption === "existing" && tenantForm.getValues("leaseId") !== "")  ? (
                                        <>

                                            <FormGroup useFlex  >

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].unitId"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>Unit *</FormLabel>
                                                            <FormControl>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        <RentalSelection className="w-full"  onSelect={(id) => {
                                                                            if (id === "" || id === null || id === undefined){
                                                                                tenantForm.setValue("leases[0].unitId", "")
                                                                                tenantForm.setValue("unitId", "")
                                                                                tenantForm.trigger(["leases[0].unitId", "unitId"])
                                                                                return
                                                                            }
                                                                            tenantForm.setValue("leases[0].unitId", id)
                                                                            tenantForm.setValue("unitId", id)
                                                                            tenantForm.trigger(["leases[0].unitId","unitId"])
                                                                        }} selected={tenantForm.getValues("leases[0].unitId")} units={units}  />
                                                                    ) : (
                                                                        <FormValue>{units?.find((unit) => unit.id === field.value
                                                                        )?.unitIdentifier}</FormValue>
                                                                    )
                                                                }

                                                            </FormControl>
                                                            <FormMessage/>
                                                            <FormDescription>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        "What unit would you like to create a lease for?"
                                                                    ) : (
                                                                        "This is the unit that the lease is currently assigned to."
                                                                    )
                                                                }
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].startDate"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>Start Date *</FormLabel>
                                                            <FormControl>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        <Input type="date"  {...field} />
                                                                    ) : (
                                                                        <FormValue>{dateParser(field.value)}</FormValue>
                                                                    )
                                                                }
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].endDate"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>End Date *</FormLabel>
                                                            <FormControl>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        <Input type="date"  {...field} />
                                                                    ) : (
                                                                        <FormValue>{dateParser(field.value)}</FormValue>
                                                                    )
                                                                }
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                            </FormGroup>

                                            <FormGroup useFlex>

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].rentalPrice"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>Rental Price</FormLabel>
                                                            <FormControl>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        <Input placeholder="2000"  type="currency" {...field} />
                                                                    ) : (
                                                                        <FormValue>{moneyParser(field.value)}</FormValue>
                                                                    )
                                                                }
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].paymentFrequency"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Payment Frequency *</FormLabel>
                                                            {
                                                                leaseOption === "new" ? (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select..." />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            {
                                                                                Object.keys(PaymentFrequency).map((frequency, index) => {
                                                                                    return (
                                                                                        <SelectItem key={index} value={frequency}>{PaymentFrequency[frequency]}</SelectItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </SelectContent>
                                                                    </Select>
                                                                ) : (
                                                                    <FormValue>
                                                                        <div>
                                                                            {PaymentFrequency[field.value]}
                                                                        </div>
                                                                    </FormValue>
                                                                )
                                                            }

                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].status"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>Lease Status</FormLabel>

                                                            {
                                                                leaseOption === "new" ? (
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select..." />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            {
                                                                                Object.keys(LeaseStatus).map((status, index) => {
                                                                                    return (
                                                                                        <SelectItem key={index} value={status}>{LeaseStatus[status]}</SelectItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </SelectContent>
                                                                    </Select>
                                                                ) : (
                                                                    <FormValue>
                                                                        <div>
                                                                            {LeaseStatus[field.value]}
                                                                        </div>
                                                                    </FormValue>
                                                                )
                                                            }
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <FormField
                                                    control={tenantForm.control}
                                                    name="leases[0].notes"
                                                    render={({field}) => (
                                                        <FormItem  >
                                                            <FormLabel>Notes</FormLabel>
                                                            <FormControl>
                                                                {
                                                                    leaseOption === "new" ? (
                                                                        <Input placeholder="Enter any relevant notes here" {...field} />
                                                                    ) : (
                                                                        <FormValue>
                                                                            {field.value}
                                                                        </FormValue>
                                                                    )
                                                                }
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                            </FormGroup>

                                        </>
                                    ) : null
                                }



                            </CardContent>
                        </Card>



                    </form>
                </Form>
            </div>

            <div
                data-selected={tab === 3}
                className=" data-[selected='false']:hidden">


                <Form {...tenantForm}>
                    <form className="flex flex-col flex-wrap gap-4 overflow-auto">

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <UserSearch/>
                                Unit Assignment
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="ml-1 cursor-pointer">
                                                    <AiOutlineQuestionCircle className="w-5 h-5"/>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="mb-1">
                                                <p>
                                                    This is used to track the current tenant assigned to the unit.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </TooltipProvider>


                            </CardHeader>
                            <CardContent className="p-6 flex flex-col gap-4">

                                <p>
                                    Please select the unit that the tenant is currently assigned to, if you don't want to assign a unit, leave this field empty.
                                </p>

                                <UnitWarning/>

                                <RentalSelection onSelect={(id) => {
                                    if (id === "" || id === null || id === undefined){
                                        tenantForm.setValue("unitId", "")
                                        tenantForm.trigger(["unitId"])
                                        return
                                    }
                                    tenantForm.setValue("unitId", id)
                                    tenantForm.trigger(["unitId"])
                                }} selected={tenantForm.getValues("unitId")} units={units}  />

                                {
                                selectedUnit ? (
                                    <>
                                        <FormGroup >
                                            <FormItem>
                                                <FormLabel>Unit Identifier</FormLabel>
                                                <FormValue>
                                                    <p>
                                                        {selectedUnit?.unitIdentifier}

                                                    </p>
                                                </FormValue>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Current Tenant</FormLabel>
                                                <FormValue>
                                                    <p>
                                                        {selectedUnit?.tenant ? selectedUnit?.tenant?.firstName + " " + selectedUnit?.tenant?.lastName : "N/A"}

                                                    </p>
                                                </FormValue>
                                            </FormItem>
                                        </FormGroup>

                                        <FormGroup >
                                            <FormItem>
                                                <FormLabel>Unit Number</FormLabel>
                                                <FormValue>
                                                    <p>
                                                        {selectedUnit?.unitNumber || "N/A"}

                                                    </p>
                                                </FormValue>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Floor</FormLabel>
                                                <FormValue>
                                                    <p>
                                                        {selectedUnit?.floor !== null ? selectedUnit?.floor : "N/A"}
                                                    </p>
                                                </FormValue>
                                            </FormItem>
                                        </FormGroup>


                                    </>

                                ) : null


                                }



                            </CardContent>
                        </Card>

                    </form>
                </Form>
            </div>



            <div
                data-selected={tab === 4}
                className=" data-[selected='false']:hidden">

                <Card>
                    <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                        <BadgeCheck/>
                        Confirmation
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">

                        You are about to create a tenant with the following details. Please review and confirm.

                        <div className="grid grid-cols-2">
                            <div className="">
                                <p className="font-400 text-muted-foreground">
                                    Tenant Name
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {tenantForm.getValues("firstName")} {tenantForm.getValues("lastName")}
                                </p>
                            </div>


                            <div className="">
                                <p className="font-400 text-muted-foreground">
                                    Lease Assignment
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {leaseOption === "new" ? "New Lease" : "Existing Lease"}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="">
                                <p className="font-400 text-muted-foreground">
                                    Lease Dates
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {dateParser(tenantForm.getValues("leases[0].startDate"))} - {dateParser(tenantForm.getValues("leases[0].endDate"))}
                                </p>
                            </div>


                            <div className="">
                                <p className="font-400 text-muted-foreground">
                                    Payment Frequency
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {PaymentFrequency[tenantForm.getValues("leases[0].paymentFrequency")]}
                                </p>
                            </div>
                        </div>


                        <div className="grid grid-cols-1">
                            <div className="">
                                <p className="font-400 text-muted-foreground">
                                    Unit Assignment
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {selectedUnit ? selectedUnit.unitIdentifier : "N/A"}
                                </p>
                            </div>

                        </div>



                    </CardContent>
                </Card>


            </div>


            <div className="fixed bottom-0 left-0 z-20 w-full flex flex-row bg-background-light px-6 h-16 items-center border-y-2 border-border justify-between">
                <Button
                    variant="outline"
                    disabled={tab === 1}
                    onClick={() => {
                        if (tab > 1){
                            setTab(tab - 1)
                        }
                    }}
                    type="button"

                >
                    <ArrowLeft className="w-4 h-4 mr-1"/>
                    Back
                </Button>
                <Button
                    type={tab === 4 ? "submit" : "button"}
                    variant="outline"
                    isLoading={isCreating}
                    onClick={() => {
                    tenantForm.trigger(["firstName", "lastName", "email", "phone", "occupation", "income"])

                    if (tab === 2){
                        tenantForm.trigger(["leases[0].startDate", "leases[0].endDate", "leases[0].rentalPrice", "leases[0].paymentFrequency", "leases[0].status", "leases[0].unitId"])
                    }

                    if (tab === 4 && tabStates[tab - 2].status === "complete"){
                        tenantForm.handleSubmit(onSubmit)()
                    }
                    else if (tab === 4 && tabStates[tab - 2].status !== "complete"){

                    }
                    else if (tabStates[tab - 1].status === "complete"){
                        setTab(tab + 1)
                        tenantForm.clearErrors();
                    }

                }}
                >
                    {tab === 4 ? "Create" : "Next"}
                    {tab === 4 ? <Plus className="w-4 h-4 ml-1"/> : <ArrowRight className="w-4 h-4 ml-1"/>}
                </Button>

            </div>

        </div>
    )
}

export default TenantCreation