import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { successNotification } from '../../plugins/Notification';
import { useNavigate } from 'react-router-dom';
import CustomDatePicker from '../CustomDatePicker';
import ProductCardPreview from '../Product-card/ProductcardPreview';
import Navbar from '../Navbar/Navbar';
import { ethers } from 'ethers';  // Import ethers.js
import './Create.css';

import imgDummy from '../../assets/dummy.png';
import { NFT__DATA } from '../../assets/data/data'  // Import the data array

const Create = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [startingBid, setStartingBid] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ethBalance, setEthBalance] = useState(null);  // Store user's ETH balance
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch ETH balance from MetaMask
        const fetchEthBalance = async () => {
            try {
                if (window.ethereum) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    const balance = await provider.getBalance(address);
                    setEthBalance(ethers.utils.formatEther(balance));
                } else {
                    setErrorMessage('Please install MetaMask to continue.');
                }
            } catch (error) {
                setErrorMessage('Failed to fetch ETH balance from MetaMask.');
            }
        };

        fetchEthBalance();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const startDateMillis = startDate.getTime();
        const endDateMillis = endDate.getTime();

        if (startingBid <= 0) {
            setErrorMessage('The starting bid must be greater than 0.');
        } else if (endDateMillis - startDateMillis < oneWeekInMillis) {
            setErrorMessage('The expiration date must be at least one week after the starting date.');
        } else if (ethBalance && parseFloat(startingBid) > parseFloat(ethBalance)) {
            setErrorMessage('Your ETH balance is insufficient for this starting bid. Please ensure your balance is sufficient to cover the bid amount.');
        } else {
            setErrorMessage('');

            // Create new item data
            const newItem = {
                id: NFT__DATA.length + 1,  // Automatically generate a new ID
                title,
                imgUrl: file || imgDummy,  // Use the uploaded image or dummy image
                creator: "0xExampleCreatorAddress",  // You can replace this with actual creator info
                currentBid: startingBid,
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString(),
                description: "Custom item description goes here.",  // Add description field
            };

            // Add new item to the NFT__DATA array
            NFT__DATA.push(newItem);
            console.log("New item added to NFT__DATA:", newItem);

            successNotification('Item created successfully!');

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    const handleFileChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    const item = {
        id: "2",
        title: title || "Dummy Item",
        imgUrl: file || imgDummy,
        creator: "Dummy Creator",
        currentBid: startingBid || "0",
        startDate: startDate.toLocaleDateString() || "-",
        endDate: endDate.toLocaleDateString() || "-",
    };

    return (
        <div>
            <Navbar />
            <section>
                <Container>
                    <Row className="form_input_all">
                        <Col lg="3" md="4" sm="6">
                            <h5>Preview Item</h5>
                            <ProductCardPreview item={item} />
                        </Col>
                        <Col lg="9" md="8" sm="6">
                            <div className="create__item">
                                <form onSubmit={handleSubmit}>
                                    <div className="form__input">
                                        <label htmlFor="">Title</label>
                                        <input
                                            type="text"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Upload File</label>
                                        <input
                                            type="file"
                                            className="upload__input"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Starting Bid (ETH)</label>
                                        <input
                                            type="number"
                                            placeholder="Enter price (ETH)"
                                            value={startingBid}
                                            onChange={(e) => setStartingBid(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between">
                                        <CustomDatePicker
                                            label="Starting Date"
                                            selectedDate={startDate}
                                            onDateChange={setStartDate}
                                            required
                                        />
                                        <CustomDatePicker
                                            label="Expiration Date"
                                            selectedDate={endDate}
                                            onDateChange={setEndDate}
                                            required
                                        />
                                    </div>

                                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                                    <br />
                                    <button className="btn-submit" type="submit">
                                        Create Item
                                    </button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Create;
