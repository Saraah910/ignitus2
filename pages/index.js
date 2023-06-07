import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, ConnectButton, Input } from 'web3uikit'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Provider } from '@ethersproject/abstract-provider'
import { BigNumber, ethers, provider } from 'ethers'
import { string } from 'prop-types'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const transferEther = async () => {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/FXmiPTBIvNT4Hl1jwtJjugjJ-v2GCS1F');

      // Get the signer's wallet using private key
      const privateKey = 'ee43d50f940520e9c1977bfd6d2d47d6254a0935d80edf713d5d43a29a09a4ad';
      const wallet = new ethers.Wallet(privateKey, provider);

      // Convert the input amount to Wei
      const weiAmount = ethers.utils.parseEther(amount);

      // Transfer Ether from sender to recipient
      const transaction = await wallet.sendTransaction({
        to: recipientAddress,
        value: weiAmount,
      });

      console.log('Transaction hash:', transaction.hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column",gap:"20px", marginLeft:"20%"}}>
      <h1>Ether Transfer</h1>
      <div>
        <label>Sender Address:</label>
        <Input
          type="text"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Recipient Address:</label>
        <Input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Amount (ETH):</label>
        <Input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button text="Transfer" theme='primary' onClick={transferEther}></Button>
    </div>
  )
}
