import List from './List/List';
import GifForm from './GifForm';
import useGifListState from './hooks/useGifListState';
import './App.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer

function App() {
  const {
    walletAddress,
    list,
    connectWallet,
    sendGif
  } = useGifListState();

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
