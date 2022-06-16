import {
  clusterApiUrl,
  Connection,
  SystemProgram,
  Keypair,
  PublicKey
} from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import idl from './idl.json';
import keypair from './keypair.json';

export async function getWalletAddress(solana) {
  try {
    return await connectToSolana(solana, { onlyIfTrusted: true });
  } catch(err) {
    console.warn(err);
    return '';
  }
}

export async function connectToSolana(solana, opts = {}) {
  if (hasSolanaWallet(solana)) {
    const response = await solana.connect(opts);
    console.log('Connected with Public Key:', response.publicKey.toString());
    return response.publicKey.toString(); 
  }

  return '';
}

async function hasSolanaWallet(solana) {
  if (solana?.isPhantom) {
    return true;
  } else {
   return false;
  }
}

const arr = Object.values(keypair._keypair.secretKey);
const secret = new Uint8Array(arr);

const baseAccount = Keypair.fromSecretKey(secret);
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = { preflightCommitment: 'processed' };

export async function createGifAccount(wallet) {
  try {
    const program = getProgram(wallet);
    const response = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: getProvider(wallet).wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [baseAccount]
    });
  
    console.log(response);
  } catch(err) {
    console.warn(err);
  }
}

export async function getGifList(wallet) {
  try {
    const program = getProgram(wallet);
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log(account);
    return account.gifList;
  } catch(err) {
    console.warn(err);
    return [];
  }
}

export async function addGif(value, wallet) {
  try {
    const program = getProgram(wallet);
    await program.rpc.addGif(value, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: getProvider(wallet).wallet.publicKey
      }
    });

    return true;
  } catch(err) {
    console.warn(err);
    return false;
  }
}

export function getProgram(wallet) {
  if (getProgram.instance) {
    return getProgram.instance;
  }
  
  const provider = getProvider(wallet);
  return new Program(idl, programID, provider);
}
getProgram.instance = null;

function getProvider(wallet) {
  if (getProvider.instance) {
    return getProvider.instance;
  }

  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, wallet, opts.preflightCommitment);

  console.log(connection, provider);

  return provider;
}
getProvider.instance = null;