'use client'
import PageHeader from '../../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../../components/Partial/Footer/PageFooter'
import ProductsBody from '../../../../components/Products/ProductsBody'
export default function Index() {
  return (
    <div className='Main'>
      <PageHeader/>
        <ProductsBody/>
      <PageFooter/>
    </div>
  )
}
