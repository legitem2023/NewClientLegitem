'use client';

import React,{ useRef,useEffect } from 'react';
import menuList from '../../../json/menu.json';
import { Icon } from '@iconify/react';
import { useQuery } from '@apollo/client';
import { READ_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries'; // Assuming you have this query for Collection Items
import { useDispatch } from 'react-redux';
import { setCategory } from 'Redux/categorySlice';
import { setproductType } from 'Redux/productTypeSlice';
import { setcollectionItem } from 'Redux/collectionItemSlice';
import { setdiscounted } from 'Redux/discountedSlice';
import { setnew } from 'Redux/newSlice';
import { setDrawer } from 'Redux/drawerSlice';
import MenuLoading from './MenuLoading';
import ReusableServerDown from 'components/Reusable/ReusableServerDown';

const Menu: React.FC = () => {
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(READ_CATEGORY);
  const { data: productTypesData, loading: productTypesLoading, error: productTypesError } = useQuery(READ_PRODUCT_TYPES);
  const dispatch = useDispatch();
  const sortEngine = (e: any) => {
    dispatch(setCategory(e.target.getAttribute("value")));
  };

  const sortEngine_1 = (e: any) => {
    dispatch(setproductType(e.target.getAttribute("value")));
  };

  const sortEngine_2 = (e: any) => { // For Collection Items
    dispatch(setcollectionItem(e.target.getAttribute("value")));
  };


  const dropdownRef = useRef<HTMLULListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dispatch(setDrawer(true));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);
  const ShowAll = (name:any) =>{

    if(name==='Discounted'){
      dispatch(setdiscounted(name))
    }

    if(name==='New'){
      dispatch(setnew(name))
    }

    if(name==='All Products'){
      dispatch(setCategory(""));
      dispatch(setproductType(""));
      dispatch(setcollectionItem(""));
    }
   
  }

  if (categoryLoading || productTypesLoading ) return <MenuLoading/>;
  if (categoryError || productTypesError ) return <ReusableServerDown/>


  return (
    <ul className='Menu' ref={dropdownRef}>
      <li className='Menu_label'>Menu</li>
      {menuList.map((item: any, index: any) => (
        <li
  key={index}
  className={
    item.Name === 'Category' || item.Name === 'Product Types' || item.Name === 'Collection Items'
      ? 'category_li'
      : 'menu_li'
  }
  onClick={(e: any) => {
    if (
      item.Name !== 'Category' &&
      item.Name !== 'Product Types' &&
      item.Name !== 'Collection Items'
    ) {
      dispatch(setDrawer(true));
    }
  }}
>
          {item.Name === 'Category' || item.Name === 'Product Types' || item.Name === 'Collection Items' ? (
            <label
              htmlFor={"collapse" + item.Name.toLowerCase().replace(" ", "") + index}
              className='categorylabel'
            >
              <Icon icon={item.icon} />
              <span>{item.Name}</span>
              <Icon icon='bxs:chevron-down' />
            </label>
          ) : (
            <label onClick={() => ShowAll(item.Name)} className='menulabel'>
              <Icon icon={item.icon} />{item.Name}
            </label>
          )}

          <input type='checkbox' id={"collapse" + item.Name.toLowerCase().replace(" ", "") + index} className='hidden' />
          <span></span>

          <ul className='category_list'>
            <br />
            {item.Name === 'Category' && categoryData?.getCategory?.length > 0 && categoryData?.getCategory?.map((category: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine(e); dispatch(setDrawer(true)); }} value={category.Name}>
                <Icon icon="fluent-mdl2:radio-bullet"/>{category.Name}
              </li>
            ))}

            {item.Name === 'Product Types' && productTypesData?.getProductTypes?.length > 0 && productTypesData?.getProductTypes?.map((type: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine_1(e); dispatch(setDrawer(true)) }} value={type.Name}>
                <Icon icon="fluent-mdl2:radio-bullet" />{type.Name}
              </li>
            ))}

            {item.Name === 'Collection Items' && productTypesData?.getProductTypes?.length > 0 && productTypesData?.getProductTypes?.map((item: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine_2(e); dispatch(setDrawer(true)) }} value={item.Name}>
                <Icon icon="fluent-mdl2:radio-bullet" />{item.Name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
