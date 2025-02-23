import { useEffect, useState } from "react";

export default function ClientIP() {
  const [ip, setIp] = useState("Loading...");

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp("Failed to fetch IP"));
  }, []);

  return <p>Your IP: {ip}</p>;
}
