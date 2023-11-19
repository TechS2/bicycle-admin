import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FaTrash, FaPlus } from 'react-icons/fa6'
import { ProductForm } from "./form/product-form"

export const TopBar = () => {

    return (
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger className="flex gap-2 bg-gray-900 text-white py-2 px-4 rounded-md">
                    Add Product
                </DialogTrigger>
                <DialogContent>
                    <ProductForm/>
                </DialogContent>
            </Dialog>

            <Button className="flex gap-2" variant="destructive">
                <FaTrash className="w-4 h-4" />
                Delete
            </Button>
        </div>
    )
}