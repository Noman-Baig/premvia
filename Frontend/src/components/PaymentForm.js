import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CardDesign.css";
import { useNavigate } from "react-router-dom";
const PaymentForm = ({
  cartData,
  totalAmount,
  name,
  address,
  city,
  state,
  country,
  zipcode,
  phone,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(cartData);

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageNew, setErrorMessageNew] = useState(null);

  const submitOrder = async () => {
    const orderDetails = {
      name,
      address,
      city,
      state,
      country,
      zipcode,
      phone,
      totalAmount,
      cartData,
    };

    const response = await fetch(`${apiUrl}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });
  };

  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !country ||
      !zipcode ||
      !phone
    ) {
      setErrorMessage("All Fields are required"); // Show the error message
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (!stripe || !elements) return; // Stripe.js has not loaded yet
    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);

      setErrorMessage("Payment failed. Please try again."); // Show the error message
      setTimeout(() => setErrorMessage(null), 3000);
    } else {
      try {
        const response = await fetch(`${apiUrl}/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            totalAmount: totalAmount,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setErrorMessageNew(
            "Thank you for shopping with us! Your order has been placed successfully, and your parcel will be delivered within 3-5 business days."
          ); // Show the error message
          submitOrder();
          setTimeout(() => setErrorMessageNew(null), 7000);
          setTimeout(() => goToMainPage(), 7000);
        } else {
          setErrorMessage("Payment failed. Please try again."); // Show the error message
          setTimeout(() => setErrorMessage(null), 3000);
        }
      } catch (error) {
        setErrorMessage("Payment failed. Please try again."); // Show the error message
        setTimeout(() => setErrorMessage(null), 3000);
      }
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ fontFamily: "Poppins", width: "100%", maxWidth: "400px" }}
    >
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {errorMessageNew && (
        <div className="error-message-new">{errorMessageNew}</div>
      )}
      <div>
        <CardElement />
      </div>
      <button
        className="payNowBtn"
        type="submit"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
