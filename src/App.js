import { useEffect, useState } from 'react';
import './App.css';
import List from './List/List';
import items from './dummies/gifList';
import GifForm from './GifForm';
import { getWalletAddress } from './appFns';

function App() {
  const [ walletAddress, setWalletAddress ] = useState('');
  const [list, setList] = useState(items);

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

  function sendGif(value) {
    if(value.length > 0) {
      setList(prev => [...prev, value]);
    } else {
      console.log('Empty input, no link');
    }
  }

  return (
    <div className="App">
      <header className="">
        <h1>My first dapp with Solana</h1>
        {!walletAddress && <button className='cta-button connect-wallet-button' onClick={connectWallet}>Connect to wallet</button>}
      </header>
      {
        walletAddress && <main>
          <GifForm
            onSubmit={(value) => {
              sendGif(value)
            }}
          ></GifForm>
          <List items={list}></List>
        </main>
      }
      <footer></footer>
    </div>
  );
}

export default App;
