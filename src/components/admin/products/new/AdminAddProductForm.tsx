import {
    Form,
  } from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { StockState } from '@/lib/enums/StockState'
import { trpc } from '@/app/_trpc/client'
import { LoaderCircle } from 'lucide-react'
import { addProductRequestSchema } from "@/lib/validation/product/addProductRequest"
import AdminProductDetails from "@/components/admin/products/AdminProductDetails"
import AdminProductImages from "@/components/admin/products/AdminProductImages"
import { useRouter } from "@/i18n/navigation"

export default function AdminAddProductForm() {
    const {isSuccess, isPending, mutate, data} = trpc.products.createProduct.useMutation();
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && data.product?._id) {
            router.push({pathname: "/admin/products/[id]", params: {id: data.product?.custom_id}})
        }
    }, [isSuccess])


    const form = useForm<z.infer<typeof addProductRequestSchema>>({
        resolver: zodResolver(addProductRequestSchema),
        defaultValues: {
            data: {
                title: { ro: "", ru: "", en: "" },
                description: { ro: "", ru: "", en: "" },
                long_description: { ro: "", ru: "", en: "" },
                image_description: { ro: "", ru: "", en: "" },
                set_description: { ro: "", ru: "", en: "" },
                price: 1000,
                images: [],
                nr_of_items: 1,
                categories: [],
                ocasions: [],
                product_content: [],
                stock_availability: {
                    stock: 5,
                    state: StockState.IN_STOCK
                },
                sale: {
                    active: false,
                    sale_price: 0
                }
            }
        }
    });
    
    function onSubmit(values: z.infer<typeof addProductRequestSchema>) {
        mutate(values);
    }

    return (
        <>
            {
                isPending &&
                <div className='fixed top-0 left-0 w-full h-full bg-pureblack/25 z-10 items-center justify-center'>
                    <div className="flex items-center justify-center h-full w-full">
                        <LoaderCircle className='animate-spin text-white size-20' />
                    </div>
                </div>
            }
            <Form {...form}>
                <form 
                    id="update-product-form" 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="col-span-12 grid grid-cols-12 flex-1 overflow-auto gap-x-6"
                    >
                    <div data-lenis-prevent className='col-span-7 grid grid-cols-7 overflow-y-auto flex-1 -mr-6 pr-6 mt-16'>
                        <AdminProductDetails />
                    </div>
                    <AdminProductImages product={null} />
                </form>
            </Form>
        </>
    );
}
