import { Icon } from "@iconify/react";
import React from "react";

type PropsReusableNotification = {
  number: number;
};

const ReusableNotification: React.FC<PropsReusableNotification> = ({ number }) => {
  return (
    <div
      className="ReusableNotification"
      style={{
       transform: `scale(${number > 0 ? 1 : 0})`,
       transition: "transform 0.3s"
      }}
    >
      <div className="icon-container"
        style={{
       transform: `scale(${number > 0 ? 1 : 0})`,
       transition: "transform 0.3s"
      }}
        >
        <Icon icon="mdi:bell" width="20" height="20" className="icon-with-border"
          style={{
          transform: `scale(${number > 0 ? 1 : 0})`,
          transition: "transform 0.3s"
      }}
          />
      </div>
      <div className="countnumber"
       style={{
          transform: `scale(${number > 0 ? 1 : 0})`,
          transition: "transform 0.3s"
      }} 
        >{number}</div>
    </div>
  );
};

export default ReusableNotification;
