"use client";

import { useEffect,useState } from "react";
import ReusableThumbnail from 'components/UI/ReusableThumbnail';
import AddCartCmd from 'components/Commands/AddCartCmd';
import { setmodal } from 'Redux/modalSlice';
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';

import { useDispatch, useSelector } from 'react-redux';
import ReusableLabel from "components/UI/ReusableLabel";

const RecentlyVisited = () => {
 const dispatch = useDispatch();
const [visited,setVisited] = useState([]);
useEffect(()=>{
 if (typeof window === "undefined") return;
 const localstorage = JSON.parse(localStorage.getItem('recentlyVisited'));
   setVisited(localstorage)
},[])
 const path = process.env.NEXT_PUBLIC_PATH || '';
   const openModal = (id: string, items: any) => {
    dispatch(setviewed(id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([items])); 
  };
  if(!visited) return
  return <>{(
    <>
      <ReusableLabel icn='carbon:recently-viewed' label='Recently Visited Products'/>
        <div className="Thumbnails">
        {visited.map((item: any, idx: number) => (
                <div key={idx}>
                  <ReusableThumbnail
                    item={item}
                    path={path}
                    view={() => openModal(item.thumbnail, item)}
                    addcart={() => (<AddCartCmd item={item} />)}
                    handleLoading={null}
                    handleError={null}
                  />
                </div>
              ))}
        </div>
    </>
            )}</>
};

export default RecentlyVisited;
