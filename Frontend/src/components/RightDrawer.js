import React, { useEffect, useState } from "react";
import FeaturedProductsNew from "./FeaturedProductsNew";

const RightDrawer = ({ sampleProducts, isVisible }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 600px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: isVisible ? "0" : "-400px", // Slide in/out based on visibility
        height: "93.5%",
        width: "200px",
        color: "#fff",
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        transition: "right 0.5s ease-out",
        zIndex: 9,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            lineHeight: "40px",
            position: "absolute",
            width: "100vh",
            height: !isSmallScreen ? "25%" : "20%",
            transform: "rotate(-90deg)",
            fontSize: "70px",
            margin: "0px",
            padding: "0px",
          }}
        >
          {!isSmallScreen ? "FAVOURITE" : "TOP-NOTCH"} <br />{" "}
          <span style={{ fontSize: "40px", margin: "0px", padding: "0px" }}>
            PRODUCTS
          </span>{" "}
        </h2>
      </div>

      <div style={{ width: "70%" }}>
        <FeaturedProductsNew products={sampleProducts} />
      </div>
    </div>
  );
};

export default RightDrawer;
