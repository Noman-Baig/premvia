import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCards";
import Footer from "./Footer";

function Homepage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="app">
      <Header products={products} />
      <div style={{ position: "relative" }}>
        <h2
          style={{
            lineHeight: "40px",
            fontSize: "70px",
            margin: "0px",
            padding: "0px",
            position: "absolute",
            top: "-27%",
            right: "0%",
            left: "0%",
          }}
        >
          BROWSE <br />{" "}
          <span style={{ fontSize: "40px", margin: "0px", padding: "0px" }}>
            COLLECTION
          </span>
        </h2>
        <div style={{ height: "90vh", width: "100%" }}>
          <div
            style={{
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              overflowY: "scroll",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              background:
                "linear-gradient(135deg,rgb(177, 191, 197) 0%, #298096 100%)",
              paddingTop: "20px",
              paddingBottom: "100px",
            }}
          >
            {shuffledProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
