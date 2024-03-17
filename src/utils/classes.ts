import {
    AccountStatus,
    AmenitiesOnRealEstate,
    CurrencyCode,
    Image, ListingStatus, Message,
    PreferencesOnRealEstate,
    RealEstateType,
    Realtor, UserRole,
} from "@prisma/client";

export class LeasePaymentSchedule {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    amountDue: number | null;
    lease: Lease;
    leaseId: number;
    status:  string;
}

export class MaintenanceRequest {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    resolvedAt: Date | null;
    title: string | null;
    category: string | null;
    status: string | null;
    priority: string | null;
    date: Date | null;
    submittedBy: string | null;
    submissionDate: Date | null;
    approvalDate: Date | null;
    notes: string | null;
    realtor: Realtor;
    expenses: Expense[];
    realtorId: number;
    unit: Unit | null;
    unitId: number | null;
    reporter: Tenant | null;
    reportId: number | null;
}

export class Expense {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    realtor: Realtor;
    realtorId: number;
    title: string | null;
    description: string | null;
    lease: Lease | null;
    leaseId: number | null;
    unit: Unit | null;
    unitId: number | null;
    amount: number | null;
    currency: string | null;
    date: Date | null;
    notes: string | null;
    category: string | null;
    maintenanceRequest: MaintenanceRequest | null;
    maintenanceRequestId: number | null;
}

export class RentPayment {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    amount: number | null;
    currency: string | null; // Assuming CurrencyCode is a string enum elsewhere
    date: Date | null;
    status: string | null; // Assuming PaymentStatus is a string enum or similar
    notes: string | null;
    paymentMethod: string | null;

    submittedBy: string | null;
    submissionDate: Date | null;
    approvalDate: Date | null;

    leaseId: number | null;
    tenantId: number | null;

    // Assuming Lease and Tenant are defined elsewhere
    lease: Lease | null;
    tenant: Tenant | null;
}

export class Property {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    description: string | null;
    lotSize: number | null;
    yearBuilt: number | null;
    realEstateType: RealEstateType | null;
    marketPrice: number | null;
    currency: CurrencyCode | null;
    images: Image[];
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    amenities: AmenitiesOnRealEstate[];
    preferences: PreferencesOnRealEstate[];
    documents: Document[];
    realtor: Realtor;
    realtorId: number;
    units: Unit[];
}

export class Unit {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    unitIdentifier: string | null;
    unitNumber: string | null;
    floor: number | null;
    unitSize: number | null;
    numOfFloors: number | null;
    numOfRooms: number | null;
    numOfBedrooms: number | null;
    numOfBathrooms: number | null;
    garages: number | null;
    amenities: AmenitiesOnRealEstate[];
    rentalPrice: number | null;
    currency: CurrencyCode | null;
    status: ListingStatus | null;
    documents: Document[];
    images: Image[];
    tenant: Tenant | null;
    tenantId: number | null;
    maintenanceRequests: MaintenanceRequest[];
    realEstateObject: Property;
    realEstateObjectId: number;
    leases: Lease[];
}

export class Lease {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date | null;
    endDate: Date | null;
    rentalPrice: number | null;
    paymentFrequency: string | null;
    leaseLength: number | null;
    specialTerms: string | null;
    leaseTerms: string | null;
    currency: CurrencyCode | null;
    totalRentDue: number | null;
    rentPaid: number | null;
    status: string | null;
    paymentSchedule: LeasePaymentSchedule[];
    notes: string | null;
    documents: Document[];
    tenant: Tenant | null;
    tenantId: number | null;
    unit: Unit | null;
    unitId: number | null;
    realtor: Realtor;
    realtorId: number;
}

export class Tenant {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    civilStatus: string | null;
    occupation: string | null;
    income: number | null;
    creditScore: number | null;
    user: User | null;
    userId: number | null;
    firstName: string | null;
    lastName: string | null;
    unit: Unit[] | null;
    email: string | null;
    phone: string | null;
    leases: Lease[];
    maintenanceRequests: MaintenanceRequest[];
}

export class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    dob: Date | null;
    currencyCode: CurrencyCode | null;
    documents: Document[];
    title: string | null;
    avatar: string | null;
    images: Image[];
    phone: string | null;
    website: string | null;
    company: string | null;
    bio: string | null;
    status: AccountStatus;
    role: UserRole | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    sentMessages: Message[];
    receivedMessages: Message[];
    realtor: Realtor | null;
    tenant: Tenant | null;
}
