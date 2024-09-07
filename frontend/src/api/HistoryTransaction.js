import axios from 'axios';

// Utility function to convert wei to ether
const weiToEther = (wei) => {
    return wei / 1e18;
};

// Function to fetch and filter transactions based on the 'bid' method
const fetchTransactionDetails = async () => {
    try {
        // Fetch data from the API
        const response = await axios.get('https://sepolia-blockscout.lisk.com/api/v2/addresses/0x6c8C92F5EE3B464C6756223fC2E2469320025731/transactions?filter=to');
        
        // Extract transactions from the response
        const transactions = response.data.items || response.data.transactions || [];

        // Check if transactions is an array
        if (!Array.isArray(transactions)) {
            throw new Error('Expected transactions to be an array.');
        }

        // Filter transactions to include only those with the 'bid' method
        const bidTransactions = transactions.filter(tx => {
            return tx.decoded_input && tx.decoded_input.method_call === 'bid()' && tx.result === 'success';
        });

        console.log('full json:', bidTransactions);

        // Extract desired details from each 'bid' transaction
        const transactionDetails = bidTransactions.map(tx => ({
            value: weiToEther(Number(tx.value)), // Convert value from wei to ether
            fromAddress: tx.from ? String(tx.from.hash) : null, // Ensure fromAddress is a string
            timestamp: tx.timestamp ? new Date(tx.timestamp).toISOString() : null // Convert timestamp to ISO string
        }));

        console.log('Bid transactions:', transactionDetails);

        // Return all bid transaction details
        return transactionDetails;

    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw new Error('Error fetching transaction details.');
    }
};

export default fetchTransactionDetails;
