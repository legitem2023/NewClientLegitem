import React, { useCallback, useMemo, useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_CATEGORY, GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableThumbnail from 'components/UI/ReusableThumbnail';
import AddCartCmd from 'components/Commands/AddCartCmd';
import { handleError, handleLoading } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import { useRouter,useParams } from 'next/navigation';
import { setmodal } from 'Redux/modalSlice';
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';

import Thumbnail from 'components/UI/Thumbnail';
import ProductLoading from 'components/Products/ProductLoading';
import { decode } from 'js-base64';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentPage } from 'Redux/currentPageSlice';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import ReusableSearch from 'components/UI/ReusableSearch';
import { setSearch } from 'Redux/searchSlice';
import { setsortBy } from 'Redux/sortBySlice';
import { setsortDirection } from 'Redux/sortDirectionSlice';
import Carousel from 'components/Carousel';
import Modal from 'components/Products/Modal';
import ProductView from 'components/Products/ProductView/ProductView';
const Store: React.FC = () => {
  const param:any = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data:Category, loading, error } = useQuery(GET_CATEGORY);

  const dispatch = useDispatch();

  const thumbnailCategory = useSelector((state:any) => state.category.category); // Access category state
  const thumbnailSearch = useSelector((state:any) => state.search.search);
  const thumbnailProductTypes = useSelector((state:any) => state.productType.productType);
  const sortBy =  useSelector((state:any) => state.sortBy.sortBy);
  const sortDirection =  useSelector((state:any) => state.sortDirection.sortDirection);


  const path = process.env.NEXT_PUBLIC_PATH || '';
  const CurrentPage = useSelector((state:any) => state.currentPage.currentPage);//useGlobalState('CurrentPage');

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY,{
    fetchPolicy: 'cache-and-network',
  });

  const openModal = (id: string, items: any) => {
    dispatch(setviewed(id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([items]));
  };
  const filteredProducts = useMemo(() => {
    if (!ProductsData) return [];
    
    return ProductsData?.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(thumbnailSearch.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(thumbnailCategory.toLowerCase())
      )
  }, [ProductsData, thumbnailSearch, thumbnailCategory,thumbnailProductTypes]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    return filteredProducts.filter(((item:any) => item.agentEmail === decode(param.id))).sort((a: any, b: any) => {

      if (sortBy === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [filteredProducts, sortBy, sortDirection]);  


  const itemsPerPage = 20;

  const paginatedProducts = sortedProducts.slice(
      (CurrentPage - 1) * itemsPerPage,
      CurrentPage * itemsPerPage);

  const totalPages = useMemo(() => {
    const itemsPerPage = 20;
    return Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  }, [filteredProducts]);


  const handlePageChange = useCallback((page: number) => {
    dispatch(setcurrentPage(page));
    
  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

 const searchEngine = (inputValue:any) => {
  inputValue.preventDefault();
  const searchData = inputValue.target.value;
  if(inputValue===''){
  dispatch(setSearch('')); // Update category state
  }else{
  dispatch(setSearch(searchData)); // Update category state
  }
  };
  
  const sort = ((e: any) => {
    dispatch(setsortBy(e.target.value))
  })

  const handleSortBy = (column) => {
    dispatch(setsortBy(column))

  };
  
  const sortTrigger = (() => {
      if(sortDirection === 'asc'){
        dispatch(setsortDirection('desc'));
      }else{
        dispatch(setsortDirection('asc'));
      }
  }) 


  if (productsLoading) return <ProductLoading />;
  if (productsError) return <h1>Connection Error</h1>;

  return (
    <ReusableCenterLayout
    child1={()=>(
      <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
    )}
    child2={()=>(
      <ReusableSearch search={searchEngine} sort={sort} trigger={sortTrigger}/>
    )}
    child3={()=>(
      <div className="Thumbnails">
      {paginatedProducts.length > 0?paginatedProducts.map((item: any, idx: number) => (
              <div key={idx}>
                  <ReusableThumbnail
                    item={item}
                    path={path}
                    view={() => openModal(item.thumbnail, item)}
                    addcart={() => (<AddCartCmd item={item} />)}
                    handleLoading={handleLoading}
                    handleError={handleError}
                  />
                </div>
      )):(<h2>No Data</h2>)}
      <div className="viewmore">
        <UniversalPagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
    )}
    child4={()=>(
      <Modal isOpen={isModalOpen}>
          <ProductView />
      </Modal>
    )}
    />    
  );
};

export default Store;
