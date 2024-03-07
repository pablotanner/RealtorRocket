import {useGetPropertiesQuery, useGetPropertyQuery} from "../services/api/propertyApi.js";
import PageWrapper from "./PageWrapper.jsx";
import Properties from "./content/Properties.jsx";
import Home from "./content/Home.jsx";
import PropertyDetail from "./content/PropertyDetail.jsx";
import {useParams} from "react-router-dom";
import Tenants from "./content/Tenants.jsx";
import Rentals from "./content/Rentals.jsx";
import RentalDetail from "./content/RentalDetail.jsx";
import {useGetUnitQuery, useGetUnitsQuery} from "../services/api/unitApi.js";
import {useGetTenantQuery, useGetTenantsQuery} from "../services/api/tenantApi.js";
import {useGetLeasesQuery} from "../services/api/leaseApi.js";
import Financials from "./content/Financials.jsx";
import Calendar from "./content/Calendar.jsx";
import TenantProfile from "./content/TenantProfile.jsx";
import Explorer from "./content/Explorer.jsx";
import PropertyCreation from "./content/PropertyCreation.jsx";
import TenantCreation from "./content/TenantCreation.jsx";
import {useGetUserQuery} from "../services/api/userApi.js";
import Account from "./content/Account.jsx";
import Messages from "./content/Messages.jsx";
import {useGetMessagesQuery} from "../services/api/messageApi.js";
import MaintenanceReports from "./content/Maintenance.jsx";
import {useGetMaintenanceReportsQuery} from "../services/api/maintenanceApi.js";

export const AccountPage = () => {
    return (
        <PageWrapper query={useGetUserQuery}>
            <Account/>
        </PageWrapper>
    )
}
export const PropertiesPage = () => {
    return (
        <PageWrapper query={useGetPropertiesQuery}>
            <Properties/>
        </PageWrapper>
    )
}

export const PropertyDetailPage = () => {
    const {id} = useParams();

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageWrapper query={() => useGetPropertyQuery(id)}>
            <PropertyDetail/>
        </PageWrapper>
    )
}

export const PropertyCreationPage = () => {
    return (
        <PropertyCreation/>
    )
}

export const HomePage = () => {
    return (
        <PageWrapper>
            <Home/>
        </PageWrapper>
    )
}

export const TenantsPage = () => {
    return (
        <PageWrapper query={useGetTenantsQuery}>
            <Tenants/>
        </PageWrapper>
    )
}

export const TenantCreationPage = () => {
    return (
        <TenantCreation/>
    )
}


export const TenantProfilePage = () => {
    const {id} = useParams();

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageWrapper query={() => useGetTenantQuery(id)}>
            <TenantProfile/>
        </PageWrapper>
    )
}

export const RentalsPage = () => {
    return (
        <PageWrapper query={useGetUnitsQuery}>
            <Rentals/>
        </PageWrapper>
    )
}

export const RentalDetailPage = () => {
    const {id} = useParams();

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageWrapper query={() => useGetUnitQuery(id)}>
            <RentalDetail/>
        </PageWrapper>
    )
}

export const FinancialsPage = () => {
    return (
        <PageWrapper query={useGetLeasesQuery}>
            <Financials/>
        </PageWrapper>
    )
}

export const CalendarPage = () => {
    return (
        <PageWrapper>
            <Calendar/>
        </PageWrapper>
    )
}

export const ExplorerPage = () => {
    return (
        <Explorer/>
    )
}

export const MessagesPage = () => {
    return (
        <PageWrapper query={useGetMessagesQuery}>
            <Messages/>
        </PageWrapper>
    )
}

export const MaintenancePage = () => {
    return (
        <PageWrapper query={useGetMaintenanceReportsQuery}>
            <MaintenanceReports/>
        </PageWrapper>
    )
}