import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CardDesign.css";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe.js

export default class CardDesign extends React.Component {
  state = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  };
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  calculateTotalAmount = () => {
    const { cartItems } = this.props; // Assuming cartItems is passed as a prop
    if (!cartItems) return 0;

    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  handlePayNow = () => {
    alert("Payment process initiated. Please proceed!");
  };

  render() {
    const srtipePubKey = process.env.STRIPE_PUBLISH_KEY;
    const totalAmount = this.calculateTotalAmount();
    const { cartItems } = this.props;
    console.log("Cart Items in CardDesign:", this.props.cartItems);
    console.log("Received cartData in PaymentForm:", cartItems);
    return (
      <Elements stripe={loadStripe(`${srtipePubKey}`)}>
        <div style={styles.wrapper}>
          <div style={styles.formWrapper}>
            <h2 style={styles.formTitle}>Address Details</h2>
            <div style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                value={this.state.name}
                style={styles.input}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                value={this.state.address}
                style={styles.input}
              />
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  value={this.state.city}
                  style={styles.inputSmall}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  value={this.state.state}
                  style={styles.inputSmall}
                />
              </div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                value={this.state.country}
                style={styles.input}
              />
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                value={this.state.zipcode}
                style={styles.input}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                value={this.state.phone}
                style={styles.input}
              />
            </div>
          </div>
          <h2 style={{ ...styles.formTitle, marginTop: "-30px" }}>
            Pay Securely
          </h2>
          <PaymentForm
            cartData={cartItems}
            name={this.state.name}
            address={this.state.address}
            city={this.state.city}
            state={this.state.state}
            country={this.state.country}
            zipcode={this.state.zipcode}
            phone={this.state.phone}
            totalAmount={totalAmount}
          />
        </div>
      </Elements>
    );
  }
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: "#fff",
  },
  formWrapper: {
    marginBottom: "40px",
    borderRadius: "8px",
  },
  formTitle: {
    textAlign: "center",

    marginBottom: "20px",
    color: "black",
    fontSize: "24px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginBottom: "12px",
    padding: "12px",
    width: "100%",
    borderRadius: "10px",
    border: "0.6px solid grey",
    fontSize: "16px",
    color: "black",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  inputSmall: {
    padding: "12px",
    width: "48%",
    borderRadius: "10px",
    border: "0.6px solid grey",
    fontSize: "16px",
    color: "black",
    margin: "3px",
  },
  cardWrapper: {
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "8px",
  },
  cardStyle: {
    marginBottom: "20px",
  },
  inputCard: {
    marginBottom: "12px",
    padding: "12px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #333",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "#fff",
  },
  payButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
