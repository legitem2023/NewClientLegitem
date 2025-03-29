import { Icon } from "@iconify/react";
import React from "react";

type PropsReusableNotification = {
  number: number;
};

const ReusableNotification: React.FC<PropsReusableNotification> = ({ number }) => {
  return (
    <div
      className="ReusableNotification"
      style={{ transform: `scale(${number > 0 ? 1 : 0})` }}
    >
      <div className="icon-container">
        <Icon icon="mdi:bell" width="20" height="20" className="icon-with-border" />
      </div>
      <div className="countnumber">{number}</div>
    </div>
  );
};

export default ReusableNotification;
