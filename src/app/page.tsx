import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import PageBody from '../../components/Products/ProductsBody';
import HomeBody from '../../components/Home/HomeBody'
import { Suspense } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
export default function Index() {
  const tabItems = [
    { name: 'Docs', icon: '📄', content: <HomeBody /> },
    { name: 'Store', icon: '🛒', content: <HomeBody /> },
    { name: 'Settings', icon: '⚙️', content: <HomeBody /> }
  ];
  return (
    <Suspense fallback={<Loading/>}>
    <div className='Main'>
      <PageHeader />
      <HomeBody/>
      <PageFooter />
    </div>
      <ReusableSwiperTabs tabs={tabItems}/>
    </Suspense>
  )
}
