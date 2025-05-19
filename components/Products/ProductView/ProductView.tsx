'use client'
import React, { useState, Suspense } from 'react';
import Share from 'components/Partial/Share/Share';
import Ratings from 'components/Partial/Ratings/Ratings';
import { Icon } from '@iconify/react';
import { Gallery } from "components/Gallery/Gallery";
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableArrowTabs from 'components/Reusable/ReusableArrowTabs';
import ProductTabs from './ProductTabs';
import { GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Cart, formatter, maskEmail } from 'utils/scripts';
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
import ReusableLabel from 'components/Reusable/ReusableLabel';
import { setmodal } from 'Redux/modalSlice';
import ProductViewLoading from './ProductViewLoading';
import ModelViewer from "components/Partial/ThreeJS/ModelViewer";
const path = process.env.NEXT_PUBLIC_PATH;

const ProductView: React.FC = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const viewedProd = useSelector((state: any) => state.viewedProd.viewedProd);
  const [quantity, setQuantity] = useState(1);

  const { data: Products, loading, error } = useQuery(GET_RELATED_PRODUCTS);
  const [insertNumberOfViews] = useMutation(INSERT_VIEWS_COUNT, {
    onError: (error) => console.error("Error inserting view:", error),
  });

  const handleClose = () => {
    setTimeout(() => dispatch(setmodal(false)), 400);
  };

  if (loading) return <ProductViewLoading />;
  if (error) return <h1>Connection Error</h1>;
  if (viewedProd.length < 1) return null;

  return (
    <Suspense fallback={<Loading />}>
      {viewedProd.map((viewItem: any, idx: number) => {
        const tabs = [
          {
            icon: "mdi-light:image",
            content: (
              <Gallery
                data={viewItem}
                length={viewItem}
                slidesPerView={1}
                spaceBetween={50}
              />
            ),
            notification: 0,
          },
          {
            icon: "meteor-icons:cube",
            content: (
              <ModelViewer data={viewItem}/>
            ),
            notification: 0,
          },
          {
            icon: "guidance:wear-goggles",
            content: (
              <ModelViewer data={viewItem}/>
            ),
            notification: 0,
          }

          
        ];

        return (
          <div className='MainView' key={idx}>
            <div className='MainView_Lchild'>
              <ReusableLabel icn='carbon:data-2' label='Product Data' />
              <InsertView
                insertNumberOfViews={insertNumberOfViews}
                userEmail={cookie?.emailAddress}
                ViewProduct={viewedProd[0]}
              />
              <div className='LabelBack' onClick={handleClose}>
                <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
              </div>
              <div className='MainView_LchildGallery'>
                {/* <ProductTabs data={viewItem} />*/}
                <ReusableArrowTabs tabs={tabs} />
                <div className='MainView_LchildGalleryDetails'>
                  <Element Label="Name" value={'Name: ' + viewItem.name} />
                  <Element Label="Price" value={'Price: ' + formatter.format(viewItem.price)} />
                  <Element Label="Available Sizes" value={"Available Sizes:"} />
                  <RelatedSize styleCode={viewItem.style_Code} currentsize={viewItem.size} />
                  <Element Label="Available Colors" value={"Available Colors:"} />
                  <RelatedColor styleCode={viewItem.style_Code} currentcolor={viewItem.color} />
                  <Element Label="Available Stock" value={'Stock: ' + viewItem.stock} />
                  <Element Label="Quantity" value={""} />
                  <div className='ShareQuantity'>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    <input
                      type='text'
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                  </div>
                  <div className='CommandContainer'>
                    <LinkStoreCmd emailAddress={viewItem.agentEmail} />
                    <LikeCmd productCode={viewItem.productCode} />
                    <AddCartCmdView
                      viewedProduct={viewedProd}
                      quantity={quantity}
                      stock={viewItem.stock}
                    />
                  </div>
                  <div className='ShareContainer'>
                    <Share />
                  </div>
                </div>
              </div>
              <ReusableLabel icn='fluent:text-description-rtl-24-filled' label='Product Description' />
              <div className='longtext'>
                <HtmlRenderer htmlContent={viewItem?.productDescription} />
              </div>
              <ReusableLabel icn='material-symbols:reviews' label='Product Review' />
              <div className='longtext'>
                {viewItem?.Ratings?.length > 0 ? viewItem.Ratings.map((item: any, idx: number) => (
                  <div key={idx}>
                    <div>{maskEmail(item.By)}</div>
                    <div>{item.Comment}</div>
                    <div><Ratings data={item.Ratings > 0 ? item.Ratings : 0} count={item} /></div>
                  </div>
                )) : "No Review Found"}
              </div>
            </div>
            <RelatedProducts data={Products?.getRelatedProduct} />
          </div>
        );
      })}
    </Suspense>
  );
};

export default ProductView;
