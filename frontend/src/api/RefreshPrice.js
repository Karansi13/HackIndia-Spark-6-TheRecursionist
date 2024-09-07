import axios from 'axios';

// Utility function to convert wei to ether
const weiToEther = (wei) => {
    return wei / 1e18;
};

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

        // Extract desired details from each transaction
        const transactionDetails = transactions.map(tx => ({
            value: weiToEther(Number(tx.value)), // Convert value from wei to ether
            fromAddress: tx.from ? String(tx.from.hash) : null // Ensure fromAddress is a string
        }));

        // Find the highest transaction value and corresponding address
        const highestTransaction = transactionDetails.reduce((max, tx) => {
            return tx.value > max.value ? tx : max;
        }, { value: 0, fromAddress: null });

        console.log('Highest transaction value:', highestTransaction.value);
        console.log('Address of highest transaction:', highestTransaction.fromAddress);

        // Return the highest transaction value and address
        return {
            value: highestTransaction.value,
            address: highestTransaction.fromAddress
        };

    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw new Error('Error fetching transaction details.');
    }
};

export default fetchTransactionDetails;