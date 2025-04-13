'use client';
import { Icon } from '@iconify/react';
import AccountMenu from './AccountMenu';
import AccordionAddress from '../AccordionAddress/AccordionAddress'
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { useState } from 'react';
import InsertForm from './InsertForm';
import Element from 'components/UI/Element';
import ReusableMainLayout from 'components/Layout/ReusableMainLayout';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import ReusableServerDown from 'components/Reusable/ReusableServerDown';
interface PageAccountProps {
  userId: string;
}

const PageAccount:React.FC<PageAccountProps> = ({ userId }) => {
  const [useScale,setScale] = useState(0);
  const { data:AccountDetails, loading:AccountLoading, error:AccountError,refetch:AccountRefetch } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: userId } });
if(AccountLoading) return <Loading/>
if(AccountError) return <ReusableServerDown/>;
  return (
    <ReusableMainLayout
      childA={()=>(
        <AccountMenu />
      )}
      childB={()=>(
        <ReusableCenterLayout
          child1={()=>(
            <InsertForm setScale={setScale} useScale={useScale} refetch={AccountRefetch}/>
          )}
          child2={()=>(
            <div className='middlecontainer'>
            <div className='ProfileDetails'>
              <div className='AddressList'>
              <ReusableLabel icn="iconamoon:profile-fill" label="Profile Details"/>
              </div>
              {
                AccountDetails?.getAccountDetails_id.filter((idx:any)=>idx.defaultAddress===true).map((item:any,idx:number)=>(
                  <div className='AddressDetails' key={idx}>
                    <Element Label="Name" value={item?.fullname} />
                    <Element Label="Email" value={item?.accountEmail} />
                    <Element Label="Contact" value={item?.contactNo} />
                    <Element Label="Address" value={item?.Address} />
                  </div>
                ))
              }
              <div className='AddressList'>
                <ReusableLabel icn="ph:address-book-fill" label="Addresses"/>
                <div className='AddressButtonContainer'>
                <button onClick={()=>setScale(1)}><Icon icon="mingcute:add-fill"/></button>
                </div>
              </div>
              <div className='AddressesCollapse'>
                <AccordionAddress address={AccountDetails?.getAccountDetails_id} refetch={AccountRefetch}/>
              </div>
            </div>
            </div>
          )}
          child3={()=><></>}
          child4={()=><></>}
        />
      )}
      childC={()=><></>}
    >

    </ReusableMainLayout>
  );
};

export default PageAccount;
