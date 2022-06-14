export async function getWalletAddress(solana) {
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