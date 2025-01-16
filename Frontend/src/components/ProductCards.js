import React from "react";

const ProductCard = ({ product }) => {
  const truncatedDescription = product.description.substring(0, 60) + "...";
  const truncatedTitle = product.productName.substring(0, 13) + "...";
  return (
    <div
      onClick={() => (window.location.href = `/product/${product.id}`)}
      className="product-card"
    >
      <div className="image-container">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="product-image"
        />
        <img
          src={product.images[1]}
          alt={`${product.productName} alternative`}
          className="product-image-hover"
        />
      </div>
      <div className="product-info">
        {/* <div className="price-tag">${product.price}</div> */}
        <div
          style={{
            background: "#ff7575",
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "2px",
            borderRadius: "5px",
            textAlign: "center",
            display: "flex",
          }}
        >
          <p
            style={{
              padding: "0px",
              margin: "0px",
              fontWeight: "300",
              fontSize: "12px",
              color: "#000000",
            }}
          >
            65% Off&nbsp;
          </p>
          <h4
            style={{
              padding: "0px",
              margin: "0px",
              fontWeight: "200",
              textDecoration: "line-through",
              color: "white",
              fontSize: "12px",
            }}
          >
            ${(product.price * 1.65).toFixed(2)}
          </h4>
        </div>
        <div style={{ padding: "10px" }}>
          <h3 className="product-title">{truncatedTitle}</h3>
          <p className="product-description">
            {truncatedDescription || "Loding..."}
          </p>
        </div>
        <button className="add-to-cart">Get in ${product.price}</button>
      </div>
    </div>
  );
};

export default ProductCard;
