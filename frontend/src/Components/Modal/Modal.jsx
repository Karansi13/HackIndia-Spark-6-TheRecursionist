import React, { useState, useEffect } from 'react';
import './Modal.css';
import WalletBalance from '../../api/MetamaskGetData';
import { useAuction } from '../../Auction';
import fetchTransactionDetails from '../../api/RefreshPrice.js';

const Modal = ({ setShowModal, item }) => {

    const { title, currentBid, creator } = item;

    const [bidValue, setBidValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [currentAddressState, setCurrentAddressState] = useState(creator);
    const [currentBidState, setCurrentBidState] = useState(currentBid);
    const [loading, setLoading] = useState(false); // Loading state

    const { placeBid } = useAuction();

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBidValue(value);
    };

    const handleSubmit = async () => {
        const numericBidValue = parseFloat(bidValue);
        const numericCurrentBid = parseFloat(currentBidState);

        if (isNaN(numericBidValue) || numericBidValue <= numericCurrentBid) {
            setErrorMessage(`Bid must be greater than ${currentBid} ETH`);
        } else {
            try {
                await placeBid(bidValue);
                setErrorMessage('');
                setShowModal(false);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    };

    const handleRefreshPrice = async () => {
        setLoading(true); // Start loading
        try {
            const { value: highestBidValue, address: highestBidAddress } = await fetchTransactionDetails();
            setCurrentBidState(highestBidValue);
            setCurrentAddressState(highestBidAddress);
        } catch (error) {
            console.error('Error fetching the highest bid:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        handleRefreshPrice(); // Fetch data when the modal is opened
    }, []);

    const formatAddress = (addr) => {
        if (addr && addr.length > 12) {
            return `${addr.substring(0, 8)}...${addr.substring(addr.length - 4)}`;
        }
        return addr;
    };

    return (
        <div className="modal__wrapper">
            <div className="single__modal">
                <span className="close__modal">
                    <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
                </span>
                <h6 className="text-center text-light">Place a Bid - {title}</h6>
                <p className="text-center text-light">
                    Highest Bid <span className="moneyBidder">{loading ? (
                        <span className="loading-spinner"></span> // Loading spinner
                    ) : (
                        `${currentBidState} ETH`
                    )}</span></p>
                <div className="input__item mb-4">
                    <input type="number" placeholder='00 : 00 ETH' value={bidValue} onChange={handleInputChange} />
                </div>
                <div className='bidder-information'>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="TitleModal">Highest Bidder</p>
                        <span className="accountBidder"> {formatAddress(currentAddressState)}</span>
                    </div>
                </div>

                <WalletBalance setAddress={setAddress} setBalance={setBalance} setErrorMessage={setErrorMessage} />

                <div className="d-flex align-items-center justify-content-between">
                    <p className="TitleModal">Your Account</p>
                    <span className="account">{address.substring(0, 8)}...{address.substring(30)} </span>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <p className="TitleModal">Balance</p>
                    <span className="money">{balance} ETH</span>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <p className="TitleModal">Total Bid Amount</p>
                    <span className="money">{bidValue} ETH</span>
                </div>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <button className="place__bid-btn" onClick={handleSubmit}>
                    Place a Bid
                </button>
            </div>
        </div>
    )
}

export default Modal;
