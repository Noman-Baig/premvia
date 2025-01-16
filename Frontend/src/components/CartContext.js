import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product, quantityChange = 1) => {
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);
      let updatedCart;

      if (itemIndex !== -1) {
        updatedCart = [...prevCart];
        const updatedItem = updatedCart[itemIndex];
        updatedItem.quantity = Math.max(
          1,
          updatedItem.quantity + quantityChange
        );
        updatedItem.price =
          (updatedItem.price / updatedItem.quantity) * updatedItem.quantity;
      } else {
        updatedCart = [
          ...prevCart,
          { ...product, quantity: 1, price: product.price },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      return updatedCart;
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
