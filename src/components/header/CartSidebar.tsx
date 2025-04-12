import { Link } from '@/i18n/navigation';
import { CartInterface } from '@/lib/types/CartInterface';
import { easeInOutCubic } from '@/lib/utils';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

interface CartSidebarInterface {
    setSidebarOpen: (v: boolean) => void,
    items: CartInterface[],
    locale: string,
    setValue: (v: CartInterface[]) => void
}


export default function CartSidebar({items, locale, setSidebarOpen, setValue}: CartSidebarInterface) {
  return (
    <motion.div 
        onMouseDown={(e) => {e.stopPropagation(); setSidebarOpen(false)}} 
        className='fixed w-screen h-screen top-0 left-0 z-50 flex justify-end'
    >
        <motion.div 
            initial={{opacity: 0}} 
            animate={{opacity: 1, transition: {duration: .4, ease: easeInOutCubic}}} 
            exit={{opacity: 0, transition: {duration: .4, ease: easeInOutCubic}}} 
            className='absolute left-0 top-0 z-0 w-full h-full bg-darkblue/75 backdrop-blur-xs'
        ></motion.div>

        <motion.div 
            initial={{x: '100%'}} 
            animate={{x: 0, transition: {duration: .4, ease: easeInOutCubic}}} 
            exit={{x: '100%', transition: {duration: .4, ease: easeInOutCubic}}} 
            className='bg-white h-full w-1/3 z-10 pt-6 pl-6 pr-8 relative flex flex-col pb-42' 
            onMouseDown={(e) => {e.stopPropagation()}}
        >
            <div className="flex justify-between items-center mb-12">
                <div className='flex gap-2'>
                    <p className='text-black font-manrope text-2xl leading-7 font-semibold'>Coș</p>
                    <div className='rounded-full size-8 bg-black text-white text-sm flex items-center justify-center leading-tight'>
                        {items.length}
                    </div>
                </div>
                <button className='cursor-pointer' onClick={() => {setSidebarOpen(false)}}>
                    <X className='size-8' strokeWidth={1.5} />
                </button>
            </div>
            {
                items.length > 0 ?
                    <div data-lenis-prevent className='pl-10 pr-8 flex flex-col gap-6 flex-1 overflow-y-scroll scroll-bar-custom'>
                        {
                            items.map((item, index) => {
                                return (
                                    <div key={index} className='w-full flex gap-4'>
                                        <Image src={item.product.images[0]} alt={item.product.title[locale]} width={129} height={164} className='w-32 aspect-[129/164] rounded-lg' />
                                        <div className='flex flex-col justify-between flex-1'>
                                            <div>
                                                <p className='font-manrope text-sm font-semibold mb-4'>{item.product.title[locale]}</p>
                                                <div className='font-manrope font-semibold py-2 px-4 border border-gray rounded-3xl w-fit'>{item.product.price} MDL</div>
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

                                                    <span className={`${item.quantity}`}>{item.quantity}</span>

                                                    <button 
                                                        disabled={item.quantity === item.product.stock_availability} 
                                                        onClick={() => {
                                                            const newItems = [...items];
                                                            newItems[index].quantity = Math.min(newItems[index].product.stock_availability, newItems[index].quantity + 1);
                                                            console.log(newItems[index].product)
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
                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-full px-16'>
                    <ShoppingBag className='size-12 mx-auto mb-2' strokeWidth={1.25}/>
                    <p className='text-center'>Coșul dvs. este gol. Vizitați magazinul pentru inspirație și recomandări personalizate.</p>
                </div>
            }
            <div className='absolute left-0 w-full bottom-16 px-16'>
                <div className="flex justify-between items-end mb-4">
                    <p>Total:</p>
                    <p className='font-semibold'>{items.reduce((acc, item) => acc + item.product.price, 0).toLocaleString()} MDL</p>
                </div>
                {
                    items.length > 0 ?
                    <Link href="/checkout">
                        <button className='h-12 w-full bg-blue-2 text-white rounded-3xl font-manrope font-semibold cursor-pointer border hover:opacity-75 transition duration-300'>Spre achitare</button>
                    </Link> :
                    <button onClick={() => {setSidebarOpen(false)}} className='h-12 w-full bg-blue-2 text-white rounded-3xl font-manrope font-semibold cursor-pointer border hover:opacity-75 transition duration-300'>Întoarce-te în magazin</button>
                }
            </div>
        </motion.div>
    </motion.div>
  )
}
