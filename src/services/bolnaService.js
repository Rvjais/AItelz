
/**
 * Bolna Voice AI Service
 * Handles API interactions with Bolna.ai
 */

const API_URL = import.meta.env.VITE_BOLNA_API_URL;
const BASE_URL = import.meta.env.VITE_BOLNA_BASE_URL;

// Credentials from environment variables
const AGENT_ID = import.meta.env.VITE_BOLNA_AGENT_ID;
const API_KEY = import.meta.env.VITE_BOLNA_API_KEY;


/**
 * Initiates an outbound call using Bolna Voice AI
 * @param {string} recipientPhoneNumber - The phone number to call (E.164 format favored)
 * @returns {Promise<Object>} - The API response
 */
export const initiateCall = async (recipientPhoneNumber) => {
    if (!recipientPhoneNumber) {
        throw new Error('Phone number is required');
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                agent_id: AGENT_ID,
                recipient_phone_number: recipientPhoneNumber
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `API Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Bolna API Error:', error);
        throw error;
    }
};
