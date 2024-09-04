import { Resend } from "resend";

const API_KEY = 'XYZ'

const resend = new Resend(API_KEY);

resend.domains.create({
    name: "realtorrocket.app",
})


export const sendEmail = async (to, subject, html) => {
    try {
        return await resend.emails.send({
            from: "Realtor Rocket <support@realtorrocket.app>",
            to: [to],
            subject: subject,
            html: html
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
};

/*
sendEmail("pablotanner@hotmail.ch", "Test222", "<h1>Test222</h1>").then((response) => {
    console.log(response);
}).catch((error) => {
    console.log("err",error)
})
 */
