import {z} from "zod";


export function getLang() {
    if (navigator.languages != undefined)
        return navigator.languages[0];
    return navigator.language;
}

// Turns empty strings into null
export const zodStringPipe = (zodPipe) =>
    z
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .pipe(zodPipe);

// Transforms a Zod string into a nullable number (0 if empty)

function getDateString(date) {
    // If date is date object, return it as string
    if (date instanceof Date) {
        let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return utcDate.toISOString();
    }
    // If date is string, return it as is
    if (typeof date === 'string') {
        return date;
    }
}

export function getDateTimeString(date) {
    // If date is date object, and has time, return it as string
    if (date instanceof Date && date.toISOString().includes('T')) {
        let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        return utcDate.toISOString();
    }
    // If date is string, and has time, return it as is
    if (typeof date === 'string' && date.includes('T')) {
        return date;
    }
    // If date is date object, and has no time, return it as string with time
    if (date instanceof Date) {
        let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return utcDate.toISOString() + 'T00:00:00';
    }
    // If date is string, and has no time, return it as is with time
    if (typeof date === 'string') {
        return date + 'T00:00:00';
    }
}


// Accepts dates in format "yyyy-mm-dd" or if empty string, returns null, also if no time is provided, it will default to 00:00:00
export const zodDateInputPipe = (zodPipe) =>
    z
        .string()
        .or(z.date())
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .refine((value) => value === null || !isNaN(Date.parse(value)), {
            message: 'Invalid input',
        })
        //.transform((value) => (value === null ? null : new Date(value)))
        .transform((value) => (value === null ? null :
            getDateTimeString(value) )
        )
        .pipe(zodPipe);


export const zodNumberInputPipe = (zodPipe) =>
    z
        .string()
        .or(z.number())
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .refine((value) => value === null || !isNaN(Number(value)), {
            message: 'Invalid input',
        })
        .transform((value) => (value === null ? null : Number(value)))
        .pipe(zodPipe);


export const moneyParser = (value) => {
    if (value === null || value === undefined) {
        return null;
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
        return null;
    }
    const locale = getLang();

    return new Date(value).toLocaleDateString(locale);
}

// Gives the date placeholder depending on locale, e.g. "mm/dd/yyyy" or "dd/mm/yyyy"
export function getDatePlaceholder() {
    const locale = getLang();
    if (locale === 'en-US') {
        return 'mm/dd/yyyy';
    }
    return 'dd.mm.yyyy';


}