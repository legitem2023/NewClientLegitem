'use client'
import React, { useState, Suspense } from 'react';
import Share from 'components/Partial/Share/Share';
import { Icon } from '@iconify/react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ProductTabs from './ProductTabs';
import { GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { formatter } from 'utils/scripts';
import RelatedProducts from './RelatedProducts';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import InsertView from './InsertView';
import { INSERT_VIEWS_COUNT } from 'graphql/mutation';
import RelatedColor from './RelatedColor';
import RelatedSize from './RelatedSize';
import LikeCmd from 'components/Commands/LikeCmd';
import AddCartCmdView from 'components/Commands/AddCartCmdView';
import LinkStoreCmd from 'components/Commands/LinkStoreCmd';
import Element from 'components/UI/Element';
import { useDispatch, useSelector } from 'react-redux';
import ReusableLabel from 'components/UI/ReusableLabel';
import { setmodal } from 'Redux/modalSlice';
import ProductViewLoading from './ProductViewLoading';

const path = process.env.NEXT_PUBLIC_PATH;

const ProductView: React.FC = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((state:any)=>state.cookie.cookie);

  const [quantity, setQuantity] = useState(1);

  const viewedProd = useSelector((state:any)=> state.viewedProd.viewedProd)

  // Always call hooks unconditionally at the top of the component
  const { data: Products, loading, error } = useQuery(GET_RELATED_PRODUCTS);
  const [insertNumberOfViews] = useMutation(INSERT_VIEWS_COUNT, {
    onCompleted: (data) => {
      return;
    },
    onError: (error) => {
      console.error("Error inserting view:", error);
    }
  });

  if (loading) return  <ProductViewLoading />;
  if (error) return <h1>Connection Error</h1>;

  const handleClose = () => {
    setTimeout(() => dispatch(setmodal(false)), 400); // Match the animation duration
  };

  if (viewedProd.length < 1) return null; // Return null if no viewed products
  return (
    <Suspense fallback={<Loading />}>
      {viewedProd.length > 0 && viewedProd.map((viewItem: any, idx: any) => (
        <div className='MainView' key={idx}>
          <div className='MainView_Lchild'>
            <ReusableLabel icn='' label='Product Data'/>
            <InsertView insertNumberOfViews={insertNumberOfViews} userEmail={cookie.emailAddress} ViewProduct={viewedProd[0]} />
            <div className='LabelBack' onClick={() => handleClose()}>
              <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
            </div>
            <div className='MainView_LchildGallery'>
              <ProductTabs data={viewItem} />
              <div className='MainView_LchildGalleryDetails'>
                <Element Label="Name" value={'Name :'+ viewItem.name} />
                <Element Label="Price" value={'Price :' + formatter.format(viewItem.price)} />
                
                <Element Label="Available Sizes" value={"Available Sizes :"} />
                
                <RelatedSize styleCode={viewItem.style_Code} currentsize={viewItem.size}/>
                <Element Label="Available Colors" value={"Available Colors :"} />
                
                <RelatedColor styleCode={viewItem.style_Code} currentcolor={viewItem.color} />
                <Element Label="Available Stock" value={'Stock :'+ viewItem.stock} />
                <Element Label="Quantity" value={""} />
                <div className='ShareQuantity'>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  <input type='text' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                </div>
                <div className='CommandContainer'>
                  <LinkStoreCmd emailAddress={viewItem.agentEmail}/>
                  <LikeCmd productCode={viewItem.productCode}/>
                  <AddCartCmdView viewedProduct={viewedProd} quantity={quantity} stock={viewItem.stock}/>
                </div>
                <div className='ShareContainer'>
                  <Share />
                </div>
              </div>
            </div>
            <ReusableLabel icn='' label='Product Details'/>
            <div className='longtext'>
              <HtmlRenderer htmlContent={viewItem?.productDescription} />
            </div>
            <ReusableLabel icn='' label='Product Review'/>
            <div className='longtext'>
              {/* Product reviews rendering can be placed here */}
            </div>
          </div>
          <RelatedProducts data={Products?.getRelatedProduct} />
        </div>
      ))}
    </Suspense>
  );
};

export default ProductView;
