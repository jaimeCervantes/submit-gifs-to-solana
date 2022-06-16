import { useEffect, useState } from 'react';
import List from './List/List';
import GifForm from './GifForm';
import { connectToSolana, getWalletAddress, createGifAccount, getGifList, addGif } from './appFns';
import './App.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer

function App() {
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

  return (
    <div className="App">
      <header className="">
        <h1>My first dapp with Solana</h1>
        {
          !walletAddress && ( <button
            className='cta-button connect-wallet-button'
            onClick={connectWallet}
          >
            Connect to wallet
          </button>
          )
        }
      </header>

      {
        walletAddress && <main>
          <GifForm
            onSubmit={(value) => {
              sendGif(value)
            }}
          ></GifForm>
          <List items={list || []}></List>
        </main>
      }
      <footer></footer>
    </div>
  );
}

export default App;
