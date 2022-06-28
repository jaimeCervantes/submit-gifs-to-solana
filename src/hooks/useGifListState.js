import { useEffect, useState } from 'react';
import { connectToSolana, getWalletAddress, getGifList, addGif } from '../appFns';

export default function useGifListState() {
  const [ walletAddress, setWalletAddress ] = useState('');
  const [list, setList] = useState(null);

  useEffect(() => {
    const onLoad = async () => setWalletAddress(await getWalletAddress(window.solana));
    window.addEventListener('load', onLoad);

    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (list === null && walletAddress) {
      loadGifList();
    }
  }, [walletAddress, list]);

  async function loadGifList() {
    const gifList = await getGifList(window.solana);
    setList(gifList);
  }

  async function connectWallet() {
    const address = await connectToSolana(window.solana);
    setWalletAddress(address);
  }

  async function sendGif(value) {
    if (value.length === 0) {
      alert('No gif link given!');
      return;
    }

    const result = await addGif(value, window.solana);
    if (result) {
      const gifList = await getGifList(window.solana);
      setList(gifList);
    }
  }

  return {
    walletAddress,
    list,
    connectWallet,
    sendGif
  };
}