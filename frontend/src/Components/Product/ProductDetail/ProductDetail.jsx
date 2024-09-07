import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import './ProductDetail.css';
import { useLocation } from 'react-router-dom';
import fetchTransactionDetails from '../../../api/HistoryTransaction';

const ProductDetail = () => {
    const location = useLocation();

    // Extract query parameters
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title') || 'Default Title';
    const currentBid = searchParams.get('currentBid') || '0';
    const imgUrl = searchParams.get('imgUrl') || 'default_image_url.jpg';
    const creator = searchParams.get('creator') || 'Unknown Creator';
    const description = searchParams.get('description') || 'Unknown';

    // State management
    const [transactions, setTransactions] = useState([]);
    const [sortField, setSortField] = useState('timestamp');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortTransactions = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedTransactions = [...transactions].sort((a, b) => {
            if (field === 'value') {
                return order === 'asc' ? a.value - b.value : b.value - a.value;
            } else if (field === 'fromAddress') {
                return order === 'asc'
                    ? a.fromAddress.localeCompare(b.fromAddress)
                    : b.fromAddress.localeCompare(a.fromAddress);
            } else if (field === 'timestamp') {
                return order === 'asc'
                    ? new Date(a.timestamp) - new Date(b.timestamp)
                    : new Date(b.timestamp) - new Date(a.timestamp);
            }
            return 0;
        });

        setTransactions(sortedTransactions);
    };

    useEffect(() => {
        // Fetch transaction details on mount
        const fetchData = async () => {
            try {
                const allTransactions = await fetchTransactionDetails();
                setTransactions(allTransactions);
            } catch (error) {
                console.error('Error fetching transaction details:', error);
            }
        };

        fetchData();
    }, []);

    const formatAddress = (addr) => {
        if (addr && addr.length > 12) {
            return `${addr.substring(0, 8)}...${addr.substring(addr.length - 4)}`;
        }
        return addr;
    };

    return (
        <div>
            <Navbar />
            <div className="productdisplay">
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        <img src={imgUrl} alt="" />
                        <img src={imgUrl} alt="" />
                        <img src={imgUrl} alt="" />
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="productdisplay-img">
                        <img className="productdisplay-main-img" src={imgUrl} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <h1>{title}</h1>
                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-owneraddress">
                            <span className="title-name">Highest Bid Address:</span> {formatAddress(creator)}
                        </div>
                        <div className="productdisplay-right-price">
                            <span className="title-name">Highest Bid:</span> {currentBid} ETH
                        </div>
                    </div>
                    <div className="productdisplay-right-description">
                        <p>{description}</p>
                    </div>
                </div>
            </div>

            <div className="product-history-bidding">
                <h1>History Bidding - {title}</h1>
                <div className="sort-headers">
                    <span onClick={() => sortTransactions('fromAddress')} className="sortable-header">
                        Address
                    </span>
                    <span onClick={() => sortTransactions('value')} className="sortable-header">
                        Bid
                    </span>
                    <span onClick={() => sortTransactions('timestamp')} className="sortable-header">
                        Timestamp
                    </span>
                </div>
                {transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <div key={index} className="history-item">
                            <span className="history-address">{tx.fromAddress}</span>
                            <span className="history-bid">{tx.value} ETH</span>
                            <span className="history-timestamp">{new Date(tx.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No transaction history available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
