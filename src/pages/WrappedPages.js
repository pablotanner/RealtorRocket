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

export const HomePage = () => {
    return (
        <PageWrapper>
            <Home/>
        </PageWrapper>
    )
}

export const TenantsPage = () => {
    return (
        <PageWrapper>
            <Tenants/>
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