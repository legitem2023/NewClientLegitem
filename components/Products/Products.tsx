'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY, GET_CHILD_INVENTORY } from 'graphql/queries';
import { handleError, handleLoading } from 'utils/scripts';
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
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';
import ProductLoading from './ProductLoading';
import { useRouter, usePathname } from 'next/navigation';
import ReusableServerDown from 'components/UI/ReusableServerDown';
import { Icon } from '@iconify/react';

const itemsPerPage = 10; // Number of items to load per "page"

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isModalOpen = useSelector((state: any) => state.modal.modal);

  const openModal = (id: string, items: any) => {
    dispatch(setviewed(id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([items]));
  };

  const thumbnailDiscounted = useSelector((state: any) => state.discounted.discounted);
  const thumbnailNewData = useSelector((state: any) => state.new.new);

  const category = useSelector((state: any) => state.category.category);
  const search = useSelector((state: any) => state.search.search);
  const productType = useSelector((state: any) => state.productType.productType);
  const sortBy = useSelector((state: any) => state.sortBy.sortBy);
  const sortDirection = useSelector((state: any) => state.sortDirection.sortDirection);
  console.log(search,"<<<<");
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY);
  const { data: Category, loading, error } = useQuery(GET_CATEGORY);

  const filteredProducts = ProductsData?.getChildInventory
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
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the container for scroll events

  // Function to load more items
  const loadMoreItems = () => {
    if (visibleItems >= NewItemData.length) return; // Don't load more if all items are already visible

    setIsLoadingMore(true); // Set loading state to true

    // Simulate loading delay (e.g., API call or processing)
    setTimeout(() => {
      setVisibleItems((prev) => prev + itemsPerPage); // Increase the number of visible items
      setIsLoadingMore(false); // Set loading state to false
    }, 1000); // Adjust the delay as needed
  };

  // Scroll Event Listener for Infinite Scroll
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // Load more when 100px from the bottom

        if (isNearBottom && !isLoadingMore && visibleItems < NewItemData.length) {
          console.log('Loading more items...');
          loadMoreItems();
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visibleItems, NewItemData.length, isLoadingMore, loadMoreItems]);

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

  if (productsLoading) return <ProductLoading />;
  if (productsError) return <ReusableServerDown />;

  return (
    <ReusableCenterLayout
      child1={() => (
        <></>
      )}
      child2={() => (
        <ReusableSearch search={searchEngine} sort={sort} trigger={sortTrigger} />
      )}
      child3={() => (
        <div
          ref={containerRef}
          style={{ overflowY: 'auto', height: '100vh',scrollbarWidth: 'none' }} // Make the container scrollable
        >
          <div className="Thumbnails">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((item: any, idx: number) => (
              <div key={idx}>
                <ReusableThumbnail
                  item={item}
                  path={path}
                  view={() => openModal(item.id, item)}
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

          {/* Loading Indicator */}
          {isLoadingMore && (
            <div style={{ textAlign: 'center', padding: '10px' }}>
             <Icon icon="eos-icons:loading" width="24" height="24"  style={{color: "#803d2a"}} />
            </div>
          )}

          {/* End of Data Message */}
          {visibleItems >= NewItemData.length && !isLoadingMore && (
            visibleProducts.length < 1?(
              <></>
            ):
            <h3 style={{ textAlign: 'center', padding: '10px' }}>
              You've reached the end of the data.</h3>
          )}
        </div>
      )}
      child4={() => (
        <Modal isOpen={isModalOpen}>
          <ProductView />
        </Modal>
      )}
    >
    </ReusableCenterLayout>
  );
};

export default Products;
