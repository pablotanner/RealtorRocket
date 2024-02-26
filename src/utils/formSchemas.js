import {z} from "zod";
import {zodDateInputPipe, zodNumberInputPipe, zodStringPipe} from "./formatters.js";


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


export const tenantSchema = z.object({
    firstName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a first name'})})),
    lastName: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a last name'})})),
    email: zodStringPipe(z.string().or(z.null())),
    phone: zodStringPipe(z.string().or(z.null())),
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
    unitId: zodNumberInputPipe(z.string().or(z.null()).or(z.number())),
})
