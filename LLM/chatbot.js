const API_KEY = 'YOUR_OPENAI_API_KEY';
const API_URL = 'https://api.openai.com/v1/chat/completions';
const CHAT_MODEL = 'gpt-4-turbo';

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessageToChat('User', userMessage);
    userInput.value = '';

    try {
        const botResponse = await getLLMResponse(userMessage);
        addMessageToChat('Bot', botResponse);
    } catch (error) {
        console.error('Error fetching bot response:', error);
        addMessageToChat('Bot', 'Sorry, something went wrong. Please try again later.');
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.className = `message ${sender.toLowerCase()}`; // Add class for styling
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getLLMResponse(userMessage) {
    const payload = createPayload(userMessage);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

function createPayload(userMessage) {
    return {
        model: CHAT_MODEL,
        messages: [
            { role: 'system', content: "You are a helpful assistant." },
            { role: 'user', content: userMessage }
        ],
        max_tokens: 150,
        temperature: 0.7
    };
}
document.getElementById('sendButton').addEventListener('click', sendMessage);
