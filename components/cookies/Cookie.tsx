"use client";
import React, { useEffect, useRef } from "react";
import { cookies } from "./cookie";
import { useDispatch } from "react-redux";
import { setCookie } from "Redux/cookieSlice";
import { usePathname,useRouter } from "next/navigation";

const Cookie = () => {
  const dispatch = useDispatch();
  const previousCookieRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentCookie = cookies();

  const updateCookies = () => {
    // Compare current cookies with the previous cookies
    if (!previousCookieRef.current || JSON.stringify(currentCookie) !== JSON.stringify(previousCookieRef.current)) {
      previousCookieRef.current = currentCookie;

      if(pathname === "/Crowd" 
        || pathname === "/Messages" 
        || pathname === "/Account" 
        || pathname === "/Checkout"){
        if(!currentCookie){
          router.push('/Login');
        }
      }
      if (currentCookie) {
        dispatch(setCookie({emailAddress: currentCookie.email, userLevel: currentCookie.userlevel, userid: currentCookie.id}))
      }
    
    }
  };

  useEffect(() => {
    // Initial fetch
    updateCookies();

    // Set up polling to check cookies every 2 seconds
    const interval = setInterval(updateCookies, 2000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentCookie]);

  return <div></div>;
};

export default Cookie;
