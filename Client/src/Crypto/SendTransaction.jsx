import React, { useContext, useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import AppContext from "../Context/AppContext.jsx";
import { usePublicClient } from "wagmi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Style/Trans.css';

const SendTransaction = () => {
  const publicClient = usePublicClient();
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const { cart, cryptoPaymentConf } = useContext(AppContext);
  const [ethPrice, setEthPrice] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false); // Track if payment is processed
  const navigate = useNavigate(); // Initialize navigation hook

  const FIXED_ADDRESS = "0x3899e07973434Baa416739E6B63c704Cd4fb81a0";

  // Fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.ethereum || !data.ethereum.inr) {
        throw new Error("Invalid response format from CoinGecko");
      }
      console.log("ETH Price fetched:", data.ethereum.inr);
      setEthPrice(data.ethereum.inr);
    } catch (err) {
      console.error("Error fetching ETH price:", err.message);
    } finally {
      setIsLoadingPrice(false);
    }
  };

  useEffect(() => {
    fetchEthPrice();
  }, []);

  // Calculate cart total in INR & ETH
  const calculateCartTotal = () => {
    if (!cart || cart.length === 0) return "0";
    if (!ethPrice) return "0";

    const totalInr = cart.reduce((acc, item) => acc + item.price, 0);
    const totalEth = totalInr / ethPrice;
    return totalEth.toFixed(8);
  };

  const cartTotalEth = calculateCartTotal();
  const cartTotalInr = cart?.length > 0
    ? cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    : "0";

  // Handle Transaction
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cartTotalEth || cartTotalEth === "0") {
      console.error("No items in cart or invalid total");
      return;
    }

    try {
      await sendTransaction({
        to: FIXED_ADDRESS,
        value: parseEther(cartTotalEth),
      });
    } catch (err) {
      console.error("Transaction Error:", err);
    }
  }

  const { isConfirming, isConfirmed } = useWaitForTransactionReceipt({
    hash: hash || undefined,
    confirmations: 2,
  });

  // Call cryptoPaymentConf and navigate when payment is confirmed
  useEffect(() => {
    if (isConfirmed && !paymentProcessed) {
      const confirmOrder = async () => {
        try {
          const orderData = await cryptoPaymentConf();
          if (orderData && orderData.message === "Order confirmed successfully") {
            console.log("Order confirmed after payment:", orderData);
            setPaymentProcessed(true); // Mark as processed to prevent re-execution
            navigate('./confirmOrder'); // Navigate to confirmOrder page
          } else {
            console.error("Failed to confirm order after payment:", orderData);
          }
        } catch (err) {
          console.error("Error calling cryptoPaymentConf:", err);
        }
      };
      confirmOrder();
    }
  }, [isConfirmed, cryptoPaymentConf, paymentProcessed, navigate]);

  return (
    <div className="tx-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <h2 style={{ textAlign: "center", color: "#a855f7" }}>Checkout Payment</h2>

        {/* Payment Address */}
        <div className="address-display" style={{ marginBottom: "15px" }}>
          <label style={{ color: "#fff", display: "block", marginBottom: "5px" }}>
            Payment Address:
          </label>
          <div
            style={{
              color: "#a855f7",
              wordBreak: "break-all",
              background: "#ffffff10",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            {FIXED_ADDRESS}
          </div>
        </div>

        {/* Cart Total */}
        <div className="cart-total" style={{ marginBottom: "15px", color: "#fff" }}>
          <strong>Total Amount: {cartTotalEth} ETH</strong>
          {cart.length > 0 && (
            <div style={{ color: "#a855f7", fontSize: "14px" }}>
              ≈ {cartTotalInr} INR | Items: {cart.length}
              {isLoadingPrice && " (Loading ETH price...)"}
              {!isLoadingPrice && ethPrice && ` (1 ETH = ₹${ethPrice})`}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || cartTotalEth === "0" || !ethPrice || isLoadingPrice}
          className="tx-button"
        >
          {isPending ? "Processing..." : "Confirm Payment"}
        </button>

        {/* Transaction Hash */}
        {hash && (
          <div className="tx-hash" style={{ color: "#a855f7" }}>
            ✅ Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
              style={{ color: "#a855f7" }}
            >
              {hash.slice(0, 6)}...{hash.slice(-4)}
            </a>
          </div>
        )}

        {/* Waiting for Confirmation */}
        {isConfirming && (
          <div className="tx-waiting" role="waiting" style={{ color: "#fbbf24" }}>
            ⏳ Waiting for confirmation (2/2 blocks)...
          </div>
        )}

        {/* Payment Confirmed */}
        {isConfirmed && (
          <div className="tx-success" role="alert" style={{ color: "#22c55e" }}>
            ✅ Payment confirmed successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="tx-error" role="error" style={{ color: "#ef4444" }}>
            ❌ Error: {error?.shortMessage || error?.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default SendTransaction;