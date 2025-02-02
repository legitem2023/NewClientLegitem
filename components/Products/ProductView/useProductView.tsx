import React, { useEffect, useState } from 'react';
import DataManager from 'utils/DataManager';

const useProductView = () => {
  const [ipaddresses, setIpaddresses] = useState<any>(null);
  const Manager = new DataManager();

  useEffect(() => {
    const ipAddress = Manager.Ipaddress();
    setIpaddresses(ipAddress); // Update the state
  }, [Manager]); // Only run once when the component mounts

  return { ipaddresses };
};

export default useProductView;
