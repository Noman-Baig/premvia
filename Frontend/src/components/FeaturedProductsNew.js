
import { useNavigate } from "react-router-dom";

const FeaturedProductsNew = ({ products }) => {

  
  const navigate = useNavigate();


  const handleProductClick = (id) => {
    console.log(`Navigating to product ID: ${id}`);
    navigate(`/product/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "7vh",
        padding: "05px",
        boxSizing: "border-box",
      }}
    >
      {products.slice(3, 6).map((product, index) => (
        <div
          onClick={() => handleProductClick(product.id)}
          key={index}
          style={{
            width: "100%",
            maxWidth: "200px",
            borderRadius: "10px",
            overflow: "hidden",
            transition: "transform 0.3s ease",
          }}
          className="product-card"
        >
          <div style={{ position: "relative", height: "180px" }}>
            <img
              src={product.images[0]}
              alt={product.productName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className="product-image"
            />
          </div>
          <button
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              right: "0px",
              background:
                "linear-gradient(135deg,rgb(177, 191, 197) 0%, #298096 100%)",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              transition: "background-color 0.3s ease",
            }}
            className="buy-now"
          >
            <h4 style={{ margin: "0px", padding: "0px", fontWeight: "200" }}>
              Get in ${product.price}
            </h4>
          </button>

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
        </div>
      ))}
    </div>
  );
};

export default FeaturedProductsNew;