import React from 'react'
import ethImg from '../../assets/ETH.png'

const Productcard = (props) => {

const {title, currentBid, imgUrl, creator, startDate, endDate } = props.item;

  return <div className="single__nft__card">
  <div className="ntf__img">
    <img src={imgUrl} alt="" className= "w-100" />
  </div>

  <div className="nft__content">
    <h5 className="nft__title">{title}</h5>

    <div className="creator__info-wrapper d-flex gap-3">
      <div className="creator__info w-100 d-flex align-items-center justify-content-between">
        <div>
          <h6>Created By</h6>
          <p>{creator}</p>
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

  </div>
</div>
}

export default Productcard
