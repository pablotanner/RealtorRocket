import {z} from "zod";

export const zodInputStringPipe = (zodPipe) =>
    z
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .refine((value) => value === null || !isNaN(Number(value)), {
            message: 'Invalid input',
        })
        .transform((value) => (value === null ? 0 : Number(value)))
        .pipe(zodPipe);


export const moneyParser = (value) => {
    if (value === null || value === undefined) {
        return 'N/A'
    }
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}


// Translates "0" to "One", "2" to "Two", etc.
export const numberToLiteral = (value) => {
    if (value === null || value === undefined) {
        return 'N/A'
    }

    const numberLiterals = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
    ];

    if (value < 0) {
        return 'Negative';
    }
    else if (value > 10) {
        return String(value)
    }
    return numberLiterals[value];
}


export const dateParser = (value) => {
    if (value === null || value === undefined) {
        return 'N/A'
    }
    return new Date(value).toLocaleDateString('en-US');
}