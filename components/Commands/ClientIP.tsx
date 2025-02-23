import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setIpAddress } from 'Redux/ipAddress';

export default function ClientIP() {
  const [ip, setIp] = useState("Loading...");
const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then(res => res.json())
      .then(data => dispatch(setIpAddress(data.ip)))
      .catch(() => dispatch(setIpAddress("Failed to fetch IP")));
  }, []);

  return <></>;
}
