import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY, GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
// import { setGlobalState, useGlobalState } from 'state';
import { handleError, handleLoading } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import Thumbnail from 'components/UI/Thumbnail';
import ReusableThumbnail from 'components/UI/ReusableThumbnail';
import AddCartCmd from 'components/Commands/AddCartCmd';
import { useDispatch, useSelector } from 'react-redux';
import ReusableSearch from 'components/UI/ReusableSearch';
import { setSearch } from 'Redux/searchSlice';
import { setsortBy } from 'Redux/sortBySlice';
import { setsortDirection } from 'Redux/sortDirectionSlice';
import Modal from './Modal';
import ProductView from 'components/Products/ProductView/ProductView';
import { setmodal } from 'Redux/modalSlice';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import Carousel from 'components/Carousel';
import { setviewed } from 'Redux/viewedSlice';
import { HomeGallery } from 'components/Gallery/HomeGallery';
import { setViewedProd } from 'Redux/viewedProdSlice';
import { setcurrentPage } from 'Redux/currentPageSlice';
import ProductLoading from './ProductLoading';
import ProductViewLoading from './ProductView/ProductViewLoading';
import { useRouter,usePathname,useSearchParams } from 'next/navigation';
const itemsPerPage = 20; // Move constant outside component

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isModalOpen = useSelector((state:any) => state.modal.modal); // Access category state

  const openModal = (id:string,items:any) => {
    dispatch(setviewed(id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([items]));
    router.push(`${pathname}?id=${id}`);
  }; // Update category state

  const thumbnailDiscounted = useSelector((state:any) => state.discounted.discounted);//useGlobalState('thumbnailDiscounted');
  const thumbnailNewData = useSelector((state:any) => state.new.new);

  const category = useSelector((state:any) => state.category.category); // Access category state
  const search = useSelector((state:any) => state.search.search);
  const productType = useSelector((state:any) => state.productType.productType);
  const sortBy =  useSelector((state:any) => state.sortBy.sortBy);
  const sortDirection =  useSelector((state:any) => state.sortDirection.sortDirection);


  const path = process.env.NEXT_PUBLIC_PATH || '';
  const CurrentPage = useSelector((state:any) => state.currentPage.currentPage);//useGlobalState('CurrentPage');

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY);

  const { data:Category, loading, error } = useQuery(GET_CATEGORY);


  const filteredProducts = useMemo(() => {
    if (!ProductsData) return [];
    
    return ProductsData?.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(category.toLowerCase())
      )
  }, [ProductsData, search, category,productType]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    return filteredProducts.sort((a: any, b: any) => {

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

  const handlePageChange = useCallback((page: number) => {
    // setGlobalState('CurrentPage', page);
    dispatch(setcurrentPage(page));
  }, []);

  const DiscountedData = useMemo(() => {
    return thumbnailDiscounted==="" ? sortedProducts :sortedProducts?.filter((item: any) => item?.discount > 0);
  }, [sortedProducts,thumbnailDiscounted]);


  const NewItemData = useMemo(() => {
    return thumbnailNewData==="" ? DiscountedData :DiscountedData?.filter((post:any) => {
      const postDate = new Date(parseInt(post?.dateUpdated));
      return postDate.toDateString() === new Date().toDateString();
    });
  }, [DiscountedData,thumbnailNewData]);

  const itemsPerPage = 20;
  
  const paginatedProducts = NewItemData.slice(
      (CurrentPage - 1) * itemsPerPage,
      CurrentPage * itemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil((NewItemData?.length || 0) / itemsPerPage);
  }, [NewItemData]);

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
        // setGlobalState("sortDirection", 'desc');
        dispatch(setsortDirection('desc'));
      }else{
        // setGlobalState("sortDirection", 'asc');
        dispatch(setsortDirection('asc'));
      }
  }) 

  if (productsLoading) return <ProductLoading />;
  if (productsError) return <h1>Connection Error</h1>;

  


  return (
    
    <ReusableCenterLayout 
      child1={()=>(
        <></>
      // <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
      )}
      child2={()=>(
        <ReusableSearch search={searchEngine} sort={sort} trigger={sortTrigger}/>
      )}
      child3={()=>(
        <div className="Thumbnails">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((item: any, idx: number) => (
            <ReusableThumbnail
              key={idx}
              item={item}
              path={path}
              view={()=>openModal(item.id,item)}
              addcart={()=>(<AddCartCmd item={item}/>)}
              handleLoading={handleLoading}
              handleError={handleError}
            />
          ))
        ) : (
          <h2>No Data</h2>
        )}
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
          <ProductView/>
        </Modal>
      )}
    >
      
    </ReusableCenterLayout>
  );
};


export default Products;
