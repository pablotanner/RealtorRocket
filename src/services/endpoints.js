import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const baseUrl = process.env.API_URL;

export const endpoints = {
    "login": baseUrl + "/login",
    "signup": baseUrl + "/signup",
}