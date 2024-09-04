# Realtor Rocket: Real Estate Management Software
- Realtor Rocket is a real estate management application built using Vite+React (frontend), Express.js, Prisma and PostgreSQL (backend). 
- It is designed to help real estate agents and property managers manage their properties, tenants, leases, payments, maintenance, and more. 
- It was started as a project for my personal portfolio but has not been fully completed yet, and I am no longer working on it. 
- Setup guide is provided further below if you would like to run it locally.
- For any questions, feedback, or other inquiries, feel free to contact me at: [LinkedIn](https://www.linkedin.com/in/pablo-tanner-60977b3b/) or [Email](mailto:mail@pablotanner.com).
# Features / Overview
The app is designed to be user-friendly and intuitive, with a clean and modern design. Additionally, it was built to be responsive and mobile-friendly.
It included a variety of features, including:
## Home Page
![HomePage](/public/screenshots/home.png)

## Properties
Overview of properties, with the ability to add, edit, and delete properties.
![Properties](/public/screenshots/property.png)

## Rentals
Overview of the rental units of each property, with the ability to add, edit, and delete rentals.
![Rentals](/public/screenshots/rental_units.png)

## Financials
Various financial features, including management of tenant payments, scheduled (rent) payments, leases, as well as expenses (e.g. maintenance or electricity costs).
![Financials](/public/screenshots/financials.png)

## Tenants
Overview of the tenants including a profile page for each tenant.
![Tenants](/public/screenshots/tenants.png)

## Maintenance
Overview of maintenance requests.
![Maintenance](/public/screenshots/maintenance.png)

## Calendar and Messages (WIP)
An automatically generated calendar based on the leases and scheduled payments, as well as a messaging system (WIP).
![CalendarChat](/public/screenshots/calendar_chat.png)

## Light and Dark Mode
The app supports both light and dark mode.
![DarkMode](/public/screenshots/dark_mode.png)

# Setup Guide
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create a postgres database, either locally or using a cloud service (e.g. Neon)
4. Create a `.env` file in the root directory and add the following environment variables:
```env
VITE_PUBLIC_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
DATABASE_URL=postgres://postgres:password@localhost:5432/realtor-rocket
PORT=3000
SECRET_KEY=123
REFRESH_TOKEN_SECRET=321
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```
5. Start the development servers
```bash
npm run dev
npm run start:server
```
6. Open the app in your browser at `http://localhost:5173`