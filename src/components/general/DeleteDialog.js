import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/alert-dialog.tsx";
import {Trash2} from "lucide-react";


const DeleteDialog = ({ open, setOpen, onConfirm, title="Delete Confirmation", content="Are you sure that you want to delete this?"}) => {

    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)} >
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-row items-center gap-4 justify-start text-left">
                    <div className="p-2 bg-destructive/20 rounded-full ">
                        <Trash2 className="text-destructive"/>
                    </div>
                    <div className="text-left">
                        <AlertDialogTitle>
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {content}
                        </AlertDialogDescription>
                    </div>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog;