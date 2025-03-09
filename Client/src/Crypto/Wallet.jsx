import React from 'react';
import { useConnect } from 'wagmi';
import './Style/Wallet.css';

const Wallet = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Connect Wallet</h1>
      <div className="wallet-options">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            className="wallet-button"
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Wallet;