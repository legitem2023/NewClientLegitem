"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "../Redux/activeIndexSlice";
import { Icon } from "@iconify/react";

type Tab = {
  icon: string; // Iconify icon name
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const ReusableArrowTabs: React.FC<TabsProps> = ({ tabs }) => {
  const dispatch = useDispatch();
  const activeIndex = useSelector((state: any) => state.activeIndex.activeIndex);

  return (
    <div style={{ width: "100%", backgroundColor: "#f1f1f1", boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      {/* Tab Buttons (Arrow Style) */}
      <div style={{ display: "flex", padding: "4px", gap: "4px", boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        {tabs.map((tab, index) => {
          let clipPath =
            "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"; // Middle tabs (arrow on both sides)

          if (index === 0) {
            clipPath = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"; // First tab (flat left, arrow right)
          } else if (index === tabs.length - 1) {
            clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)"; // Last tab (arrow left, flat right)
          }

          const isActive = index <= activeIndex; // Apply active styles to current and previous tabs

          return (
            <div
              key={index}
              onClick={() => dispatch(setActiveIndex(index))}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                clipPath,
                borderRadius: "3px",
                marginLeft: index > 0 ? "-5px" : "0px",
                padding: "8px 17px",
                backgroundImage: isActive
                  ? "linear-gradient(to right, #505050, #606060, #505050)"
                  : "linear-gradient(to right, #d1d1d1, #e1e1e1, #d1d1d1)",
                boxShadow: isActive
                  ? "inset 1px 1px 3px rgba(255, 255, 255, 0.3), inset -1px -1px 3px rgba(0, 0, 0, 0.2), 3px 3px 5px rgba(0, 0, 0, 0.3)"
                  : "inset 1px 1px 3px rgba(255, 255, 255, 0.3), inset -1px -1px 3px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Icon icon={tab.icon} style={{ fontSize: "18px" }} />
            </div>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={{ backgroundColor: "#f3f4f6", color: "#1f2937", borderRadius: "6px", padding: "10px" }}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default ReusableArrowTabs;