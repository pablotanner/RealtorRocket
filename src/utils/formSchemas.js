import {z} from "zod";
import {zodNumberInputPipe, zodStringPipe} from "./formatters.js";


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
