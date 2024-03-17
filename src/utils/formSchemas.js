import {z} from "zod";
import {zodDateInputPipe, zodNumberInputPipe, zodStringPipe} from "./formatters.js";
import {isValidPhoneNumber} from "react-phone-number-input";


export const propertySchema = z.object({
    title: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a title for the property'})})),
    description: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a description'})})),
    lotSize: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    yearBuilt: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    realEstateType: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a real estate type'})})),
    marketPrice: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    street: zodStringPipe(z.string().or(z.null())),
    city: zodStringPipe(z.string().or(z.null())),
    state: zodStringPipe(z.string().or(z.null())),
    zip: zodStringPipe(z.string().or(z.null())),
    country: zodStringPipe(z.string().or(z.null())),
    images: z.array(z.string().or(z.null())),
    units: z.array(z.object({
        unitNumber: zodStringPipe(z.string().or(z.null())),
        floor: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        unitSize: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        numOfFloors: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        numOfRooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        numOfBedrooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        numOfBathrooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        garages:  zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        status: zodStringPipe(z.string().or(z.null())),
        rentalPrice:zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        images: z.array(z.string().or(z.null())),
    })),
})


export const unitSchema = z.object({
    unitIdentifier: zodStringPipe(z.string({errorMap: () => ({message: 'The unit identifier is required'})})),
    unitNumber: zodStringPipe(z.string().or(z.null())),
    floor: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    unitSize: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    numOfFloors: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    numOfRooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    numOfBedrooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    numOfBathrooms: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    garages:  zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    status: zodStringPipe(z.string().or(z.null())),
    rentalPrice:zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
})

export const leaseSchema = z.object({
    startDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
    endDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
    rentalPrice:zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    paymentFrequency: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a payment frequency'})})),
    status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a status'})})),
    notes: zodStringPipe(z.string().or(z.null())),
    unitId: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please select a unit'})}).or(z.number())),
    specialTerms: zodStringPipe(z.string().or(z.null())),
    tenantId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
})


export const tenantSchema = z.object({
    firstName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a first name'})})),
    lastName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a last name'})})),
    email: zodStringPipe(z.string().or(z.null())),
    phone: zodStringPipe(z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }).or(z.null())),
    civilStatus: zodStringPipe(z.string().or(z.null())),
    occupation: zodStringPipe(z.string().or(z.null())),
    income: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    //creditScore: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    leases: z.array(z.object({
        startDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
        endDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
        rentalPrice:zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
        paymentFrequency: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a payment frequency'})})),
        status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a status'})})),
        notes: zodStringPipe(z.string().or(z.null())),
        unitId: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please select a unit'})}).or(z.number())),
    })),
    leaseId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    unitId: zodNumberInputPipe(z.string().or(z.null()).or(z.number()).or(z.null())),
})

export const userSchema = z.object({
    firstName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a first name'})})),
    lastName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a last name'})})),
    email: zodStringPipe(z.string().email({errorMap: () => ({message: 'Please enter a valid email'})})),
    phone: zodStringPipe(z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }).or(z.null())),
    dob: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
    bio: zodStringPipe(z.string().or(z.null())),
    company: zodStringPipe(z.string().or(z.null())),
    title: zodStringPipe(z.string().or(z.null())),
    website: zodStringPipe(z.string().url({errorMap: () => ({message: 'Please enter a valid URL'})}).or(z.null())),
    street: zodStringPipe(z.string().or(z.null())),
    city: zodStringPipe(z.string().or(z.null())),
    state: zodStringPipe(z.string().or(z.null())),
    zip: zodStringPipe(z.string().or(z.null())),
    country: zodStringPipe(z.string().or(z.null())),
})


export const paymentSchema = z.object({
    amount: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please enter the payment amount'})}).or(z.number())),
    date: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date'})})),
    status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a status'})})),
    notes: zodStringPipe(z.string().or(z.null())),
    paymentMethod: zodStringPipe(z.string().or(z.null())),
    leaseId: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please select a lease'})}).or(z.number())),
})

export const leasePaymentScheduleSchema = z.object({
    dueDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date'})})),
    amountDue: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please enter the payment amount'})}).or(z.number())),
    status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a status'})})),
    leaseId: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please select a lease'})}).or(z.number())),
})

export const maintenanceReportSchema = z.object({
    title: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a title'})})),
    notes: zodStringPipe(z.string().or(z.null())),
    status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a status'})})),
    priority: zodStringPipe(z.string().or(z.null())),
    category: zodStringPipe(z.string().or(z.null())),
    reporterId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    unitId: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please select a unit'})}).or(z.number())),
})

export const expenseSchema = z.object({
    title: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a title'})})),
    amount: zodNumberInputPipe(z.string({errorMap: () => ({message: 'Please enter the expense amount'})}).or(z.number())),
    date: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date'})})),
    notes: zodStringPipe(z.string().or(z.null())),
    description: zodStringPipe(z.string().or(z.null())),
    category: zodStringPipe(z.string().or(z.null())),
    unitId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    leaseId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
    maintenanceRequestId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
})