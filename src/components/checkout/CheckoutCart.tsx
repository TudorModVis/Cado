'use client'

import { CartInterface } from "@/lib/types/CartInterface";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function CheckoutCart() {
    const [items, setValue] = useLocalStorage<CartInterface[]>("cart", []);
    const [mounted, setMounted] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        setMounted(true)
    }, [])

  return (
    <div className='col-span-full lg:col-start-10 2xl:col-start-10 lg:col-span-5 2xl:col-span-4 lg:sticky left-0 lg:h-screen -mb-7 pb-16 lg:pb-31 top-25 flex flex-col justify-between'>
        <p className='font-manrope text-2xl font-semibold leading-7 mb-4 lg:mb-6'>Sumarul comenzii</p>
        {
            items.length > 0 && mounted ?
                <div data-lenis-prevent className='flex flex-col pr-2 gap-6 flex-1 lg:overflow-y-auto scroll-bar-custom mb-16 lg:mb-8'>
                    {
                        items.map((item, index) => {
                            return (
                                <div key={index} className='w-full flex gap-2 lg:gap-4'>
                                    <Image src={item.product.images[0]} alt={item.product.title[locale]} width={129} height={164} className='w-32 aspect-[129/164] object-cover rounded-lg' />
                                    <div className='flex flex-col justify-between flex-1'>
                                        <div>
                                            <p className='font-manrope text-sm leading-4 font-semibold mb-4'>{item.product.title[locale]}</p>
                                            <div className='font-manrope font-semibold py-2 px-4 border border-gray rounded-3xl w-fit'>{item.product.price.toLocaleString()} MDL</div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className='w-30 flex items-center justify-between font-manrope font-semibold py-1 px-4 border border-gray rounded-3xl'>
                                                <button 
                                                    disabled={item.quantity === 1} 
                                                    className='cursor-pointer disabled:pointer-events-none disabled:text-gray' 
                                                    onClick={() => {
                                                        const newItems = [...items];
                                                        newItems[index].quantity = Math.max(1, newItems[index].quantity - 1);
                                                        setValue(newItems);
                                                    }}
                                                ><Minus strokeWidth={1.5} className='w-6' /></button>

                                                <span>{item.quantity}</span>

                                                <button 
                                                    disabled={item.quantity === item.product.stock_availability} 
                                                    onClick={() => {
                                                        const newItems = [...items];
                                                        newItems[index].quantity = Math.min(newItems[index].product.stock_availability, newItems[index].quantity + 1);
                                                        setValue(newItems);
                                                    }} 
                                                    className='cursor-pointer disabled:pointer-events-none disabled:text-gray'
                                                ><Plus strokeWidth={1.5} className='w-6' /></button>
                                            </div>

                                            
                                            <button 
                                                className='text-gray cursor-pointer relative after:contetn-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-gray hover:after:w-full after:transition-all after:duration-300' 
                                                onClick={() => {
                                                    const newItems = items.filter((_, i) => i !== index);
                                                    setValue(newItems);
                                                }}
                                            >Elimină</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) 
                    }
                </div>
            :
            <div className='lg:absolute left-0 top-1/2 lg:-translate-y-1/2 w-full px-4 lg:px-16 my-16 lg:my-0'>
                <ShoppingBag className='size-12 mx-auto mb-2' strokeWidth={1.25}/>
                <p className='text-sm leading-4 lg:text-base lg:leading-5 text-center'>Coșul dvs. este gol. Vizitați magazinul pentru inspirație și recomandări personalizate.</p>
            </div>
        }
        {
            items.length > 0 &&
            <>
                <div className="flex justify-between items-end mb-2 lg:mb-4">
                    <p>Livrare:</p>
                    <p className='font-semibold'>Livrare gratuită</p>
                </div>
                <div className="flex justify-between items-end mb-4">
                    <p>Total:</p>
                    <p className='font-semibold'>{mounted && items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toLocaleString()} MDL</p>
                </div>
            </>
        }

        <button className='h-12 w-full bg-blue-2 text-white rounded-3xl font-manrope font-semibold cursor-pointer border hover:opacity-75 transition duration-300' form="checkout-form">Continuă plata</button>
    </div>
  )
}
