import React, { useEffect, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";
const LeftDrawer = ({ sampleProducts, isVisible }) => {
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
        left: isVisible ? "0" : "-400px", // Slide in/out based on visibility
        height: "93.5%",
        width: "200px",
        color: "#fff",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        transition: "left 0.5s ease-out",
        zIndex: 9,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "70%" }}>
        <FeaturedProducts products={sampleProducts} />
      </div>
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
        {!isSmallScreen ? (
          <h2
            style={{
              lineHeight: "40px",
              position: "absolute",
              width: "100vh",
              height: "25%",
              transform: "rotate(90deg)",
              fontSize: "70px",
              margin: "0px",
              padding: "0px",
            }}
          >
            FEATURED <br />{" "}
            <span style={{ fontSize: "40px", margin: "0px", padding: "0px" }}>
              PRODUCTS
            </span>{" "}
          </h2>
        ) : (
          // <h2 style={{   height:"10%", maxLines:"1", display:"flex", flexDirection:"row", transform:"rotate(90deg)", fontSize:"50px" ,margin:"0px",padding:"0px"}} >FEATURED PRODUCTS</h2>
          <h2></h2>
        )}
      </div>
    </div>
  );
};

export default LeftDrawer;
