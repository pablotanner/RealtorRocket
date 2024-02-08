import {FactoryIcon, GemIcon, HomeIcon, LandPlot, StoreIcon, Tractor} from "lucide-react";
import {RiHomeOfficeLine} from "react-icons/ri";
import {BiBuildingHouse, BiQuestionMark} from "react-icons/bi";
import {MdApartment} from "react-icons/md";
import {LiaBuilding} from "react-icons/lia";
import {HiOutlineHomeModern} from "react-icons/hi2";


export const RentalStatus = {
    RENTED: "Rented",
    VACANT: "Vacant",
    OCCUPIED: "Occupied",
    UNOCCUPIED: "Unoccupied",
    PENDING: "Pending",
    UNKNOWN: "Unknown",
}

export const RealEstateType = {
    SINGLE_FAMILY_HOME: "Single Family Home",
    MULTI_FAMILY_HOME: "Multi Family Home",
    CONDO: "Condo",
    APARTMENT: "Apartment",
    TOWNHOUSE: "Townhouse",
    LUXURY: "Luxury",
    OFFICE: "Office",
    RETAIL: "Retail",
    INDUSTRIAL: "Industrial",
    LAND: "Land",
    FARM: "Farm"
}


export const getRealEstateIcon = (type) => {
    const iconClass = "w-5 h-5 mr-1";
    const enumType = RealEstateType[type]
    switch (enumType) {
        case RealEstateType.SINGLE_FAMILY_HOME:
            return <HomeIcon className={iconClass}/>;
        case RealEstateType.MULTI_FAMILY_HOME:
            return <HiOutlineHomeModern className={iconClass}/>;
        case RealEstateType.CONDO:
            return <LiaBuilding className={iconClass}/>;
        case RealEstateType.APARTMENT:
            return <MdApartment className={iconClass}/>;
        case RealEstateType.TOWNHOUSE:
            return <BiBuildingHouse className={iconClass}/>;
        case RealEstateType.LUXURY:
            return <GemIcon className={iconClass}/>;
        case RealEstateType.OFFICE:
            return <RiHomeOfficeLine className={iconClass}/>;
        case RealEstateType.RETAIL:
            return <StoreIcon className={iconClass}/>;
        case RealEstateType.INDUSTRIAL:
            return <FactoryIcon className={iconClass}/>;
        case RealEstateType.LAND:
            return <LandPlot className={iconClass}/>;
        default:
            return <BiQuestionMark className={iconClass}/>;
    }
}
