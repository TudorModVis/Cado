import { ProductInterface } from '@/models/product/types/productInterface'
import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import Controls from './Controls'
import ListProductCard from './ListProductCard'
import { motion, useAnimate } from 'motion/react'
import { easeInOutCubic } from '@/lib/utils'
import LoadingGrid from './LoadingGrid'
import SortBy from '@/lib/enums/SortBy'
import { Categories } from '@/lib/enums/Categories'

interface ProductsGridProps {
    products: ProductInterface[],
    loading: boolean,
    setSortBy: (v: SortBy) => void,
    sortBy: SortBy,
    category: Categories | null,
    setSidebarOpen: (v: boolean) => void,
    isSidebarOpen: boolean,
    searchText: string | null,
    countProducts: number
}

export default function ProductsGrid({products, loading, setSortBy, sortBy, category, setSidebarOpen, isSidebarOpen, searchText, countProducts}: ProductsGridProps) {
    const [gridLayout, setGridLayout] = useState(true);
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (loading) return;
        const controls = animate( scope.current, { y: [20, 0], opacity: [0, 1] }, {ease: easeInOutCubic, duration: .3} );
    
        return () => controls.stop();
      }, [gridLayout, loading])

  return (
    <motion.div className='col-span-full lg:col-start-4 lg:col-span-10 2xl:col-span-12 grid grid-cols-8 lg:grid-cols-12 mt-16 lg:mt-12 gap-x-2 lg:gap-y-6 lg:gap-6 h-fit'>
        <Controls gridLayout={gridLayout} setGridLayout={setGridLayout} setSortBy={setSortBy} sortBy={sortBy} setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} searchText={searchText} countProducts={countProducts}/>
        <div ref={scope} className='col-span-full grid grid-cols-8 lg:grid-cols-12 gap-x-2 gap-y-6 lg:gap-6'>
            {
                loading ? 
                (
                    <LoadingGrid gridLayout={gridLayout} length={8}/> 
                ) : (
                    products.map((product, index) => {
                        return (
                            <Fragment key={index}>
                                {
                                    products[index].relevance < 1 && products[index - 1] && products[index - 1].relevance > 0 && 
                                    <>
                                        {
                                            gridLayout && <div key={'line' + index} className='col-span-full h-[1px] w-full bg-black'></div>
                                        }
                                        <p className='col-span-full font-manrope text-2xl leading-7 uppercase font-semibold'>CATALOG GENERAL</p>
                                    </>
                                }
                                {
                                    gridLayout ? <ProductCard section='CATALOG' category={category} product={product} newLine={products[index].relevance < 1 && products[index - 1] && products[index - 1].relevance > 0} /> : <ListProductCard key={index} product={product}/>
                                }
                            </Fragment>
                        )
                    })
                )
            }
        </div>
    </motion.div>
  )
}
