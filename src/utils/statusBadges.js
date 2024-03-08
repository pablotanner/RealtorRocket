import {Badge} from "../components/ui/badge.tsx";
import {
    AlarmClockIcon,
    AlarmClockOffIcon,
    Ban,
    CheckIcon,
    ChevronDown,
    ChevronRight, ChevronsUp, ChevronUp,
    Dot,
    FlagIcon,
    XIcon
} from "lucide-react";
import {FaCheck, FaHandshake} from "react-icons/fa6";
import {cn} from "../utils.ts";
import {MaintenanceStatus, PaymentScheduleStatus, Priority} from "./magicNumbers.js";

export const LeaseStatusBadge = ({ status }) => {
    if (!status) return null

    const lowerStatus = status.toLowerCase()

    const statusVariant = {
        active: 'positive',
        expired: 'negative',
        terminated: 'negative',
        pending: 'warning',
    }

    const dotColor = {
        active: 'bg-green-600',
        expired: 'bg-red-500',
        terminated: 'bg-red-500',
        pending: 'bg-orange-600',
    }

    return (
        <Badge variant={statusVariant[lowerStatus]}>
            <p className={cn("inline-block w-1 h-1 rounded-full mr-1", dotColor[lowerStatus])}/>
            {lowerStatus}
        </Badge>
    )
}

export const PriorityBadge = ({ priority }) => {
    if (!priority) return null

    const lowerPriority = priority.toLowerCase()


    const arrowClass = "w-4 h-4 mr-1";

    const arrow = {
        low: <ChevronDown className={arrowClass}/>,
        medium: <ChevronRight className={arrowClass}/>,
        high: <ChevronUp className={arrowClass}/>,
        critical: <ChevronsUp className={arrowClass}/>,
    }

    return (
        <div className="flex items-center">
            {arrow[lowerPriority]}
            {Priority[priority]}
        </div>
    )

}

export const MaintenanceStatusBadge = ({ status }) => {
    if (!status) return null

    const lowerStatus = status.toLowerCase()

    const statusVariant = {
        open: 'warning',
        in_progress: 'warning',
        completed: 'positive',
        scheduled: 'neutral',
        reported: 'blue',
    }

    const dotColor = {
        open: 'bg-orange-600',
        in_progress: 'bg-orange-600',
        completed: 'bg-green-600',
        scheduled: 'bg-gray-400',
        reported: 'bg-blue-600',
    }

    return (
        <Badge variant={statusVariant[lowerStatus]}>
            <p className={cn("inline-block w-1 h-1 rounded-full mr-1", dotColor[lowerStatus])}/>
            {MaintenanceStatus[status]}
        </Badge>
    )

}

export const ListingStatusBadge = ({ status }) => {
    if (!status) return null;

    const lowerStatus = status.toLowerCase();

    const statusVariant = {
        active: 'positive',
        inactive: 'neutral',
        rented: 'positive',
        not_rented: 'negative',
        reserved: 'warning',
        sold: 'positive',
        pending: 'warning',
        unknown: 'neutral',
    };

    const dotColor = {
        active: 'bg-green-600',
        inactive: 'bg-gray-400',
        rented: 'bg-green-600',
        not_rented: 'bg-red-500',
        reserved: 'bg-orange-600',
        sold: 'bg-blue-600',
        pending: 'bg-yellow-500',
        unknown: 'bg-gray-400',
    };

    return (
        <Badge variant={statusVariant[lowerStatus]}>
            <span className={cn("inline-block w-1 h-1 rounded-full mr-2", dotColor[lowerStatus])}></span>
            {lowerStatus}
        </Badge>
    );
};

export const PaymentStatusBadge = ({ status }) => {
    if (!status) return null

    const lowerStatus = status.toLowerCase()

    const statusVariant = {
        pending: 'warning',
        paid: 'positive',
        reported: 'blue',
        cancelled: 'neutral',
        rejected: 'pink',
    }

    const statusIcon = {
        pending: <AlarmClockIcon className="w-3 h-3 mr-[4px]"/>,
        reported: <FlagIcon className="w-3 h-3 mr-[4px]"/>,
        paid: <FaCheck className="w-3 h-3 mr-[4px] text-green-600"/>,
        cancelled: <XIcon className="w-3 h-3 mr-[2px]"/>,
        rejected: <Ban className="w-3 h-3 mr-[4px] text-pink-400"/>,
    }

    return (
        <Badge variant={statusVariant[lowerStatus]}>
            {statusIcon[lowerStatus]}
            {lowerStatus}
        </Badge>
    )
}

export const PaymentScheduleStatusBadge = ({ status }) => {
    if (!status) return null

    const lowerStatus = status.toLowerCase()

    const statusVariant = {
        scheduled: 'neutral',
        paid: 'positive',
        partially_paid: 'positive',
        overdue: 'negative',
        waived: 'blue',
    }

    const statusIcon = {
        scheduled: <AlarmClockIcon className="w-3 h-3 mr-[4px]"/>,
        paid: <FaCheck className="w-3 h-3 mr-[4px] text-green-600"/>,
        partially_paid: <CheckIcon className="w-3 h-3 mr-[4px] text-green-600"/>,
        overdue:  <AlarmClockOffIcon className="w-3 h-3 mr-[4px]"/>,
        waived: <FaHandshake className="w-3 h-3 mr-[4px]"/>,

    }

    return (
        <Badge variant={statusVariant[lowerStatus]}>
            {statusIcon[lowerStatus]}
            {PaymentScheduleStatus[status]}
        </Badge>
    )
}