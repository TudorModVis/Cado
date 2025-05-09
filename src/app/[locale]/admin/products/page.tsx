import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProductsContent from '@/components/admin/products/ProductsContent'
import ProductsFilter from '@/components/admin/products/ProductsFilter'
import { AdminPages } from '@/lib/enums/AdminPages'
import React from 'react'

export default function AdminProducts() {
  return (
    <>
        <AdminSidebar page={AdminPages.PRODUCTS} />
        <div className='col-span-12 grid grid-cols-12 h-fit gap-x-6'>
          <AdminHeader href='/admin/products' page={AdminPages.PRODUCTS} />
          <ProductsFilter />
          <ProductsContent />
        </div>
    </>
  )
}
