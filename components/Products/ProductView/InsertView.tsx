import { useEffect } from "react";

const InsertView = ({ insertNumberOfViews, userEmail, ViewProduct }) => {
  useEffect(() => {
    insertNumberOfViews({
      variables: {
        "count": "1",
        "productCode": ViewProduct?.productCode,
        "emailAddress": userEmail,
        "ipAddress": "ipaddresses", // You can replace with a dynamic value if needed
        "country": "PH",
      },
    });
  }, [insertNumberOfViews, userEmail, ViewProduct]); // Add missing dependencies here

  return <div></div>;
};

export default InsertView;
