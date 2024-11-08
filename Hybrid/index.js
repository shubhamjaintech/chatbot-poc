// Dynamic company-specific policy
const policies = {
    returnPolicy: "XYZ India allows returns within 10 days for most products. However, some items such as electronics and large appliances may have different return windows.",
    shippingPolicy: "XYZ India provides free delivery for Prime members. Standard shipping charges apply for non-Prime orders below ₹499.",
    paymentMethods: "XYZ India accepts multiple payment methods including credit cards, debit cards, UPI, and EMI options."
  };
  
  function getPolicy(queryType) {
    switch (queryType) {
      case 'return':
        return policies.returnPolicy;
      case 'shipping':
        return policies.shippingPolicy;
      case 'payment':
        return policies.paymentMethods;
      default:
        return "Sorry, I don't have information about that. Please contact customer support.";
    }
  }
  
  async function getHybridChatBotResponse(userInput) {
      // get some data from rule based as defined above.
      const queryType = identifyQueryType(userInput);
      const policyResponse = getPolicy(queryType);
  
      // Now use above rulebased data on top of LLM to get desired Bot reponse.
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are a customer support assistant for XYZ India. If users ask about the return policy, shipping policy, or payment methods, provide accurate information.` }, // System message providing high-level guidance
              { role: "user", content: userInput },
              { role: "assistant", content: policyResponse } // Rule based data
            ],
            max_tokens: 150,
            temperature: 0.7,
            n: 1,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        const botResponse = response.data.choices[0].message.content.trim();
        console.log(`Bot: ${botResponse}`);
      } catch (error) {
        console.error("Error with Hybrid LLM Chatbot:", error.response ? error.response.data : error.message);
      }
    }
  function identifyQueryType(userInput) {
      const input = userInput.toLowerCase();
      if (input.includes('return')) {
        return 'return';
      } else if (input.includes('shipping') || input.includes('delivery')) {
        return 'shipping';
      } else if (input.includes('payment') || input.includes('pay')) {
        return 'payment';
      } else {
        return 'unknown';
      }
    }
    