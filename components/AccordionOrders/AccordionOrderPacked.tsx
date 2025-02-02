import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { formatter, imageSourceOrder } from 'utils/scripts';
import AccordionClientOrderHeader from './AccordionClientOrderHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentPage } from 'Redux/currentPageSlice';

const AccordionOrderPacked = ({json}) => {
    const dispatch = useDispatch();
    const path = process.env.NEXT_PUBLIC_PATH || '';
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    const [activeIndex, setActiveIndex] = useState(null);
    const CurrentPage = useSelector((state:any) => state.currentPage.currentPage);//useGlobalState('CurrentPage');

    const toggleAccordion = (index:any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };
    const itemsPerPage = 10;

    const paginatedProducts = json.slice(
        (CurrentPage - 1) * itemsPerPage,
        CurrentPage * itemsPerPage);
  
    const totalPages = useMemo(() => {
      const itemsPerPage = 10;
      return Math.ceil((json?.length || 0) / itemsPerPage);
    }, [json]);
  
    const handlePageChange = (page: number) => {
    dispatch(setcurrentPage(page));
    };

    return (
        <div className="faq-accordion">
            {paginatedProducts.map((odr:any, index:number) => (
                <div className="faq-item" key={index}>
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                    OrderNo No :{odr.OrderNo}
                    <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                    </div>

                    {activeIndex === index && (
                        <div className="faq-answer">
                            <div className='orderName'>{odr.StatusText}</div>
                            <div>Shipping Address :{odr.Address}</div>
                            <div>Contact No :{odr.Contact}</div>
                            <AccordionClientOrderHeader/>
                            {odr.OrderHistory.map((item:any,idx:number)=>(
                                <div key={idx} className='ClientOrderTable'>
                                <div>
                                <Image
                                    src={imageSourceOrder(item)}
                                    height='50'
                                    width='80'
                                    quality={1}
                                    alt={item.id}
                                    priority
                                />
                                </div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Code :</span>{item.productCode}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Size :</span>{item.Size}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Color:</span>{item.Color}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Price:</span>{formatter.format(item.Price)}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Quantity:</span>{item.Quantity}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product SubTotal:</span>{formatter.format(item.Quantity * item.Price)}</div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
                    <UniversalPagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        </div>
    );
};

export default AccordionOrderPacked;
