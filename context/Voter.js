import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

//Internal Imports
import { VotingAddress, VotingAddressABI } from "./constants";

const projectId = "";
const projectSecreteKey = "";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecreteKey}`).toString("base64")}`;

const subdomanin = "";

const client = ipfsHttpClient({
    host :"infura-ipfs.io",
    port : 5001,
    protocol : "https",
    headers :{
        authorization: auth,
    },
});

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress,VotingAddressABI, signerOrProvider);

    export const VotingContext = React.createContext();

    export const VotingProvider = ({ children }) => {
        const votingTitle = 'My  smart contract app';
        const router = useRouter();
        const [currentAccount, setCurrentAccount] =useState('');
        const [candidateLength, setCandidateLength] = useState('');
        const pushCandidate = [];
        const candidateIndex = [];
        const [candidateArray, setCandidateArray] = useState(pushCandidate);

        //End of Candidate data
        const [error, setError] = useState('');
        const highestVote = [];

        //Voter Section
        const pushVoter = [];
        const [voterArray, setVoterArray] = useState(pushVoter);
        const [voterLength, setVoterLength] = useState('');
        const [voterAddress, setVoterAddress] = useState([]);

        // Connecting wallet

        const checkIfWalletIsConnected = async() => {
            if (!window.ethereum) return setError("Please Install MetaMask")

            const account = await window.ethereum.request({method: "eth_accounts"});

            if(account.length){
                setCurrentAccount(account[0]);
            } else{
                setError("Please Install Metamask & Connect, Reload");
            }
        };

        
        // Connecting Wallet
        const connectWallet = async()=>{
            if(!window.ethereum) return setError("Please Install Metamask")
        
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        
            setCurrentAccount(account[0]);
        };

        // Upload to IPFS
        const uploadToIPFS = async (file) => {
            try {
                const added = await client.add({content:file});

                const url =`${added.path}`;
                return url;
            } catch (error) {
                setError("Error Uploading file to IPFS");
            }
        };
        
        
        return <VotingContext.Provider value={{ votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS }}>
            {children}
            </VotingContext.Provider>
    };

const Voter = () => {
  return  <div>Voter</div>;
  
};

export default Voter;