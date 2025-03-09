import React from 'react';
import Account from './Account.jsx';
import Wallet from './Wallet.jsx';
import { useAccount } from 'wagmi';

const Cryp = () => {
    const { isConnected } = useAccount();
  return (
    <div>
        { isConnected ? <Account /> : <Wallet /> }
    </div>
  )
}

export default Cryp;
