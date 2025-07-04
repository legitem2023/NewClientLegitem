'use client'
import React, { useCallback, useState,useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';
import { handleError, handleLoading } from 'utils/scripts';
import ReusableThumbnail from 'components/Reusable/ReusableThumbnail';

import AddCartCmd from 'components/Commands/AddCartCmd';
import { ViewedProduct } from 'types/types';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from 'Redux/searchSlice';
import { setsortBy } from 'Redux/sortBySlice';
import { setsortDirection } from 'Redux/sortDirectionSlice';
import { addSuggestedItems } from 'Redux/suggestedItemSlice';
import { setmodal } from 'Redux/modalSlice';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';
import ProductLoading from './ProductLoading';
// import { useRouter, usePathname } from 'next/navigation';
import ReusableServerDown from 'components/Reusable/ReusableServerDown';
import { Icon } from '@iconify/react';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import ReusableSlick from 'components/Reusable/ReusableSlick';
import ReusableSlider from 'components/Reusable/ReusableSlider';
import ReusableSelect from 'components/Reusable/ReusableSelect';
const itemsPerPage = 50; // Number of items to load per "page"

const Products: React.FC = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  // const pathname = usePathname();
  // const [useSaved,setSaved] = useState("");
  const storedcategory = useSelector((state: any) => state.categoryData.getCategoryData);

  
const saveRecentlyVisited = (product:ViewedProduct ) => {
  if (typeof window === "undefined") return;
  try {
    const visited = JSON.parse(localStorage.getItem("recentlyVisited") || "[]");
    if (!Array.isArray(visited)) return;
    // Remove duplicate entries
    const filtered = visited.filter((p) => p.id !== product.id);
    // Add the new product at the beginning
    filtered.unshift(product);
    // Keep only the last 10 visited items
    localStorage.setItem("recentlyVisited", JSON.stringify(filtered.slice(0, 10)));
  } catch (error) {
    console.error("Failed to update recently visited products:", error);
  }
};

  
  const openModal = (id: string, items: any) => {
    dispatch(setviewed(id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([items]));
    saveRecentlyVisited(items)
  };

  const thumbnailDiscounted = useSelector((state: any) => state.discounted.discounted);
  const thumbnailNewData = useSelector((state: any) => state.new.new);

  const category = useSelector((state: any) => state.category.category);
  const search = useSelector((state: any) => state.search.search);
  const productType = useSelector((state: any) => state.productType.productType);
  const sortBy = useSelector((state: any) => state.sortBy.sortBy);
  const sortDirection = useSelector((state: any) => state.sortDirection.sortDirection);
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY);
  // Function to multiply the array
  function multiplyArray(data, times) {   
    return Array(times).fill(data).flat();
  }

  // Apply the multiplyArray function to ProductsData?.getChildInventory
  const multipliedProducts = multiplyArray(ProductsData?.getChildInventory || [], 1);

  const filteredProducts = multipliedProducts
    ?.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(search.toLowerCase())
    )
    ?.filter((item: any) =>
      item?.category?.toLowerCase()?.includes(category.toLowerCase())
    ) || [];

  const sortedProducts = filteredProducts.sort((a: any, b: any) => {
    if (sortBy === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const DiscountedData = thumbnailDiscounted === "" ? sortedProducts : sortedProducts?.filter((item: any) => item?.discount > 0);

  const NewItemData = thumbnailNewData === "" ? DiscountedData : DiscountedData?.filter((post: any) => {
    const postDate = new Date(parseInt(post?.dateUpdated));
    return postDate.toDateString() === new Date().toDateString();
  });

  // Infinite Scroll State
  const [visibleItems, setVisibleItems] = useState(itemsPerPage); // Number of items currently visible
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for infinite scroll

  // Function to load more items
  const loadMoreItems = useCallback(() => {
    if (visibleItems >= NewItemData.length) return; // Don't load more if all items are already visible

    setIsLoadingMore(true); // Set loading state to true

    // Simulate loading delay (e.g., API call or processing)
    setTimeout(() => {
      setVisibleItems((prev) => prev + itemsPerPage); // Increase the number of visible items
      setIsLoadingMore(false); // Set loading state to false
    }, 1000); // Adjust the delay as needed
  }, [visibleItems, NewItemData.length]);

  // Slice the data to only show visible items
  const visibleProducts = NewItemData.slice(0, visibleItems);

  const searchEngine = (inputValue: any) => {
    inputValue.preventDefault();
    const searchData = inputValue.target.value;
    if (inputValue === '') {
      dispatch(setSearch(''));
    } else {
      dispatch(setSearch(searchData));
    }
  };

  const sort = ((e: any) => {
    dispatch(setsortBy(e.target.value));
  });

  const handleSortBy = (column) => {
    dispatch(setsortBy(column));
  };

  const sortTrigger = (() => {
    if (sortDirection === 'asc') {
      dispatch(setsortDirection('desc'));
    } else {
      dispatch(setsortDirection('asc'));
    }
  });


const handleClick = (item: any) => {
    console.log('Clicked on:', item);
  };
  
useEffect(() => {
  if (ProductsData?.getChildInventory) {
    //const multipliedProducts = multiplyArray(ProductsData.getChildInventory, 1);
    dispatch(addSuggestedItems(ProductsData?.getChildInventory));

// const localData = JSON.parse(localStorage.getItem("recentlyVisited") || "[]"); 

// const formattedData = localData.map((item: any) => ({
//   ...item, // Keeps all existing properties
//   image: item.thumbnail, // Renaming 'thumbnail' to 'image'
//   Name: item.name, // Adjusting key format if needed
// }));

// setSaved(formattedData);

  }
}, [dispatch, ProductsData]);

  if (productsLoading) return <ProductLoading />;
  if (productsError) return <ReusableServerDown />;

const sort_name_price = [{
  value:"",
  label:"Sort",
  },{
  value:"name",
  label:"By Name",
  },{
  value:"price",
  label:"By Price",
  }]
  
  const items: React.ReactNode[] = [
    (
      <div key={0}>
            <ReusableSelect data={sort_name_price} event={sort} />
      </div>
    ),
    (
      <div key={1}>
        <button onClick={sortTrigger} aria-label="sort" style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#e1e1e1',
          cursor: 'pointer',
          width:'100px'
        }}>
          <Icon icon="famicons:chevron-expand"/>
        </button>
      </div>
    )
  ];
  return (
    <ReusableCenterLayout
      child1={() => (
        <ReusableSlider items={items}/>
      )}
      child2={() => (
        <ReusableSlick data={storedcategory} />
      )}
      child3={() => (
        <div
          style={{ overflowY: 'auto', height: 'auto', scrollbarWidth: 'none' }} // Set height to auto
        >
          {/* <RecentlyVisited data={useSaved} fromData={false} />*/ }
          <ReusableLabel icn='bi:tags-fill' label='Products'/>
          <div className="Thumbnails">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((item: any, idx: number) => (
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
              ))
            ) : (
              <h2>No Data</h2>
            )}
          </div>

          
          

          {/* "View More" Button */}
          {visibleItems < NewItemData.length && (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <button
                onClick={loadMoreItems}
                style={{
                  padding: '10px',
                  backgroundColor: '#803d2a',
                  color: '#fff',
                  border: 'none',
                  width :'100px',
                  height:'40px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {isLoadingMore?(<Icon icon="line-md:loading-alt-loop"  style={{ color:'#ffffff' }}/>):'View More'}
              </button>
            </div>
          )}

          {/* End of Data Message */}
          {visibleItems >= NewItemData.length && !isLoadingMore && (
            visibleProducts.length < 1 ? (
              <></>
            ) : (
              <h3 style={{ textAlign: 'center', padding: '10px' }}>
                You&apos;ve reached the end of the data.
              </h3>
            )
          )}
        </div>
      )}
      child4={() => (
        <></>
      )}
    >
    </ReusableCenterLayout>
  );
};

export default Products;
