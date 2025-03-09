import React from "react";
import {
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
  useTransactionCount,
  useBlockNumber,
  useFeeData,
} from "wagmi";
import "./Style/Account.css";
import { Link } from "react-router-dom";

const Account = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    data: balance,
    isLoading: balanceLoading,
    error: balanceError,
  } = useBalance({ address });
  const chainId = useChainId();
  const { data: txCount, isLoading: txCountLoading } = useTransactionCount({
    address,
  });
  const { data: blockNumber, isLoading: blockLoading } = useBlockNumber();
  const { data: feeData, isLoading: feeLoading } = useFeeData();

  return (
    <div className="account-container">
      <h1 className="account-title">Account Dashboard</h1>
      <div className="account-details-list">
        <div className="account-detail">
          <span>Status</span>
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
        <div className="account-detail">
          <span>Address</span>
          <span>{address || "N/A"}</span>
        </div>
        <div className="account-detail">
          <span>Chain ID</span>
          <span>{chainId ?? "Unknown"}</span>
        </div>
        <div className="account-detail">
          <span>Balance</span>
          <span>
            {balanceLoading
              ? "Loading..."
              : balance
              ? `${balance.formatted} ${balance.symbol}`
              : "N/A"}
          </span>
        </div>
        {balanceError && (
          <div className="account-detail">
            <span>Error</span>
            <span>{balanceError.message}</span>
          </div>
        )}
        <div className="account-detail">
          <span>Transaction Count</span>
          <span>
            {txCountLoading
              ? "Loading..."
              : txCount
              ? txCount.toString()
              : "N/A"}
          </span>
        </div>
        <div className="account-detail">
          <span>Block Number</span>
          <span>
            {blockLoading
              ? "Loading..."
              : blockNumber
              ? blockNumber.toString()
              : "N/A"}
          </span>
        </div>
      </div>
      <div className="button-group">
        <button className="disconnect-button" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
        <Link to={'/sendTransaction'} style={{textDecoration:"none" , textAlign:"center"}} className="pay-with-crypto-button">Pay with Crypto</Link>
      </div>
    </div>
  );
};

export default Account;
