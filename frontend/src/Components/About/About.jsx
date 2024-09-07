import React from 'react';
import './About.css';
import about_img from '../../assets/about.png';
import play_icon from '../../assets/play-icon.png';

const About = () => {
  return (
    <div className='about'>
      <div className="about-left">
        <div className="about-img-container">
          <img src={about_img} alt="About OpenTenders" className="about-img" />
          <img src={play_icon} alt="Play Icon" className="play-icon" />
        </div>
      </div>
      <div className="about-right">
        <h2>About OpenTenders</h2>
        <p>OpenTenders is a cutting-edge Web3 auction platform designed to revolutionize the way digital assets and NFTs are bought and sold. Leveraging the power of blockchain technology, OpenTenders ensures a transparent, secure, and efficient bidding process.</p>
        <p>With features like real-time bidding, decentralized transaction verification, and seamless integration with various blockchain networks, OpenTenders provides a robust environment for both buyers and sellers. Whether you're auctioning rare digital collectibles or seeking unique assets, OpenTenders offers a next-generation solution for the modern digital economy. Embrace the future of auctions with OpenTenders, where innovation meets integrity.</p>
      </div>
    </div>
  );
};

export default About;
