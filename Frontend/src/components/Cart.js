import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "./CartContext";
import "./CardDesign.css";
import CardDesign from "./CardDesign";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id); // Remove item from cart
  };

  const handleQuantityChange = (id, action) => {
    if (action === "increase") {
      addToCart({ id }, 1); // Increase by 1
    } else if (action === "decrease") {
      addToCart({ id }, -1); // Decrease by 1
    }
  };

  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const totalProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="card">
      <Leftdiv>
        <h1 style={{ color: "white" }}>Cart & CheckOut</h1>

        {cartItems.length === 0 ? (
          <EmptyMessage>
            🛒 Your Cart is Empty! <br />
            Don't miss out on our exclusive 65% Off sale—grab your favorites
            now!
          </EmptyMessage>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.images[0]} alt={item.productName} />
              <Details>
                <p style={{ margin: "0px", padding: "0px" }}>
                  {item.productName}
                </p>
                <p style={{ margin: "0px", padding: "0px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <QuantityContainer>
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </button>
                </QuantityContainer>
                <RemoveButton onClick={() => handleRemove(item.id)}>
                  X
                </RemoveButton>
              </Details>
            </CartItem>
          ))
        )}

        {cartItems.length > 0 && (
          <Footer>
            <TotalAmount>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "light",
                  lineHeight: "8px",
                }}
              >
                Total Products : {totalProducts}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "light",
                  lineHeight: "8px",
                }}
              >
                Delivery Discount : -$6.5
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "light",
                  lineHeight: "8px",
                }}
              >
                Calculated Amount : ${(totalAmount * 1.65).toFixed(2)}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "light",
                  lineHeight: "8px",
                }}
              >
                You Saved : ${(totalAmount * 1.65 - totalAmount).toFixed(2)}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "light",
                  lineHeight: "8px",
                }}
              >
                Total Amount : ${totalAmount}
              </p>
              <FreeDelivery>
                Enjoy Free Delivery For Your This Order !!
              </FreeDelivery>
            </TotalAmount>
          </Footer>
        )}
      </Leftdiv>

      <div className="rightside">
        <CardDesign cartItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;

// Styled Components
const Leftdiv = styled.div`
  background-image: url("../cartBg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 25rem;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 600px) {
    width: 100%;
    border-top-right-radius: 1.5rem;
    border-bottom-left-radius: 0;
    border-top-left-radius: 1.5rem;
    height: 400px;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  width: 90%;
  font-size: 18px;
  color: white;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  background-color: #d3d3d3;
  width: 90%;
  padding: 10px;
  border-radius: 10px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  p {
    margin: 5px 0;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto;

  button {
    background-color: rgb(133, 164, 180);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin: 0 5px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const RemoveButton = styled.button`
  background-color: #d53939;
  height: 40px;
  width: 40px;
  position: absolute;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 100%;
  top: -15px;
  left: -5px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-start;
`;

const Footer = styled.div`
  margin-top: 10px;
  text-align: left;
  width: 90%;
`;

const TotalAmount = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
`;

const FreeDelivery = styled.p`
  font-size: 15px;
  font-weight: light;
  line-height: 8px;
  color: rgb(209, 235, 236);
`;
