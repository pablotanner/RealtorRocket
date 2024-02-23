import {z} from "zod";
import {zodNumberInputPipe, zodStringPipe} from "./formatters.js";


export const propertySchema = z.object({
    title: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a title for the property'})})),
    description: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a description'})})),
    lotSize: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    yearBuilt: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    realEstateType: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a real estate type'})})),
    marketPrice: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    street: zodStringPipe(z.string().or(z.null())),
    city: zodStringPipe(z.string().or(z.null())),
    state: zodStringPipe(z.string().or(z.null())),
    zip: zodStringPipe(z.string().or(z.null())),
    country: zodStringPipe(z.string().or(z.null())),
    images: zodStringPipe(z.string().or(z.null())),
})


export const unitSchema = z.object({
    unitNumber: zodStringPipe(z.string().or(z.null())),
    floor: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    unitSize: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    numOfFloors: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    numOfRooms: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    numOfBedrooms: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    numOfBathrooms: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    garages: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
    status: zodStringPipe(z.string().or(z.null())),
    rentalPrice: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
})
