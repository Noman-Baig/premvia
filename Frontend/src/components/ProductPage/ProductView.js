import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../CartContext";
import CartIcon from "../CartIcon";
import Cart from "../Cart";

const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${id}`);
        const data = await response.json();

        if (data) {
          setProduct(data);
        } else {
          setRedirect(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading Product ...
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const existingRipple = button.getElementsByClassName("ripple")[0];
    if (existingRipple) {
      existingRipple.remove();
    }
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  return (
    <div>
      <div
        style={{
          height: "50px",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            {"<<< Go Back"}
          </p>
        </div>
        <CartIcon toggleCart={toggleCart} />
        {isCartOpen && (
          <div
            style={{
              width: "95%",
              margin: "0 auto",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              overflowY: "scroll",
              scrollbarWidth: "none",
              msverflowStyle: "none",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "10",
            }}
          >
            <button
              onClick={toggleCart}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#d53939",
                color: "white",
                border: "none",
                borderRadius: "100%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <Cart />
          </div>
        )}
      </div>

      <Container>
        <Arrow onClick={handlePrev}>{"<"}</Arrow>
        <RedContainer>
          <VerticalText>
            PREM <br /> VIA
          </VerticalText>
          <VerticalText>
            PREM <br /> VIA
          </VerticalText>
          <div style={{ position: "absolute", left: "50%" }}>
            <Image
              src={product.images[currentImageIndex]}
              alt={product.productName}
            />
            <ThumbnailContainer>
              {product.images.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`thumbnail-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  selected={currentImageIndex === index}
                />
              ))}
            </ThumbnailContainer>
          </div>
        </RedContainer>
        <BlueContainer>
          <Details>
            <ProductName>{product.productName}</ProductName>
            <Descdiv>
              <span style={{ textAlign: "left", width: "90%" }}>
                {product.description}
              </span>
            </Descdiv>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "5px",
                paddingRight: "5px",
                justifyContent: "center",
                color: "rgb(90, 101, 107)",
                borderRadius: "10px",
                background: "rgb(207, 207, 207)",
                position: "absolute",
                top: "70px",
                left: "10%",
                height: "50px",
              }}
            >
              <h4
                style={{
                  padding: "0px",
                  margin: "0px",
                  fontWeight: "400",
                  textDecoration: "line-through",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                ${(product.price * 1.65).toFixed(2)}
              </h4>

              <Price> ${product.price} </Price>
            </div>

            <QuantityControl>
              <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
              <AddToCartButton
                onClick={(e) => {
                  handleAddToCart();
                  createRipple(e);
                }}
              >
                ADD TO CART
              </AddToCartButton>
            </QuantityControl>
          </Details>
        </BlueContainer>
        <ArrowRight onClick={handleNext}>{">"}</ArrowRight>
      </Container>
    </div>
  );
};

export default ProductView;

const Descdiv = styled.div`
  height: 280px;
  width: 90%;
  white-space: pre-wrap;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  @media (max-width: 600px) {
    height: 250px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 50px auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const RedContainer = styled.div`
  background-color: rgb(162, 162, 162);
  display: flex;
  width: 50%;
  height: 70vh;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  @media (max-width: 600px) {
    height: 50vh;
    width: 100%;
    border-radius: 0px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
`;

const VerticalText = styled.span`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 10rem;
  line-height: 120px;
  font-weight: bold;
  color: rgba(24, 64, 82, 0.46);
`;

const BlueContainer = styled.div`
  background-color: rgb(36, 35, 35);
  color: #fff;
  width: 50%;
  border-top-right-radius:20px;
  border-bottom-right-radius:20px;
  height: 70vh;
  align-items: center;
  justify-content: space-between;
   @media (max-width: 600px) {
     height: 50vh;
     text-align-center;
    width: 100%;
    border-radius:0px;
    border-bottom-right-radius:20px;
  border-bottom-left-radius:20px;
  }
`;

const Image = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  margin: 0 auto;
  transform: translateX(-50%);
`;

const ThumbnailContainer = styled.div`
  width: 400px;
  transform: translateX(-50%);
  overflow-x: auto;
`;

const ThumbnailImage = styled.img`
  width: 70px;
  margin: 5px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Details = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  text-align: left;
  gap: 1rem;
  @media (max-width: 600px) {
    margin-left: 0px;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
`;

const ProductName = styled.div`
  margin-top: 20px;
  width: 90%;
  font-size: 2rem;
  color: #fff;
  text-align: left;
`;

const Price = styled.h2`
  font-size: 1.5rem;
  margin: 0px;
  padding: 0px;
  margin-left: 05px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  background: linear-gradient(135deg, rgb(177, 191, 197) 0%, #298096 100%);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: #007bff;
    color: #fff;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.5rem;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, rgb(177, 191, 197) 0%, #298096 100%);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: #007bff;
    color: #fff;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  // transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
  // background:#85a4b4;
  background: linear-gradient(135deg, rgb(177, 191, 197) 0%, #298096 100%);
  border-radius: 100%;
  left: 10px;
  height: 50px;
  width: 50px;
  z-index: 2;
  transition: all ease-in-out 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    // color:rgb(202, 202, 202);
    scale: 1.1;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  z-index: 2;
  transition: all ease-in-out 0.3s;
  // transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
  // background:#85a4b4;
  background: linear-gradient(135deg, rgb(177, 191, 197) 0%, #298096 100%);

  &:hover {
    // color:rgb(152, 152, 152);
    scale: 1.1;
  }
`;
