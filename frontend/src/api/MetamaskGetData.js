// WalletBalance.js
import { useEffect } from 'react';
import { ethers } from 'ethers';

const WalletBalance = ({ setAddress, setBalance, setErrorMessage }) => {
    useEffect(() => {
        const getWalletBalance = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    const balanceInWei = await provider.getBalance(address);
                    const balanceInEther = ethers.utils.formatEther(balanceInWei);

                    setAddress(address);
                    setBalance(balanceInEther);
                } catch (err) {
                    console.error(err);
                    setErrorMessage('Failed to get balance');
                }
            } else {
                setErrorMessage('MetaMask is not installed');
            }
        };

        getWalletBalance();
    }, [setAddress, setBalance, setErrorMessage]);

    return null;
};

export default WalletBalance;
