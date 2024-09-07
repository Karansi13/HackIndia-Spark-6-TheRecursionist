import React, { useState } from 'react'
import ethImg from '../../assets/ETH.png'
import Modal from '../Modal/Modal'
import { Link as RouterLink } from 'react-router-dom';
import { ethers } from 'ethers';
import { errorNotification } from '../../plugins/Notification';
import './Productcard.css'

const Productcard = (props) => {

  const { title, currentBid, imgUrl, creator, startDate, endDate, description } = props.item;

  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const connectMetaMask = async () => {
    if (window.ethereum) {

      if (isConnecting) {
        console.log('Connection request is already in progress. Please wait.');
        return;
      }

      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = ethProvider.getSigner();
      const userAccount = await signer.getAddress();
      const userBalance = await signer.getBalance();

      setProvider(ethProvider);
      setAccount(userAccount);
      setBalance(ethers.utils.formatEther(userBalance));

      setShowModal(true);
    } else {
      errorNotification('MetaMask is not installed. Please install MetaMask.');
    }
  };

  return <div className="single__nft__card">
    <div className="ntf__img">
      <RouterLink
        className='custom-link'
        to={`/productDetail?title=${title}&currentBid=${currentBid}&imgUrl=${imgUrl}&creator=${creator}&startDate=${startDate}&endDate=${endDate}&description=${description}`}>
        <img src={imgUrl} alt="" className="w-100" />
      </RouterLink>
    </div>

    <div className="nft__content">
      <h5 className="nft__title">{title}</h5>

      <div className="creator__info-wrapper d-flex gap-3">
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Created By</h6>
            <p>{creator.substring(0, 4)}...{creator.substring(38)} </p>
          </div>

          <div>
            <h6>Current Bid</h6>
            <p>{currentBid} <img className="ethimg" src={ethImg} alt="" /></p>
          </div>
        </div>
      </div>

      <div className="creator__info-wrapper d-flex gap-3">
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Started Date</h6>
            <p>{startDate}</p>
          </div>
        </div>
      </div>

      <div className="creator__info-wrapper d-flex gap-3">
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>End Date</h6>
            <p>{endDate}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex align-items-center justify-content-between">
        <button className="bid__btn d-flex align-items-center gap-1"
          onClick={connectMetaMask}>
          <i class="ri-shopping-bag-line"></i>Place Bid
        </button>
        {showModal && <Modal setShowModal={setShowModal} item={props.item} />}
      </div>
    </div>
  </div>
}

export default Productcard
