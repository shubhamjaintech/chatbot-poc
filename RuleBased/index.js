class RuleBasedChatbot {
    constructor() {
      this.responses = {
        "hello": "Hi, Welcome to My firm! How can I help you today?",
        "track order": "Please provide your service no. to track your query.",
        "shipping": "We offer free shipping on orders above $100!",
        "bye": "Goodbye! Have a great day."
      };
    }
  
    getResponse(userInput) {
      const normalizedInput = userInput.toLowerCase();
      return this.responses[normalizedInput] || "Sorry, I didn’t understand that.";
    }
  }
  
  // Example usage:
  const chatbot = new RuleBasedChatbot();
  console.log(chatbot.getResponse("hello")); // Output: "Hi, Welcome to My firm! How can I help you today?"
  console.log(chatbot.getResponse("track order")); // Output: "Please provide your service no. to track your query."
  console.log(chatbot.getResponse("unknown input")); // Output: "Sorry, I didn’t understand that."
  