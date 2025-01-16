import React from "react";
import { useCart } from "./CartContext";

const CartIcon = ({ toggleCart }) => {
  const { cartCount } = useCart();

  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer",
        height: "50px",
        width: "50px",
      }}
      onClick={toggleCart}
    >
      <img
        src="https://getdrawings.com/free-icon-bw/shopping-car-icon-21.png"
        alt="Cart"
        style={{
          width: "40px",
          height: "40px",
          filter: "brightness(0) invert(1)",
        }}
      />
      {cartCount > -1 && (
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
            height: "13px",
            width: "13px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
