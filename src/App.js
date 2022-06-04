import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ walletAddress, setWalletAddress ] = useState('');

  useEffect(() => {
    const onLoad = async () => setWalletAddress(await getWalletAddress(window.solana));
    window.addEventListener('load', onLoad);

    return () => window.removeEventListener('load', onLoad);
  }, []);

  async function connectWallet() {
    const { solana } = window;
    if (window?.solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }

  return (
    <div className="App">
      <header className="">
        <h1>My first dapp with Solana</h1>
      </header>
      <main>
        {!walletAddress && <button className='cta-button connect-wallet-button' onClick={connectWallet}>Connect to wallet</button>}

        {walletAddress && `Your Address: ${walletAddress}`}
      </main>
      <footer></footer>
    </div>
  );
}

async function getWalletAddress(solana) {
  try {
    if(hasSolanaWallet()) {
      const response = await solana.connect({ onlyIfTrusted: true });
      console.log('Connected with Public Key:', response.publicKey.toString());
      return response.publicKey.toString();
    }

    return '';
  } catch(err) {
    console.error(err);
    return '';
  }
}

async function hasSolanaWallet() {
  const { solana } = window;

  if (solana?.isPhantom) {
    return true;
  } else {
   return false;
  }
}

export default App;
