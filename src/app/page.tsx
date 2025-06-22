import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import ProductsBody from '../../components/Products/ProductsBody';
import CrowdMessages from 'components/Crowd/CrowdMessages'
import HomeBody from '../../components/Home/HomeBody'
import { Suspense } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
export default function Index() {
  const tabItems = [
    { name: 'Home', icon: '📄', content: <HomeBody /> },
    { name: 'Products', icon: '🛒', content: <ProductsBody  /> },
    { name: 'Crowd', icon: '⚙️', content: <CrowdMessages /> }
  ];
  return (
    <Suspense fallback={<Loading/>}>
      {/*<div className='Main'>
      <PageHeader />
      <HomeBody/>
      <PageFooter />
    </div>*/}
      <ReusableSwiperTabs tabs={tabItems}/>
    </Suspense>
  )
}
