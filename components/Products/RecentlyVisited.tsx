"use client";

import { useEffect,useState } from "react";

const RecentlyVisited = () => {
const [visited,setVisited] = useState([]);
useEffect(()=>{
 const localstorage = JSON.parse(localStorage.getItem('recentlyVisited'));
   setVisited(localstorage)
})
  return <div>{/* Product details here */}</div>;
};

export default RecentlyVisited;
